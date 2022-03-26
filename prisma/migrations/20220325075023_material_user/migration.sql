/*
  Warnings:

  - You are about to drop the column `accessToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "accessToken";

-- CreateTable
CREATE TABLE "MatetialToUser" (
    "userId" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,

    CONSTRAINT "MatetialToUser_pkey" PRIMARY KEY ("userId","materialId")
);

-- AddForeignKey
ALTER TABLE "MatetialToUser" ADD CONSTRAINT "MatetialToUser_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatetialToUser" ADD CONSTRAINT "MatetialToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
