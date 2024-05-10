import { seedData2 } from './seedUserCheck';
import { seedDataRequest } from './seedRequest';
import { seedFestivosNacionales } from './seedFestivos';

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as faker from 'faker';

const prisma = new PrismaClient();
const inicio: Date = new Date();

async function createAcounts() {
  const hashedPassword = await bcrypt.hash('1234', 10);
  const inicio: Date = new Date();

  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  await prisma.data_Checkins_Users.deleteMany();
  await prisma.checkIns_Users.deleteMany();

  const numberOfCompanies = 1;
  const usersPerCompany = 15;

  for (let i = 0; i < numberOfCompanies; i++) {
    const company = await prisma.company.create({
      data: {
        name: `Empresa ${i + 1}`,
        CIF: faker.random.alphaNumeric(8),
      },
    });

    const daysVacations1 = await prisma.vacationsDaysYear.create({
      data: {
        companyId: company.id,
        numberDays: generarNumero18u22(),
        year: '2024',
      },
    });

    const daysVacations2 = await prisma.vacationsDaysYear.create({
      data: {
        companyId: company.id,
        numberDays: generarNumero18u22(),
        year: '2023',
      },
    });

    //Crear Jornada
    const dataWorkdayJornadaCompleta = await prisma.companyWorkday.create({
      data: {
        companyId: company.id,
        description: 'Jornada Completa',
        monday: generarHoraAleatoriaWorkday(),
        tuesday: generarHoraAleatoriaWorkday(),
        wednesday: generarHoraAleatoriaWorkday(),
        thursday: generarHoraAleatoriaWorkday(),
        friday: generarHoraAleatoriaWorkday(),
        saturday: '00:00',
        sunday: '00:00',
      },
    });

    //Crear Jornada
    const dataWorkdayMediaJornada = await prisma.companyWorkday.create({
      data: {
        companyId: company.id,
        description: 'Media Jornada',
        monday: generarHoraAleatoriaWorkday(),
        tuesday: generarHoraAleatoriaWorkday(),
        wednesday: generarHoraAleatoriaWorkday(),
        thursday: generarHoraAleatoriaWorkday(),
        friday: generarHoraAleatoriaWorkday(),
        saturday: '00:00',
        sunday: '00:00',
      },
    });

    //Añadir festivos a la empresa
    seedFestivosNacionales(company.id);

    console.log(`Se ha creado la empresa ${company.name}`);

    // Crear el usuario admin para esta empresa
    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: `admin${i + 1}@admin.com`,
        password: hashedPassword,
        DNI: generateRandomDNI(), // Genera un DNI aleatorio
        role: 'admin',
        companyId: company.id,
        url_img: obtenerImagenAleatoria(),
      },
    });
    await createStatus(admin.id, admin.companyId);

    console.log(`Se ha creado el admin  ${admin.name}`);

    // Crear usuarios adicionales para esta empresa
    for (let j = 0; j < usersPerCompany - 1; j++) {
      //const pswd = faker.internet.password();
      const user = await prisma.user.create({
        data: {
          name: faker.name.findName(),
          email: `user${j + 1}@user${i + 1}.com`,
          password: hashedPassword,
          DNI: generateRandomDNI(), // Genera un DNI aleatorio
          companyId: company.id,
          companyWorkdayId: generar1u2
            ? dataWorkdayJornadaCompleta.id
            : dataWorkdayMediaJornada.id,
          verificateAt: new Date(),
          url_img: obtenerImagenAleatoria(),
        },
      });

      await createStatus(user.id, user.companyId);

      console.log(`Se ha creado el user  ${user.name}`);

      await createVacationsForUser(
        user.id,
        generarVacacionesAleatorias(2024, generarNumeroAleatorioVacations()),
      );

      console.log(`Se han creado vacaciones para  el user  ${user.name}`);

      await seedData2(user.id)
        .catch((error) => {
          console.error('Error al sembrar los datos:', error);
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      console.log('Fichajes Completados');
      console.log(`Empezamos con  lo chulo!!`);

      //await seedDataResum(user.id)
      // .catch((error) => {
      //   console.error('Error al sembrar los datos:', error);
      // })
      // .finally(async () => {
      //   await prisma.$disconnect();
      // });

      console.log(`Se han creado registros para  el user  ${user.name}`);

      await seedDataRequest(user.id, company.id, 1);
      await seedDataRequest(user.id, company.id, 2);
      await seedDataRequest(user.id, company.id, 3);

      console.log(`Se han creado peticiones  ${user.name}`);
    }
  }

  const company = await prisma.company.create({
    data: {
      name: `Verkia SLA `,
      CIF: faker.random.alphaNumeric(8),
    },
  });

  console.log(`Se han creado la empresa  ${company.name}`);

  const daysVacations1 = await prisma.vacationsDaysYear.create({
    data: {
      companyId: company.id,
      numberDays: generarNumero18u22(),
      year: '2024',
    },
  });

  const daysVacations2 = await prisma.vacationsDaysYear.create({
    data: {
      companyId: company.id,
      numberDays: generarNumero18u22(),
      year: '2023',
    },
  });

  //Crear Jornada
  const dataWorkdayJornadaCompleta = await prisma.companyWorkday.create({
    data: {
      companyId: company.id,
      description: 'Jornada Completa',
      monday: generarHoraAleatoriaWorkday(),
      tuesday: generarHoraAleatoriaWorkday(),
      wednesday: generarHoraAleatoriaWorkday(),
      thursday: generarHoraAleatoriaWorkday(),
      friday: generarHoraAleatoriaWorkday(),
      saturday: '00:00',
      sunday: '00:00',
    },
  });

  //Añadir festivos a la empresa
  seedFestivosNacionales(company.id);

  // Crear el usuario admin para esta empresa
  const admin = await prisma.user.create({
    data: {
      name: 'Sergio El Admin',
      email: `admin@admin.com`,
      password: hashedPassword,
      DNI: generateRandomDNI(), // Genera un DNI aleatorio
      role: 'admin',
      companyId: company.id,
      url_img: obtenerImagenAleatoria(),
    },
  });

  await createStatus(admin.id, admin.companyId);

  console.log(`Se han creado el admin ${admin.name}`);

  // Crear el usuario admin para esta empresa
  const userSergio = await prisma.user.create({
    data: {
      name: 'Sergio El User',
      email: `user@user.com`,
      password: hashedPassword,
      DNI: generateRandomDNI(), // Genera un DNI aleatorio
      role: 'user',
      companyId: company.id,
      companyWorkdayId: dataWorkdayJornadaCompleta.id,
      verificateAt: new Date(),
      url_img: obtenerImagenAleatoria(),
    },
  });

  await createStatus(userSergio.id, userSergio.companyId);

  console.log(`Se han creado el usuario ${userSergio.name}`);

  // Crear las vacaciones para Sergio
  await createVacationsForUser(
    userSergio.id,
    generarVacacionesAleatorias(2024, generarNumeroAleatorioVacations()),
  );

  await seedData2(userSergio.id)
    .catch((error) => {
      console.error('Error al sembrar los datos:', error);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  //   await seedDataResum(userSergio.id)
  // .catch((error) => {
  //     console.error('Error al sembrar los datos:', error);
  //   })
  //   .finally(async () => {
  //     await prisma.$disconnect();
  //   });

  console.log(`Se han creado vacaciones y registros para  ${userSergio.name}`);

  await seedDataRequest(userSergio.id, company.id, 2);
  await seedDataRequest(userSergio.id, company.id, 1);
  await seedDataRequest(userSergio.id, company.id, 1);
  await seedDataRequest(userSergio.id, company.id, 1);
  await seedDataRequest(userSergio.id, company.id, 3);

  console.log(`Se han creado peticiones  ${userSergio.name}`);

  function generateRandomDNI() {
    // Genera un número aleatorio de 8 dígitos
    const randomNumber = faker.datatype.number({
      min: 10000000,
      max: 99999999,
    });

    // Genera una letra aleatoria
    const randomLetter = String.fromCharCode(
      65 + Math.floor(Math.random() * 26),
    ); // Genera una letra aleatoria entre A y Z

    // Combina el número y la letra para formar el DNI completo
    const dni = `${randomNumber}${randomLetter}`;

    return dni;
  }

  const fin: Date = new Date();
  const tiempoTranscurrido: number = fin.getTime() - inicio.getTime();

  console.log(
    'Se han creado las empresas y los usuarios asociados exitosamente.',
  );
  console.log('Tiempo transcurrido:', tiempoTranscurrido / 1000, 'segundos');
}

function generarHoraAleatoriaWorkday() {
  // Generar un número aleatorio entre 0 y 1
  const randomNumber = Math.random();

  // Si el número aleatorio es menor que 0.5, devuelve "08:00", de lo contrario devuelve "08:30"
  if (randomNumber < 0.5) {
    return '08:00';
  } else {
    return '08:30';
  }
}

function generar1u2() {
  // Generar un número aleatorio entre 0 y 1
  const randomNumber = Math.random();

  // Si el número aleatorio es menor que 0.5, devuelve "08:00", de lo contrario devuelve "08:30"
  if (randomNumber < 0.5) {
    return true;
  } else {
    return false;
  }
}

// Define una función para crear vacaciones para un usuario específico
async function createVacationsForUser(userId, vacations) {
  const userVacations = vacations.map((vacation) => ({
    ...vacation,
    userId: userId,
  }));

  await prisma.workersHolidays.createMany({
    data: userVacations,
  });
}

function generarVacacionesAleatorias(anio, numeroDias) {
  const randmVacations = [];

  for (let i = 0; i < numeroDias; i++) {
    const fecha = generarFechaAleatoria(anio);
    const descripcion = faker.lorem.words(2); // Genera una descripción aleatoria de dos palabras
    randmVacations.push({ date: fecha, description: descripcion });
  }

  return randmVacations;
}

function generarFechaAleatoria(anio) {
  const inicioAnio = new Date(anio, 0); // Primer día del año
  const finAnio = new Date(anio + 1, 0); // Primer día del siguiente año
  const tiempoAleatorio =
    inicioAnio.getTime() +
    Math.random() * (finAnio.getTime() - inicioAnio.getTime());
  return new Date(tiempoAleatorio);
}

function generarNumeroAleatorioVacations() {
  return Math.floor(Math.random() * (22 - 14 + 1)) + 14;
}

function generarNumero18u22() {
  return Math.floor(Math.random() * (22 - 18 + 1)) + 18;
}

function obtenerImagenAleatoria(): string {
  // Generar un número aleatorio entre 1 y 5 (ambos incluidos)
  const numero = Math.floor(Math.random() * 5) + 1;
  // Devolver el nombre de la imagen
  return `default${numero}.png`;
}

async function createStatus(
  userId: string,
  companyId: string,
  status: number = 3,
) {
  try {
    const datoActualizado = await prisma.statusWorkers.create({
      data: {
        userId: userId,
        companyId: companyId,
        status: status,
      },
    });
    console.log('Dato creado:', datoActualizado);
  } catch (error) {
    console.error('Error', error);
  }
}

const fin: Date = new Date();
const tiempoTranscurrido: number = fin.getTime() - inicio.getTime();

console.log(
  'Se han creado las empresas y los usuarios asociados exitosamente.',
);
console.log('Tiempo transcurrido:', tiempoTranscurrido / 1000, 'segundos');

createAcounts()
  .catch((error) => {
    console.error('Error al sembrar los datos:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
