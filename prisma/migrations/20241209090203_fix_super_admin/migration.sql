/*
  Warnings:

  - You are about to drop the column `name` on the `SuperAdmin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `SuperAdmin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SuperAdmin" DROP COLUMN "name",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_username_key" ON "SuperAdmin"("username");
