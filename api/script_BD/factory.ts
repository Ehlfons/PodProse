import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as faker from 'faker';

const prisma = new PrismaClient();

async function seedData() {
  const hashedPassword = await bcrypt.hash('1234', 10);

  const inicio: Date = new Date();

  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  

  const numberOfCompanies = 10;
  const usersPerCompany = 10;

  for (let i = 0; i < numberOfCompanies; i++) {
    const company = await prisma.company.create({
      data: {
        name: `Empresa ${i + 1}`,
        CIF: faker.random.alphaNumeric(8), 
      },
    });

    // Crear el usuario admin para esta empresa
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: `admin${i + 1}@admin.com`,
        password: hashedPassword,
        DNI: generateRandomDNI(), // Genera un DNI aleatorio
        role: 'admin',
        companyId: company.id,
      },
    });

    // Crear usuarios adicionales para esta empresa
    for (let j = 0; j < usersPerCompany - 1; j++) {
      const pswd = faker.internet.password();
      await prisma.user.create({
        data: {
          name: faker.name.findName(),
          email: `user${j + 1}@user${i + 1}.com`,
          password: hashedPassword,
          DNI: generateRandomDNI(), // Genera un DNI aleatorio
          companyId: company.id,
        },
      });
    }
  }

  const company = await prisma.company.create({
    data: {
      name: `Verkia SLA `,
      CIF: faker.random.alphaNumeric(8), 
    },
  });


  const dataWorkday = await prisma.companyWorkday.create({
    data: {
      companyId: company.id,
      description: "Jornada Completa",
      monday: "08:30",
      tuesday: "08:30",
      wednesday: "08:30",
      thursday: "08:30",
      friday: "07:00",
      saturday: "00:00",
      sunday: "00:00"
    }
  })

  // Crear el usuario admin para esta empresa
  await prisma.user.create({
    data: {
      name: 'Sergio El Admin',
      email: `admin@admin.com`,
      password: hashedPassword,
      DNI: generateRandomDNI(), // Genera un DNI aleatorio
      role: 'admin',
      companyWorkdayId: dataWorkday.id ,
      companyId: company.id,
    },
  });

    // Crear el usuario admin para esta empresa
    const userSergio = await prisma.user.create({
      data: {
        name: 'Sergio El User',
        email: `user@user.com`,
        password: hashedPassword,
        DNI: generateRandomDNI(), // Genera un DNI aleatorio
        role: 'user',
        companyId: company.id,
      },
    });


    // Define una función para crear vacaciones para un usuario específico
    async function createVacationsForUser(userId, vacations) {
      const userVacations = vacations.map(vacation => ({
        ...vacation,
        userId: userId,
      }));

      await prisma.workersHolidays.createMany({
        data: userVacations,
      });
    }

    // Definir las vacaciones para Sergio
const sergioVacations = [
  {
    date: new Date('2024-05-01'),
    description: 'Viaje Nieve',
  },
  {
    date: new Date('2024-05-02'),
    description: 'Viaje',
  },
  {
    date: new Date('2024-05-03'),
    description: 'Viaje ',
  },
  {
    date: new Date('2024-05-04'),
    description: 'Viaje Nieve',
  },
  {
    date: new Date('2024-05-24'),
    description: 'Viaje',
  },
  {
    date: new Date('2024-05-25'),
    description: 'Viaje ',
  },
];

// Crear las vacaciones para Sergio
await createVacationsForUser(userSergio.id, sergioVacations);






  function generateRandomDNI() {
    // Genera un número aleatorio de 8 dígitos
    const randomNumber = faker.datatype.number({ min: 10000000, max: 99999999 });
  
    // Genera una letra aleatoria
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Genera una letra aleatoria entre A y Z
  
    // Combina el número y la letra para formar el DNI completo
    const dni = `${randomNumber}${randomLetter}`;
  
    return dni;
  };

  const fin: Date = new Date();
  const tiempoTranscurrido: number = fin.getTime() - inicio.getTime();

  console.log('Se han creado las empresas y los usuarios asociados exitosamente.');
  console.log("Tiempo transcurrido:", tiempoTranscurrido / 1000, "segundos");


}

seedData()
  .catch((error) => {
    console.error('Error al sembrar los datos:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
