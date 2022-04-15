/*
  Warnings:

  - You are about to drop the column `languageId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_languageId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "languageId";

-- DropTable
DROP TABLE "Language";
