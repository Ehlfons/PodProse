
import { seedData2 } from "./seedUserCheck";
import { seedDataRequest } from "./seedRequest";
import { seedFestivosNacionales } from "./seedFestivos";


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
  await prisma.companyWorkday.deleteMany();
  await prisma.workday.deleteMany();
  

  const company = await prisma.company.create({
    data: {
      id: '803ecc0f-cdea-446f-961b-567dac673986',
      name: `Verkia SLA `,
      CIF: faker.random.alphaNumeric(8), 
    },
  });

  console.log(`Se han creado la empresa  ${company.name}`);

  const daysVacations1 = await prisma.vacationsDaysYear.create({
    data : {
        companyId : company.id ,
        numberDays: generarNumero18u22() ,
        year : "2024"
        }
    });

    const daysVacations2 = await prisma.vacationsDaysYear.create({
        data : {
            companyId : company.id ,
            numberDays: generarNumero18u22() ,
            year : "2023"
        }
        });

      //Crear Jornada
      const dataWorkdayJornadaCompleta = await prisma.companyWorkday.create({
        data: {
          companyId: company.id,
          description: "Jornada Completa",

        }
      });

      const Jornada1 = await prisma.workday.create({
        data : {
            id: "e72bbce9-fcc3-47a9-9f06-44d348bd89be",
            companyWorkdayId: dataWorkdayJornadaCompleta.id,
            monday: "08:00" ,
            tuesday: "08:00" ,
            wednesday: "08:00" ,
            thursday: "08:00",
            friday: "08:00",
            saturday: "00:00",
            sunday: "00:00" ,
            dayStart : 1 ,
            monthStart : 13 ,
            dayEnd: 1,
            monthEnd: 2 ,
            description: "Default"
        }
      });

      const Jornada2 = await prisma.workday.create({
        data : {
            companyWorkdayId: dataWorkdayJornadaCompleta.id,
            monday: "06:00" ,
            tuesday: "06:00" ,
            wednesday: "06:00" ,
            thursday: "06:00",
            friday: "06:00",
            saturday: "00:00",
            sunday: "00:00" ,
            dayStart : 1 ,
            monthStart : 1 ,
            dayEnd: 1,
            monthEnd: 2 ,
            description: "Buenas tardes"
        }
      });


    //Añadir festivos a la empresa
    seedFestivosNacionales(company.id);



  // Crear el usuario admin para esta empresa
  const admin = await prisma.user.create({
    data: {
      id: '0d5334cd-c60d-4837-b034-b641849d14c3',
      name: 'Sergio El Admin',
      email: `admin@admin.com`,
      password: hashedPassword,
      DNI: generateRandomDNI(), // Genera un DNI aleatorio
      role: 'admin',
      companyWorkdayId: dataWorkdayJornadaCompleta.id ,
      companyId: company.id,
      url_img: obtenerImagenAleatoria()
    },
  });

  await createStatus(admin.id , admin.companyId)

  console.log(`Se han creado el admin ${admin.name}`);

    // Crear el usuario user para esta empresa
    const userSergio = await prisma.user.create({
      data: {
        id: '618920c2-24d4-475a-9853-724d1fd43856',
        name: 'No se ha actualizado',
        email: `user@user.com`,
        password: hashedPassword,
        DNI: generateRandomDNI(), // Genera un DNI aleatorio
        role: 'user',
        companyId: company.id,
        companyWorkdayId: dataWorkdayJornadaCompleta.id ,
        verificateAt: new Date(),
        url_img: obtenerImagenAleatoria()
      },
    });

    await createStatus(userSergio.id , userSergio.companyId)

    console.log(`Se han creado el usuario ${userSergio.name}`);
    await createVacationsForUser(userSergio.id,[ { date: new Date('2024-05-09'), description: "Prueba" }]);

        // Crear el usuario user para esta empresa
        const userDelete = await prisma.user.create({
          data: {
            id: '6c17de71-a3b6-4b4a-8693-cde0a686b43a',
            name: 'No se ha borrado',
            email: `delete@user.com`,
            password: hashedPassword,
            DNI: generateRandomDNI(), // Genera un DNI aleatorio
            role: 'user',
            companyId: company.id,
            companyWorkdayId: dataWorkdayJornadaCompleta.id ,
            verificateAt: new Date(),
            url_img: obtenerImagenAleatoria()
          },
        });
    
        await createStatus(userDelete.id , userDelete.companyId)
    
        console.log(`Se han creado el usuario ${userDelete.name}`);
        await createVacationsForUser(userDelete.id, generarVacacionesAleatorias( 2024 , generarNumeroAleatorioVacations() ));
    


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

function generarHoraAleatoriaWorkday() {
    // Generar un número aleatorio entre 0 y 1
    const randomNumber = Math.random();
  
    // Si el número aleatorio es menor que 0.5, devuelve "08:00", de lo contrario devuelve "08:30"
    if (randomNumber < 0.5) {
      return "08:00";
    } else {
      return "08:30";
    }
  }

  function generar1u2() {
    // Generar un número aleatorio entre 0 y 1
    const randomNumber = Math.random();
  
    // Si el número aleatorio es menor que 0.5, devuelve "08:00", de lo contrario devuelve "08:30"
    if (randomNumber < 0.5) {
      return true;
    } else {
      return false ;
    }
  }

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
      let fechaAleatoria;
      do {
          const inicioAnio = new Date(anio, 0); // Primer día del año
          const finAnio = new Date(anio + 1, 0); // Primer día del siguiente año
          const tiempoAleatorio = inicioAnio.getTime() + Math.random() * (finAnio.getTime() - inicioAnio.getTime());
          fechaAleatoria = new Date(tiempoAleatorio);
      } while (fechaAleatoria.getDay() === 0 || fechaAleatoria.getDay() === 6); // 0 es domingo, 6 es sábado
  
      return fechaAleatoria;
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

      async function createStatus(userId: string, companyId: string, status: number = 3) {
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

console.log('Se han creado las empresas y los usuarios asociados exitosamente.');
console.log("Tiempo transcurrido:", tiempoTranscurrido / 1000, "segundos");

createAcounts()
  .catch((error) => {
    console.error('Error al sembrar los datos:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
