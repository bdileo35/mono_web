/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Venta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "monto" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "idUnico" TEXT NOT NULL,
    "cantidadTimbres" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Timbre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "idVenta" INTEGER NOT NULL,
    CONSTRAINT "Timbre_idVenta_fkey" FOREIGN KEY ("idVenta") REFERENCES "Venta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Venta_idUnico_key" ON "Venta"("idUnico");
