import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('1234', 10);

  // Crear 10 usuarios
  const usersData: Prisma.UserCreateInput[] = [];
  for (let i = 1; i <= 10; i++) {
    usersData.push({
      name: `Podprose Admin ${i}`,
      username: `PodProse_Admin${i}`,
      email: `admin${i}@admin.com`,
      password: hashedPassword,
      role: 'user',
      url_img: 'https://podprose-uploader.s3.amazonaws.com/default.png',
      verificateAt: new Date(),
    });
  }

  // Eliminar usuarios existentes si ya existen
  for (const user of usersData) {
    await prisma.user.deleteMany({
      where: {
        username: user.username,
      },
    });
  }

  // Crear los usuarios y almacenar los resultados
  const createdUsers = [];
  for (const userData of usersData) {
    const user = await prisma.user.create({
      data: userData,
    });
    createdUsers.push(user);
  }

  // Definir las categorías
  const categoriesData: Prisma.CategoryCreateManyInput[] = [
    { name: 'Tecnología' },
    { name: 'Ciencia' },
    { name: 'Historia' },
    { name: 'Noticias y Actualidad' },
    { name: 'Cultura y Sociedad' },
    { name: 'Salud y Bienestar' },
    { name: 'Educación' },
    { name: 'Negocios y Finanzas' },
    { name: 'Entretenimiento' },
    { name: 'Deportes' },
    { name: 'Cine y Televisión' },
    { name: 'Literatura y Libros' },
    { name: 'Música' },
    { name: 'Viajes y Aventura' },
    { name: 'Espiritualidad' },
    { name: 'Desarrollo Personal' },
    { name: 'Crimen y Misterio' },
    { name: 'Política' },
    { name: 'Arte y Diseño' },
    { name: 'Gastronomía y Cocina' },
  ];

  // Crear las categorías
  await prisma.category.createMany({
    data: categoriesData,
  });

  console.log('Categorías creadas exitosamente');

  // Obtener todas las categorías
  const allCategories = await prisma.category.findMany();

  // Crear 99 podcasts y distribuirlos entre los 10 usuarios
  const podcastsData: Prisma.PodcastCreateManyInput[] = [];
  for (let i = 1; i <= 99; i++) {
    // Seleccionar una categoría aleatoria
    const randomCategory =
      allCategories[Math.floor(Math.random() * allCategories.length)];
    // Asignar el usuario correspondiente (cada usuario recibe 10 podcasts excepto el último)
    const userId = createdUsers[Math.floor((i - 1) / 10)].id;

    podcastsData.push({
      title: `#${i} - Título número ${i}`,
      description: `Episodio ${i}: Explora ideas innovadoras y nuevos contenidos`,
      url_img: `https://podprose-uploader.s3.amazonaws.com/img/${i}.png`,
      url_audio: `https://podprose-uploader.s3.amazonaws.com/audio/${i}.mp3`,
      userId: userId,
      categoryId: randomCategory.id,
    });
  }

  await prisma.podcast.createMany({
    data: podcastsData,
  });

  console.log('Usuarios y podcasts creados exitosamente');

  // Definir los templates de newsletters con ids únicos
  const newsletterTemplatesData: Prisma.NewsletterTemplateCreateManyInput[] = [
    {
      id: `template1_${Date.now()}`,
      subject: 'Nuevo episodio disponible: {{podcast1.title}}',
      body: `<p>¡Hola, {{user.name}}!</p>
<p>Estamos emocionados de anunciar que ya está disponible un nuevo episodio de tu podcast favorito: {{podcast1.title}}.</p>
<p>Descripción: {{podcast1.description}}</p>
<p>Duración: 50 minutos</p>
<p>Escúchalo ahora en <a href="{{podcast1.url_audio}}">este enlace</a>.</p>
<p>¡Gracias por seguir escuchando y apoyando a PodProse!</p>
<p>Saludos,<br>El equipo de PodProse</p>`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: `template2_${Date.now()}`,
      subject: 'Boletín Semanal de PodProse: 10 de junio de 2024',
      body: `<p>¡Hola, {{user.name}}!</p>
<p>Bienvenido al boletín semanal de PodProse. Aquí te presentamos los últimos episodios y novedades de esta semana:</p>
<ol>
  <li>{{podcast1.title}} - {{podcast1.description}}</li>
  <li>{{podcast2.title}} - {{podcast2.description}}</li>
  <li>{{podcast3.title}} - {{podcast3.description}}</li>
</ol>
<p>No te los pierdas, escúchalos ahora en <a href="http://app.podprose.tech/explore">este enlace</a>.</p>
<p>¡Gracias por ser parte de nuestra comunidad!</p>
<p>Saludos,<br>El equipo de PodProse</p>`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: `template3_${Date.now()}`,
      subject: 'Recordatorio: No te pierdas {{podcast1.title}}',
      body: `<p>¡Hola, {{user.name}}!</p>
<p>Solo un pequeño recordatorio de que no te pierdas este episodio de {{podcast1.title}}:</p>
<p>Descripción: {{podcast1.description}}</p>
<p>Duración: 60 minutos</p>
<p>Escúchalo ahora en <a href="{{podcast1.url_audio}}">este enlace</a>.</p>
<p>¡Gracias por escuchar PodProse!</p>
<p>Saludos,<br>El equipo de PodProse</p>`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: `template4_${Date.now()}`,
      subject: 'Sugerencias de Podcasts para Ti',
      body: `<p>¡Hola, {{user.name}}!</p>
<p>Aquí en PodProse, siempre estamos buscando ofrecerte lo mejor. Aquí tienes algunas sugerencias de podcasts que creemos que te encantarán:</p>
<ol>
  <li>{{podcast1.title}} - {{podcast1.description}}</li>
  <li>{{podcast2.title}} - {{podcast2.description}}</li>
  <li>{{podcast3.title}} - {{podcast3.description}}</li>
</ol>
<p>Encuentra algo nuevo para escuchar hoy en <a href="http://app.podprose.tech/explore">este enlace</a>.</p>
<p>¡Disfruta escuchando!</p>
<p>Saludos,<br>El equipo de PodProse</p>`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: `template5_${Date.now()}`,
      subject:
        'No te pierdas nuestro próximo evento: Encuentro con Creadores de Podcasts',
      body: `<p>¡Hola, {{user.name}}!</p>
<p>Estamos emocionados de invitarte a nuestro próximo evento especial: Encuentro con Creadores de Podcasts.</p>
<p>Fecha: 25 de junio de 2024</p>
<p>Hora: 18:00</p>
<p>Descripción: Únete a nosotros para una noche de charlas inspiradoras y networking con algunos de los creadores de podcasts más influyentes de la industria.</p>
<p>¡No te lo pierdas! Regístrate ahora en <a href="http://app.podprose.tech/explore">este enlace</a>.</p>
<p>¡Gracias por ser parte de PodProse!</p>
<p>Saludos,<br>El equipo de PodProse</p>`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await prisma.newsletterTemplate.createMany({
    data: newsletterTemplatesData,
  });

  console.log('Templates de newsletters creados exitosamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
