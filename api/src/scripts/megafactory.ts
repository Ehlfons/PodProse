import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  const hashedPassword = await bcrypt.hash("1234", 10);

  // Crear el usuario
  const user = await prisma.user.create({
    data: {
      name: 'Podprose Admin',
      username: 'Sergio admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'user',
      url_img: 'https://podprose-uploader.s3.amazonaws.com/default.png',
      verificateAt: new Date(),
    },
  });

  // Crear 99 podcasts asociados a este usuario
  const podcastsData: Prisma.PodcastCreateManyInput[] = [];
  for (let i = 1; i <= 99; i++) {
    podcastsData.push({
      title: `#${i} - Podcast`,
      description: `Description for Podcast ${i}`,
      url_img: `https://podprose-uploader.s3.amazonaws.com/img/${i}.png`,
      url_audio: `https://podprose-uploader.s3.amazonaws.com/audio/${i}.mp3`,
      userId: user.id,
    });
  }

  await prisma.podcast.createMany({
    data: podcastsData,
  });

  console.log('Usuario y podcasts creados exitosamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });