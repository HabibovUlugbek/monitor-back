-- CreateTable
CREATE TABLE "file" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "pages" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
