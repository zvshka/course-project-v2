/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Material` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MatetialToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageFilename` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_courseId_fkey";

-- DropForeignKey
ALTER TABLE "MatetialToUser" DROP CONSTRAINT "MatetialToUser_materialId_fkey";

-- DropForeignKey
ALTER TABLE "MatetialToUser" DROP CONSTRAINT "MatetialToUser_userId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "imageFilename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "imageFilename" TEXT;

-- DropTable
DROP TABLE "Images";

-- DropTable
DROP TABLE "Material";

-- DropTable
DROP TABLE "MatetialToUser";

-- CreateTable
CREATE TABLE "Stage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "imageFilename" TEXT,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "stageId" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "filename" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_filename_key" ON "Image"("filename");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_imageFilename_fkey" FOREIGN KEY ("imageFilename") REFERENCES "Image"("filename") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_imageFilename_fkey" FOREIGN KEY ("imageFilename") REFERENCES "Image"("filename") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageFilename_fkey" FOREIGN KEY ("imageFilename") REFERENCES "Image"("filename") ON DELETE SET NULL ON UPDATE CASCADE;
