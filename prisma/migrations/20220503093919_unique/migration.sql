/*
  Warnings:

  - A unique constraint covering the columns `[email_verification_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password_reset_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_email_verification_code_key" ON "User"("email_verification_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_reset_code_key" ON "User"("password_reset_code");
