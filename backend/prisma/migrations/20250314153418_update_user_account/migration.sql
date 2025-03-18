/*
  Warnings:

  - You are about to drop the column `password` on the `UserAccount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firebaseUid]` on the table `UserAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firebaseUid` to the `UserAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAccount" DROP COLUMN "password",
ADD COLUMN     "firebaseUid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_firebaseUid_key" ON "UserAccount"("firebaseUid");
