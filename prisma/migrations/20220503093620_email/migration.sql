-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_verification_code" TEXT,
ADD COLUMN     "password_reset_code" TEXT;
