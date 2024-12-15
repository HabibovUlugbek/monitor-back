/*
  Warnings:

  - The values [USER,ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `loanId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('REPUBLIC_BOSS', 'PEPUBLIC_EMPLOYEE', 'REGION_BOSS', 'REGION_EMPLOYEE', 'REGION_CHECKER_BOSS', 'REGION_CHECKER_EMPLOYEE');
ALTER TABLE "Admin" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Admin" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Admin" ALTER COLUMN "role" SET DEFAULT 'REGION_EMPLOYEE';
COMMIT;

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "region" TEXT,
ALTER COLUMN "role" SET DEFAULT 'REGION_EMPLOYEE';

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "loanId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
