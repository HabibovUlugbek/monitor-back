/*
  Warnings:

  - Added the required column `path` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" ADD COLUMN     "path" TEXT NOT NULL;
