import fontkit from '@pdf-lib/fontkit'
import { PDFDocument, rgb } from 'pdf-lib'
import fs from 'fs/promises'
import path from 'path'
export const generatePdf = async (loanId: string, data: any): Promise<Buffer> => {
  try {
    // Load custom font
    const fontPath = path.resolve(__dirname, './OpenSans-Regular.ttf')
    const fontBuffer = await fs.readFile(fontPath)
    const fontBytes = new Uint8Array(fontBuffer)

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()
    pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes)

    // Add a page
    const page = pdfDoc.addPage([595, 842]) // A4 size
    const { width, height } = page.getSize()

    // Helper function for adding text
    const drawText = (text: string, x: number, y: number, bold = false) => {
      page.drawText(text, {
        x,
        y,
        size: 12, // All text size is 12
        font: customFont,
        color: rgb(0, 0, 0),
      })
    }

    // Helper function to draw bold text
    const drawBoldText = (text: string, x: number, y: number) => {
      page.drawText(text, {
        x,
        y,
        size: 12,
        font: customFont,
        color: rgb(0, 0, 0),
      })
    }

    // Helper function to draw a table cell
    const drawCell = (x: number, y: number, w: number, h: number) => {
      page.drawRectangle({
        x,
        y,
        width: w,
        height: h,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      })
    }

    // 📌 **Header Section**
    drawBoldText('Приложение №2', 400, height - 50)
    drawBoldText('к «Техническому порядку мониторинга и взыскания кредитов', 190, height - 70)
    drawBoldText('в АО «Национальный банк внешнеэкономической деятельности', 180, height - 85)
    drawBoldText('Республики Узбекистан»', 400, height - 100)
    drawBoldText('(рег. №________от _________)', 400, height - 120)

    // 📌 **Title Section**
    drawBoldText('Акт приема-передачи кредитного дела*', 170, height - 160)

    // 📌 **Approval Section**
    drawBoldText('«УТВЕРЖДАЮ»', 400, height - 190)
    drawText('Управляющий ЦБУ/ОБУ', 400, height - 210)
    drawText('«___» _________20__г', 400, height - 230)

    // 📌 **Loan Details**
    drawText('По кредиту ЦБУ Яккарасай Кредитный договор № 01 от 01.01.2025', 50, height - 270)
    drawText('Барака МЧЖ (заёмщик) на сумму 1 000 000 000 сум', 50, height - 285)
    drawText('(при прием-передачи необходимо указать суммы остатка кредита,', 50, height - 300)
    drawText('просроченные задолженности (основной долг, проценты)', 50, height - 315)

    // 📌 **Table**
    const tableStartX = 50
    const tableStartY = height - 350
    const rowHeight = 30
    const colWidths = [40, 280, 100, 100]

    // **Table Headers (Bold)**
    const headers = ['№', 'Название документов', 'Кол-во листов*', 'Примечание']

    // Draw header row with bold text
    let currentX = tableStartX
    headers.forEach((header, index) => {
      drawCell(currentX, tableStartY, colWidths[index], rowHeight)
      drawBoldText(header, currentX + 5, tableStartY + 10)
      currentX += colWidths[index]
    })

    // Draw empty table rows
    let currentY = tableStartY - rowHeight
    data.forEach((doc: { name: string; pages: number; comment: string }, index: number) => {
      currentX = tableStartX
      const row = [index + 1, doc.name, doc.pages, doc.comment]
      row.forEach((cell, idx) => {
        drawCell(currentX, currentY, colWidths[idx], rowHeight)
        drawText(cell.toString(), currentX + 5, currentY + 7)
        currentX += colWidths[idx]
      })
      currentY -= rowHeight
    })

    // 📌 **Footer**
    drawText('Всего листов: ______', 50, height - 620)
    drawText('* передаются только цветные сканированные копии документов в формате', 50, height - 640)
    drawText('многостраничного PDF. Каждый документ сканируется и сохраняется отдельным ', 50, height - 655)
    drawText('файлом. При этом файлу необходимо придать следующее имя – год документа, месяц,  ', 50, height - 670)
    drawText('число и наименование_номер.', 50, height - 685)

    drawText('Сдал(а) _______________________', 120, height - 735)
    drawText('Ф.И.О. должность, дата ЧЧ ММ ГГ, подпись', 70, height - 750)
    drawText('Принял(а) ______________________', 120, height - 770)
    drawText('Ф.И.О. должность, дата ЧЧ ММ ГГ, подпись', 70, height - 785)

    // Save the PDF
    const pdfBytes = await pdfDoc.save()
    await fs.writeFile(`./uploads/report-${loanId}.pdf`, pdfBytes)
    console.log('✅ PDF saved as formatted-russian-document.pdf')

    return Buffer.from(pdfBytes)
  } catch (error) {
    console.error('❌ Error:', error)
  }
}
;(async () => {
  try {
    // const pdfBuffer = await generatePdf({})
    console.log('✅ PDF Generated Successfully!')
  } catch (error) {
    console.error('❌ Error generating PDF:', error)
  }
})()
