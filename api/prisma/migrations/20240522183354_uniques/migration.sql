/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Podcast` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url_audio]` on the table `Podcast` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Podcast_title_key` ON `Podcast`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `Podcast_url_audio_key` ON `Podcast`(`url_audio`);
