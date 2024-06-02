/*
  Warnings:

  - You are about to drop the `_CategoryToPodcast` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Podcast` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_CategoryToPodcast` DROP FOREIGN KEY `_CategoryToPodcast_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToPodcast` DROP FOREIGN KEY `_CategoryToPodcast_B_fkey`;

-- AlterTable
ALTER TABLE `Podcast` ADD COLUMN `categoryId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_CategoryToPodcast`;

-- AddForeignKey
ALTER TABLE `Podcast` ADD CONSTRAINT `Podcast_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
