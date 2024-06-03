import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('1234', 10);

  // Eliminar usuario existente si ya existe
  await prisma.user.deleteMany({
    where: {
      username: 'admin',
    },
  });

  // Crear el usuario
  const user = await prisma.user.create({
    data: {
      name: 'Podprose Admin',
      username: `admin_${Date.now()}`,
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'user',
      url_img: 'https://podprose-uploader.s3.amazonaws.com/default.png',
      verificateAt: new Date(),
    },
  });

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
    { name: 'Entretenimiento y Comedia' },
    { name: 'Deportes' },
    { name: 'Cine y Televisión' },
    { name: 'Literatura y Libros' },
    { name: 'Música' },
    { name: 'Viajes y Aventura' },
    { name: 'Espiritualidad y Religión' },
    { name: 'Autoayuda y Desarrollo Personal' },
    { name: 'Crimen y Misterio' },
    { name: 'Política' },
    { name: 'Arte y Diseño' },
    { name: 'Gastronomía y Cocina' },
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
    const randomCategory =
      allCategories[Math.floor(Math.random() * allCategories.length)];

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

  // Definir los templates de newsletters con ids únicos
  const newsletterTemplatesData: Prisma.NewsletterTemplateCreateManyInput[] = [
    {
      id: `template1_${Date.now()}`,
      subject: 'Nuevo episodio disponible: {{podcast.title}}',
      body: `<p>¡Hola, {{user.name}}!</p>
<p>Estamos emocionados de anunciar que ya está disponible un nuevo episodio de tu podcast favorito: {{podcast.title}}.</p>
<p>Descripción: {{podcast.description}}</p>
<p>Duración: 50 minutos</p>
<p>Escúchalo ahora en <a href="{{podcast.url_audio}}">{{podcast.url_audio}}</a>.</p>
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
<p>No te los pierdas, escúchalos ahora en <a href="https://podprose.com/episodios-semana">este enlace</a>.</p>
<p>¡Gracias por ser parte de nuestra comunidad!</p>
<p>Saludos,<br>El equipo de PodProse</p>`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: `template3_${Date.now()}`,
      subject: 'Recordatorio: No te pierdas {{podcast.title}}',
      body: `<p>¡Hola, {{user.name}}!</p>
<p>Solo un pequeño recordatorio de que no te pierdas este episodio de {{podcast.title}}:</p>
<p>Descripción: {{podcast.description}}</p>
<p>Duración: 60 minutos</p>
<p>Escúchalo ahora en <a href="{{podcast.url_audio}}">{{podcast.url_audio}}</a>.</p>
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
<p>Encuentra algo nuevo para escuchar hoy en <a href="https://podprose.com/sugerencias">este enlace</a>.</p>
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
<p>¡No te lo pierdas! Regístrate ahora en <a href="https://podprose.com/evento/encuentro-creadores">este enlace</a>.</p>
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
