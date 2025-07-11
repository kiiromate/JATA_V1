-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobTitle" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT,
    "sourceUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Applied',
    "industry" TEXT,
    "dateApplied" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
