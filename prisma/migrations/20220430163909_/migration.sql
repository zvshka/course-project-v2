/*
  Warnings:

  - The primary key for the `Github` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[accountId]` on the table `Github` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Github` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Github" DROP CONSTRAINT "Github_userId_fkey";

-- AlterTable
ALTER TABLE "Github" DROP CONSTRAINT "Github_pkey",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" DROP NOT NULL,
ADD CONSTRAINT "Github_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Github_accountId_key" ON "Github"("accountId");

-- AddForeignKey
ALTER TABLE "Github" ADD CONSTRAINT "Github_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
