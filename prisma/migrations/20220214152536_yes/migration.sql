/*
  Warnings:

  - You are about to drop the column `fileName` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `Images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filename]` on the table `Images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filename` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filepath` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Images_fileName_key";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "fileName",
DROP COLUMN "filePath",
DROP COLUMN "mimeType",
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "filepath" TEXT NOT NULL,
ADD COLUMN     "mimetype" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Images_filename_key" ON "Images"("filename");
