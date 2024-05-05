import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as faker from 'faker';



export async function seedDataRequest(userId , companyId , type) {

  const prisma = new PrismaClient();


const fecha = generarFechas(generarFechaInicioDeseada("2024"));

    if( type === 1){
        await prisma.workersRequest.create({
            data : { 
                startDate: fecha.inicio ,
                endDate: fecha.final  ,
                type: "Vacaciones",
                description: generarDescripcion(),
                userId: userId,
                status:"Solicitado",
                companyId:companyId

             }
        });

    }else if( type === 2){
        await prisma.workersRequest.create({
            data : {
                startDate: fecha.inicio,
                endDate: fecha.final,
                type: "Vacaciones",
                description: generarDescripcion(),
                userId: userId,
                status:"Denegado",
                companyId:companyId,
                response: "Eres un mal empleado"
            }
        });
    }else {
        await prisma.workersRequest.create({
            data : {
                startDate: fecha.inicio,
                endDate: fecha.final,
                type: "Vacaciones",
                description: generarDescripcion(),
                userId: userId,
                status:"Aprobado",
                companyId:companyId,
                response: "Vete y dejame en paz"
            }                            
        });
    }





}

function generarFechaInicioDeseada(año) {
    // Seleccionar un mes aleatorio entre 1 y 12
    const mes = Math.floor(Math.random() * 12) + 1;

    // Generar un día aleatorio entre 1 y 28 (para simplificar)
    const dia = Math.floor(Math.random() * 28) + 1;

    // Formatear la fecha en el formato "xxxx-xx-xx"
    const formatoFecha = (año, mes, dia) => {
        mes = mes < 10 ? '0' + mes : mes;
        dia = dia < 10 ? '0' + dia : dia;
        return `${año}-${mes}-${dia}`;
    };

    return formatoFecha(año, mes, dia);
}


function generarFechas(inicioDeseado) {
    // Obtener una fecha aleatoria dentro del rango de 3 a 7 días
    const diferenciaDias = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
    
    // Convertir la fecha inicial deseada a objeto Date
    const inicio = new Date(inicioDeseado);

    // Obtener la fecha final sumando la diferencia de días
    const final = new Date(inicio.getTime() + diferenciaDias * 24 * 60 * 60 * 1000);

    // Formatear las fechas en el formato "xxxx-xx-xx"
    const formatoFecha = fecha => {
        const año = fecha.getFullYear();
        let mes = fecha.getMonth() + 1;
        if (mes < 10) mes = "0" + mes;
        let dia = fecha.getDate();
        if (dia < 10) dia = "0" + dia;
        return `${año}-${mes}-${dia}`;
    };

    return {
        inicio: formatoFecha(inicio),
        final: formatoFecha(final)
    };
}


function generarDescripcion() {
    const faker = require('faker');
    const numPalabras = faker.datatype.number({ min: 5, max: 20 });
    let descripcion = faker.lorem.words(numPalabras);
    return descripcion.charAt(0).toUpperCase() + descripcion.slice(1) + ".";
}



