/*
  Warnings:

  - Added the required column `bhmCode` to the `loans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loans" ADD COLUMN     "bhmCode" TEXT NOT NULL;
