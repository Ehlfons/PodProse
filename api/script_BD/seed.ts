import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as faker from 'faker';

async function main() {
  const prisma = new PrismaClient();

  const hashedPassword = await bcrypt.hash('1234', 10);

  await prisma.company.deleteMany();
  await prisma.user.deleteMany();



  // Crear las dos empresas
  const empresa1 = await prisma.company.create({
    data: {
      name: 'Empresa 1',
      CIF: '12345678A',
    },
  });

  const empresa2 = await prisma.company.create({
    data: {
      name: 'Empresa 2',
      CIF: '87654321B',
    },
  });

  // Crear usuarios asociados a la primera empresa
  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        DNI: '22299075P' ,
        role: 'admin',
        companyId: empresa1.id,
      },
      {
        name: 'User',
        email: 'user@user.com',
        password: hashedPassword,
        DNI: '21299075P' ,
        companyId: empresa1.id,
      },
    ],
  });

  // Crear usuarios asociados a la segunda empresa
  await prisma.user.createMany({
    data: [
      {
        name: 'Admin2',
        email: 'admin2@admin.com',
        password: hashedPassword,
        DNI: '22299065P' ,
        role: 'admin',
        companyId: empresa2.id,
      },
      {
        name: 'User',
        email: 'user2@user.com',
        password: hashedPassword,
        DNI: '21244075P' ,
        companyId: empresa2.id,
      },
      // Agrega más usuarios si lo deseas
    ],
  });

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
