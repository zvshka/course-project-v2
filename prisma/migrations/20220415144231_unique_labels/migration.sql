/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Badge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Badge_label_key" ON "Badge"("label");
