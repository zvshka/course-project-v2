/*
  Warnings:

  - You are about to drop the column `imageFilename` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `imageFilename` on the `Stage` table. All the data in the column will be lost.
  - You are about to drop the column `imageFilename` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_imageFilename_fkey";

-- DropForeignKey
ALTER TABLE "Stage" DROP CONSTRAINT "Stage_imageFilename_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imageFilename_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "imageFilename",
ADD COLUMN     "iconURL" TEXT;

-- AlterTable
ALTER TABLE "Stage" DROP COLUMN "imageFilename",
ADD COLUMN     "iconURL" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageFilename",
ADD COLUMN     "avatarURL" TEXT;
