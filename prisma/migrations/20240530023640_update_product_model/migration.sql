/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Authentication_password_key" ON "Authentication"("password");
