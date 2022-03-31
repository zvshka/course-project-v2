/*
  Warnings:

  - Added the required column `position` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stage" ADD COLUMN     "position" INTEGER NOT NULL;
