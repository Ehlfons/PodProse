import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as faker from 'faker';

const prisma = new PrismaClient();

export async function seedFestivosNacionales(companyId) {
  festivosNacionales.forEach((day) => {
    addNacional(companyId, day);
  });
}

async function addNacional(companyId, data) {
  await prisma.companyHolidays.create({
    data: {
      date: data.date,
      type: data.type,
      description: data.description,
      companyId: companyId,
    },
  });
}

const festivosNacionales = [
  {
    date: '2024-01-01T00:00:00.000Z',
    type: 'Nacional',
    description: 'Año Nuevo',
  },
  {
    date: '2024-01-06T00:00:00.000Z',
    type: 'Nacional',
    description: 'Epifania del Señor',
  },
  {
    date: '2024-03-29T00:00:00.000Z',
    type: 'Nacional',
    description: 'Viernes Santo',
  },
  {
    date: '2024-05-01T00:00:00.000Z',
    type: 'Nacional',
    description: 'Fiesta del trabajo',
  },
  {
    date: '2024-08-15T00:00:00.000Z',
    type: 'Nacional',
    description: 'Asunción de la Virgen',
  },
  {
    date: '2024-10-12T00:00:00.000Z',
    type: 'Nacional',
    description: 'Fiesta Nacional de España',
  },
  {
    date: '2024-11-01T00:00:00.000Z',
    type: 'Nacional',
    description: 'Todos los Santos',
  },
  {
    date: '2024-12-06T00:00:00.000Z',
    type: 'Nacional',
    description: 'Día de la Constitución EspAñola',
  },
  {
    date: '2024-12-25T00:00:00.000Z',
    type: 'Nacional',
    description: 'Natividad del Señor',
  },
];
