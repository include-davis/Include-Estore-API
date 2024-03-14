-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,
    "special_label_needed" BOOLEAN NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
