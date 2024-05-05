import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as faker from 'faker';
import { addFinalDataCheckins } from './dataCheckinTOTAL';



export async function seedData2(userId) {
  const hashedPassword = await bcrypt.hash('1234', 10);
  const prisma = new PrismaClient();


  const previsionTotalHours = "08";
  const previsionTotalMinutes = "30";
  //let userId = "051a1fb5-e2f9-437b-a910-bce2f43740af";

 

 // Función para generar la hora de entrada
function horaEntrada() {
  // Generamos un número aleatorio entre 0 y 1
  const random = Math.random();
  // Si el número aleatorio es menor que 0.5, devolvemos "08", de lo contrario, devolvemos "09"
  return random < 0.5 ? "08" : "09";
}

// Función para generar los minutos
function minutos() {
  // Generar un número aleatorio entre 0 y 59 (ambos inclusive)
  return Math.floor(Math.random() * 60).toString().padStart(2, '0');
}

const startDate = new Date('2024-02-01'); // Fecha de inicio
const endDate = new Date('2024-04-29'); // Fecha de final

// Ciclo para generar registros de entrada y salida para cada día hábil de Febrero
for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
  // Verificando si es fin de semana (sábado o domingo)
  if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
    continue; // Saltar el día si es fin de semana
  }

  // Agregando cero inicial si es necesario
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const StartWorkday = await prisma.checkIns_Users.create({
    data: {
      type: "StartWorkday",
      typeCode: 1,
      userId: userId,
      checkIn: `${year}-${month}-${day}T${horaEntrada()}:${minutos()}:00.00Z`
    },
  });

  const PauseWorkday = await prisma.checkIns_Users.create({
    data: {
      type: "PauseWorkday",
      typeCode: 2,
      userId: userId,
      checkIn: `${year}-${month}-${day}T10:${minutos()}:52.342Z`
    },
  });

  const RestartWorkday = await prisma.checkIns_Users.create({
    data: {
      type: "RestartWorkday",
      typeCode: 3,
      userId: userId,
      checkIn: `${year}-${month}-${day}T11:${minutos()}:52.342Z`
    },
  });

  if (horaEntrada() === "08") {
    const PauseWorkday2 = await prisma.checkIns_Users.create({
      data: {
        type: "PauseWorkday",
        typeCode: 2,
        userId: userId,
        checkIn: `${year}-${month}-${day}T14:${minutos()}:52.342Z`
      },
    });

    const RestartWorkday2 = await prisma.checkIns_Users.create({
      data: {
        type: "RestartWorkday",
        typeCode: 3,
        userId: userId,
        checkIn: `${year}-${month}-${day}T15:${minutos()}:52.342Z`
      },
    });
  }

  const EndWorkday = await prisma.checkIns_Users.create({
    data: {
      type: "EndWorkday",
      typeCode: 4,
      userId: userId,
      checkIn: `${year}-${month}-${day}T17:${minutos()}:52.342Z`
    },
  });

  const addData = addFinalDataCheckins(userId , EndWorkday.checkIn);
};
}



