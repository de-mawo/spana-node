-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('PENDING', 'APPROVED', 'INMODERATION', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "phone" TEXT,
    "title" TEXT,
    "manager" TEXT,
    "department" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveType" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "values" TEXT[] DEFAULT ARRAY['Credit', 'Used', 'Available']::TEXT[],
    "category" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "LeaveType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leave" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "year" TEXT NOT NULL DEFAULT '',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "days" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "userNote" TEXT,
    "tasksLink" TEXT,
    "userEmail" TEXT NOT NULL,
    "status" "LeaveStatus" NOT NULL DEFAULT 'PENDING',
    "moderator" TEXT,
    "moderatorNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balances" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "annualCredit" INTEGER DEFAULT 0,
    "annualUsed" INTEGER DEFAULT 0,
    "annualAvailable" INTEGER DEFAULT 0,
    "healthCredit" INTEGER DEFAULT 0,
    "healthUsed" INTEGER DEFAULT 0,
    "healthAvailable" INTEGER DEFAULT 0,
    "studyCredit" INTEGER DEFAULT 0,
    "studyUsed" INTEGER DEFAULT 0,
    "studyAvailable" INTEGER DEFAULT 0,
    "maternityCredit" INTEGER DEFAULT 0,
    "maternityUsed" INTEGER DEFAULT 0,
    "maternityAvailable" INTEGER DEFAULT 0,
    "familyCredit" INTEGER DEFAULT 0,
    "familyUsed" INTEGER DEFAULT 0,
    "familyAvailable" INTEGER DEFAULT 0,
    "paternityCredit" INTEGER DEFAULT 0,
    "paternityUsed" INTEGER DEFAULT 0,
    "paternityAvailable" INTEGER DEFAULT 0,
    "unpaidUsed" INTEGER DEFAULT 0,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Balances" ADD CONSTRAINT "Balances_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
