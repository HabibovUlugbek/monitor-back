/*
  Warnings:

  - You are about to drop the column `clientCode` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `clientType` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `docNumber` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `inn` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `loanNumber` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `returned` on the `loans` table. All the data in the column will be lost.
  - Added the required column `externalId` to the `loans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loans" DROP COLUMN "clientCode",
DROP COLUMN "clientType",
DROP COLUMN "docNumber",
DROP COLUMN "dueDate",
DROP COLUMN "inn",
DROP COLUMN "loanNumber",
DROP COLUMN "returned",
ADD COLUMN     "contractAmountEquvivalent" DOUBLE PRECISION,
ADD COLUMN     "externalId" TEXT NOT NULL,
ADD COLUMN     "inspector" TEXT,
ADD COLUMN     "totalDebt" DOUBLE PRECISION,
ALTER COLUMN "borrower" DROP NOT NULL,
ALTER COLUMN "codeVal" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "remaining" DROP NOT NULL,
ALTER COLUMN "issuedAt" DROP NOT NULL;
