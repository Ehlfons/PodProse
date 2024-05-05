 //Utilizado en chekins.service.ts

import { PrismaClient } from "@prisma/client";
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

async function addDataUser (   userId : string  , dataCheckIn  ){

  const user = await prisma.user.findFirstOrThrow({ where : { id : userId}});

  const addData = await prisma.data_Checkins_Users.create({
      data: dataCheckIn
  })

  return addData ;
}


export async function calculateByDate(userId: string, day: Date) {
  const startDay = new Date(day);
  startDay.setHours(0, 0, 0, 0);

  const endDay = new Date(day);
  endDay.setHours(23, 59, 0, 0);

  const dataCheckins = await prisma.checkIns_Users.findMany({
    where: {
      userId: userId,
      checkIn: {
        gte: startDay,
        lte: endDay,
      },
    },
  });

  //Ordenar para que cuadren las paradas y las pausas
  dataCheckins.sort(
    (a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime(),
  );

  let startWorkday = null;
  let dayStarted = false;
  let endWorkday = null;
  let dayEnd = false;
  let startPause = null;
  let exitsPause = false;
  let firtEntry = true;
  let pauseEndTime = null;
  let timeStart3 = null;
  let tipoPausa = null;
  let pauseTime = null;

  let registros = [];

  function addRegister(startTime, timePause, tipoPausa) {
    registros.push({ startTime, timePause, tipoPausa });
  }

  function calculateTimeDifference(startTime, endTime) {
    const timeDifference = endTime.getTime() - startTime.getTime();
    const hoursPause = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesPause = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    return { hoursPause, minutesPause };
  }

  function lastData(cantidadDatos, numeroDato, hora, tipoPausa) {
    if (cantidadDatos == numeroDato) addRegister(hora, '-1', tipoPausa);
  }

  const formatHour = (hours: number, minutes: number): string => {
    // Convertir horas y minutos a cadena y asegurarse de que tengan dos dígitos
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };

  let cantidadDatos = dataCheckins.length;

  let contador = 0;

  dataCheckins.forEach((entry) => {
    contador++;

    if (entry.type === 'StartWorkday') {
      startWorkday = new Date(entry.checkIn);

      timeStart3 = startWorkday;
      dayStarted = true;

      tipoPausa = entry.typeCode;
      lastData(cantidadDatos, contador, timeStart3, tipoPausa);
    } else if (entry.type === 'EndWorkday') {
      endWorkday = new Date(entry.checkIn);

      const { hoursPause, minutesPause } = calculateTimeDifference(
        timeStart3,
        endWorkday,
      );

      pauseTime = formatHour(hoursPause, minutesPause);
      addRegister(timeStart3, pauseTime, tipoPausa);

      tipoPausa = entry.typeCode;
      lastData(cantidadDatos, contador, endWorkday, tipoPausa);

      dayEnd = true;
    } else if (entry.type === 'PauseWorkday' || entry.type === 'RestartWorkday' ) {
      exitsPause = true;
      startPause = new Date(entry.checkIn);

      const { hoursPause, minutesPause } = calculateTimeDifference(
        timeStart3,
        startPause,
      );

      pauseTime = formatHour(hoursPause, minutesPause);
      addRegister(timeStart3, pauseTime, tipoPausa);

      timeStart3 = startPause;

      tipoPausa = entry.typeCode;
      lastData(cantidadDatos, contador, timeStart3, tipoPausa);
    } else if (entry.type === 'RestartWorkday') {
      pauseEndTime = new Date(entry.checkIn);

      const { hoursPause, minutesPause } = calculateTimeDifference(
        timeStart3,
        pauseEndTime,
      );
      pauseTime = formatHour(hoursPause, minutesPause);
      addRegister(timeStart3, pauseTime, tipoPausa);

      timeStart3 = pauseEndTime;
      tipoPausa = entry.typeCode;
      lastData(cantidadDatos, contador, timeStart3, tipoPausa);
    }


  });

  let horasTrabajadas  = "00:00" ;

  //console.log(registros)
  registros.forEach((registro) => {
    // console.log(`Esta es la pausa que analiza ${registro.timePause}`);
    if ( registro.tipoPausa !== 2 && registro.timePause !== "-1" ) {
         //console.log(`Pasa el filtro y llevamos ${registro.timePause}`);
        horasTrabajadas = sumarHoras(horasTrabajadas, registro.timePause);
        // console.log(`Horas trabajadas final ${horasTrabajadas}`);
    }else if(  registro.tipoPausa !== 2 && registro.tipoPausa !== 4){
      // console.log(registro.tipoPausa);
      let diferenciaFormateada = calcularDiferenciaHoras(registro.startTime)
      horasTrabajadas = sumarHoras(horasTrabajadas, diferenciaFormateada);



    }
});


  const dataSend = {
    dayStarted: dayStarted,
    timeDayStarted: startWorkday,
    checkins: registros,
    dayEnd: dayEnd,
    timeEndStarted: endWorkday,
    timeWorked: horasTrabajadas
  };

  function sumarHoras(hora1: string, hora2: string): string {
    // Convertir cadenas a objetos DateTime
    const hora1DateTime = DateTime.fromFormat(hora1, 'HH:mm');
    const hora2DateTime = DateTime.fromFormat(hora2, 'HH:mm');

    // Sumar las horas
    const horaTotal = hora1DateTime.plus({
      hours: hora2DateTime.hour,
      minutes: hora2DateTime.minute,
    });

    // Obtener la hora total en formato HH:mm
    const horaTotalStr = horaTotal.toFormat('HH:mm');

    return horaTotalStr;
  }

  function calcularDiferenciaHoras(horaDada: string): string {
    // Convertir la hora dada a un objeto Date
    const horaDadaDate = new Date(horaDada);
  
    // Obtener la hora actual
    const horaActual = new Date();
  
    // Calcular la diferencia de tiempo en milisegundos
    const diferenciaMilisegundos = horaActual.getTime() - horaDadaDate.getTime();
  
    // Calcular la diferencia de tiempo en horas y minutos
    const horasDiferencia = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
    const minutosDiferencia = Math.floor((diferenciaMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
  
    // Formatear la diferencia de tiempo en una cadena "XX:XX"
    const diferenciaFormateada = `${String(horasDiferencia).padStart(2, '0')}:${String(minutosDiferencia).padStart(2, '0')}`;
  
    return diferenciaFormateada;
  }









  return dataSend;
}

async function todayWorkday(userId : string , day : Date){

  const dataStandard = {
    "monday": "09:30",
    "tuesday": "09:30",
    "wednesday": "09:30",
    "thursday": "09:30",
    "friday": "09:00",
    "saturday": "00:00",
    "sunday": "00:00"
}

const user = await  prisma.user.findFirstOrThrow({ where : { id : userId}});
const companyWorkday = user.companyWorkdayId ?  await prisma.companyWorkday.findFirstOrThrow({ where : { id : user.companyWorkdayId}}) : dataStandard ;



try {
  const date = new Date(day); 
  const dayWeek = date.getDay(); 

  const nameWeeks = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const nameDay = nameWeeks[dayWeek];

  const todayWork = companyWorkday[nameDay];

  return todayWork ;
  
} catch (error) {
  return { message : 'No hay ninguna jornada registrada'}
}

}



//Este es el que hay que llamar
export async function addFinalDataCheckins(userId: string , day : Date) {
  // Obtener la fecha actual
  const today = new Date(day);

  const totalTodayData = await calculateByDate(userId,today)

  const timeWorked  = totalTodayData.timeWorked;
  const [totalTimeHours, totalTimeMinutes] = timeWorked.split(":");


  const previsionTotal = await todayWorkday(userId,day);
  const [previsionHours, previsionMinutes] = previsionTotal.split(":");


  const dataCheckinsSend = {
    previsionTotalHours: previsionHours,
    previsionTotalMinutes:previsionMinutes ,
    totalHoursWorked: totalTimeHours,
    totalMinutesWorked: totalTimeMinutes,
    userId: userId,
    date: today,
  };

  const data = await addDataUser(userId, dataCheckinsSend);

  return data;
}


