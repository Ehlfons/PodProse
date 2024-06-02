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

  // Definir las categorías
  const categoriesData: Prisma.CategoryCreateManyInput[] = [
    { name: "Tecnología" },
    { name: "Ciencia" },
    { name: "Historia" },
    { name: "Noticias y Actualidad" },
    { name: "Cultura y Sociedad" },
    { name: "Salud y Bienestar" },
    { name: "Educación" },
    { name: "Negocios y Finanzas" },
    { name: "Entretenimiento y Comedia" },
    { name: "Deportes" },
    { name: "Cine y Televisión" },
    { name: "Literatura y Libros" },
    { name: "Música" },
    { name: "Viajes y Aventura" },
    { name: "Espiritualidad y Religión" },
    { name: "Autoayuda y Desarrollo Personal" },
    { name: "Crimen y Misterio" },
    { name: "Política" },
    { name: "Arte y Diseño" },
    { name: "Gastronomía y Cocina" },
  ];

  // Crear las categorías
  const categories = await prisma.category.createMany({
    data: categoriesData,
  });

  console.log('Categorías creadas exitosamente');

  // Obtener todas las categorías
  const allCategories = await prisma.category.findMany();

  // Crear 99 podcasts asociados a este usuario con categorías aleatorias
  const podcastsData: Prisma.PodcastCreateManyInput[] = [];
  for (let i = 1; i <= 99; i++) {
    // Seleccionar una categoría aleatoria
    const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];

    podcastsData.push({
      title: `#${i} - Podcast`,
      description: `Description for Podcast ${i}`,
      url_img: `https://podprose-uploader.s3.amazonaws.com/img/${i}.png`,
      url_audio: `https://podprose-uploader.s3.amazonaws.com/audio/${i}.mp3`,
      userId: user.id,
      categoryId: randomCategory.id, // Asignar categoría aleatoria
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
