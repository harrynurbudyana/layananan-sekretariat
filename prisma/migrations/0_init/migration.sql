-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "signeeCode" TEXT NOT NULL DEFAULT 'IT-DEK',
    "leaderName" TEXT,
    "category" TEXT NOT NULL DEFAULT 'PRODI',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LetterCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "group" TEXT NOT NULL DEFAULT 'AKD',
    "classificationCode" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LetterRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sequenceNumber" INTEGER NOT NULL,
    "monthRomawi" TEXT,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "fullNumber" TEXT NOT NULL,
    "classificationCode" TEXT NOT NULL DEFAULT 'AKD01',
    "signeeCode" TEXT NOT NULL DEFAULT 'IT-DEK',
    "subject" TEXT NOT NULL,
    "recipient" TEXT,
    "applicantName" TEXT NOT NULL,
    "applicantContact" TEXT,
    "letterDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'ISSUED',
    "isManual" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "unitId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LetterRequest_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LetterRequest_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LetterCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LetterCounter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "scope" TEXT NOT NULL DEFAULT 'FIT',
    "currentNumber" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_code_key" ON "Unit"("code");

-- CreateIndex
CREATE UNIQUE INDEX "LetterCategory_code_key" ON "LetterCategory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "LetterRequest_fullNumber_key" ON "LetterRequest"("fullNumber");

-- CreateIndex
CREATE INDEX "LetterRequest_year_sequenceNumber_idx" ON "LetterRequest"("year", "sequenceNumber");

-- CreateIndex
CREATE INDEX "LetterRequest_unitId_idx" ON "LetterRequest"("unitId");

-- CreateIndex
CREATE INDEX "LetterRequest_categoryId_idx" ON "LetterRequest"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "LetterCounter_year_scope_key" ON "LetterCounter"("year", "scope");
