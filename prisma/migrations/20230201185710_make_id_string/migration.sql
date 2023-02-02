/*
  Warnings:

  - The primary key for the `ClientUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Pet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProviderUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tour` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Pet` DROP FOREIGN KEY `Pet_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `Picture` DROP FOREIGN KEY `Picture_tourId_fkey`;

-- DropForeignKey
ALTER TABLE `Tour` DROP FOREIGN KEY `Tour_walkerId_fkey`;

-- DropForeignKey
ALTER TABLE `TourRoute` DROP FOREIGN KEY `TourRoute_tourId_fkey`;

-- DropForeignKey
ALTER TABLE `Video` DROP FOREIGN KEY `Video_tourId_fkey`;

-- DropForeignKey
ALTER TABLE `_PetToTour` DROP FOREIGN KEY `_PetToTour_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PetToTour` DROP FOREIGN KEY `_PetToTour_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ProviderRoleToProviderUser` DROP FOREIGN KEY `_ProviderRoleToProviderUser_B_fkey`;

-- AlterTable
ALTER TABLE `ClientUser` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Pet` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `ownerId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Picture` MODIFY `tourId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProviderUser` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Tour` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `walkerId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `TourRoute` MODIFY `tourId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Video` MODIFY `tourId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `_PetToTour` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_ProviderRoleToProviderUser` MODIFY `B` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `ClientUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tour` ADD CONSTRAINT `Tour_walkerId_fkey` FOREIGN KEY (`walkerId`) REFERENCES `ProviderUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_tourId_fkey` FOREIGN KEY (`tourId`) REFERENCES `Tour`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_tourId_fkey` FOREIGN KEY (`tourId`) REFERENCES `Tour`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TourRoute` ADD CONSTRAINT `TourRoute_tourId_fkey` FOREIGN KEY (`tourId`) REFERENCES `Tour`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProviderRoleToProviderUser` ADD CONSTRAINT `_ProviderRoleToProviderUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProviderUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PetToTour` ADD CONSTRAINT `_PetToTour_A_fkey` FOREIGN KEY (`A`) REFERENCES `Pet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PetToTour` ADD CONSTRAINT `_PetToTour_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tour`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
