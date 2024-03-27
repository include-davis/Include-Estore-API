/*
  Warnings:

  - You are about to drop the `Playlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaylistToSong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistToSong" DROP CONSTRAINT "PlaylistToSong_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistToSong" DROP CONSTRAINT "PlaylistToSong_songId_fkey";

-- DropTable
DROP TABLE "Playlist";

-- DropTable
DROP TABLE "PlaylistToSong";

-- DropTable
DROP TABLE "Song";
