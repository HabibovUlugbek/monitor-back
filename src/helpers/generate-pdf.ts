import puppeteer from 'puppeteer'
import fs from 'fs'

async function generatePDF(): Promise<void> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // HTML content with Russian text
  const htmlContent = `
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; }
        </style>
    </head>
    <body>
        <h1>Приложение №2</h1>
        <p>к «Техническому порядку мониторинга и взыскания кредитов</p>
        <p>в АО «Национальный банк внешнеэкономической деятельности</p>
        <p>Республики Узбекистан»</p>
    </body>
    </html>
    `

  await page.setContent(htmlContent)
  await page.pdf({ path: 'credit_transfer_act.pdf', format: 'A4' })

  await browser.close()
  console.log('PDF generated successfully.')
}

// Run the function
generatePDF().catch(console.error)
