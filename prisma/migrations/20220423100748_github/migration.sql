-- CreateTable
CREATE TABLE "Github" (
    "id" INTEGER NOT NULL,
    "access_token" TEXT NOT NULL,
    "access_expires" INTEGER NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "refresh_expires" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Github_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Github_userId_key" ON "Github"("userId");

-- AddForeignKey
ALTER TABLE "Github" ADD CONSTRAINT "Github_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
