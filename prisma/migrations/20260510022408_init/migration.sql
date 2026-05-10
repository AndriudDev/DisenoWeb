-- CreateTable
CREATE TABLE "Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "membershipType" TEXT NOT NULL
);
