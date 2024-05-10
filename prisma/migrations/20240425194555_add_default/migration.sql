/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Playlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaylistToSong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddressLine1` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddressLine2` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCity` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCountry` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingZip` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistToSong" DROP CONSTRAINT "PlaylistToSong_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistToSong" DROP CONSTRAINT "PlaylistToSong_songId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "Id" SERIAL NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "shippingAddressLine1" TEXT NOT NULL,
ADD COLUMN     "shippingAddressLine2" TEXT NOT NULL,
ADD COLUMN     "shippingCity" TEXT NOT NULL,
ADD COLUMN     "shippingCountry" TEXT NOT NULL,
ADD COLUMN     "shippingZip" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");

-- DropTable
DROP TABLE "Playlist";

-- DropTable
DROP TABLE "PlaylistToSong";

-- DropTable
DROP TABLE "Products";

-- DropTable
DROP TABLE "Song";

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "availableQuantity" INTEGER NOT NULL,
    "costOfProduction" INTEGER NOT NULL,
    "loadTime" INTEGER NOT NULL,
    "reorderPoint" INTEGER NOT NULL,
    "reorderQuantity" INTEGER NOT NULL,
    "safetyStock" INTEGER NOT NULL,
    "stockOnOrder" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhoneNum" TEXT NOT NULL,
    "billingAddressLine1" TEXT NOT NULL,
    "billingAddressLine2" TEXT NOT NULL,
    "billingCity" TEXT NOT NULL,
    "billingZip" TEXT NOT NULL,
    "billingCountry" TEXT NOT NULL,
    "shippingAddressLine1" TEXT NOT NULL,
    "shippingAddressLine2" TEXT NOT NULL,
    "shippingCity" TEXT NOT NULL,
    "shippingZip" TEXT NOT NULL,
    "shippingCountry" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,
    "specialLabelNeeded" BOOLEAN NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductToOrder" (
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductToOrder_pkey" PRIMARY KEY ("productId","orderId")
);

-- CreateTable
CREATE TABLE "ProductoToTag" (
    "productId" INTEGER NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "ProductoToTag_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_inventoryId_key" ON "Inventory"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToOrder" ADD CONSTRAINT "ProductToOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToOrder" ADD CONSTRAINT "ProductToOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoToTag" ADD CONSTRAINT "ProductoToTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoToTag" ADD CONSTRAINT "ProductoToTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
