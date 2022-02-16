-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email_verified" SET DEFAULT false,
ALTER COLUMN "avatar" DROP NOT NULL;
