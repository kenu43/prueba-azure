import listados from 'app/interfaz/recursos/Listados.json';
import { lstDias, lstMeses } from 'app/interfaz/recursos/ListasGenerales.json';

import type { getInfoFechaFunc, GetLocalDateFunc } from './types/FuncionesTypes';

export const habilitarPermiso = (permisos: string[] = [], permiso = '') =>
  !permisos.includes(permiso);

export const getInfoFecha: getInfoFechaFunc = (fecha) => {
  const date = new Date(`${fecha}T00:00:00.00`);
  const year = date.getFullYear();

  const month = date.getMonth();
  const strMonth = lstMeses[month];
  const semester = month < 6 ? 0 : 1;
  const strSemester = listados.lstSemestres[semester];
  let quarter = Number.NaN;
  let strQuarter = '';

  if (month < 3) {
    quarter = 0;
    strQuarter = listados.lstTrimestres[0];
  }
  else if (month < 6) {
    quarter = 1;
    strQuarter = listados.lstTrimestres[1];
  }
  else if (month < 9) {
    quarter = 2;
    strQuarter = listados.lstTrimestres[2];
  }
  else if (month < 12) {
    quarter = 3;
    strQuarter = listados.lstTrimestres[3];
  }

  const day = date.getDate();
  const weekDay = date.getDay();
  const strDay = lstDias[weekDay];

  return {
    date,
    year,
    semester,
    strSemester,
    quarter,
    strQuarter,
    month,
    strMonth,
    day,
    weekDay,
    strDay,
  };
};

export const getLocalDate: GetLocalDateFunc = (opciones) => {
  const options: Intl.DateTimeFormatOptions = {
    ...opciones,
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const fechaLetra = new Date().toLocaleDateString('es-CO', options);
  const fechaHora = fechaLetra.split(', ');
  const fecha = fechaHora[0].split('/').reverse().join('-');
  const hora = fechaHora[1];

  const date = new Date(`${fecha}T${hora}`);
  const year = date.getFullYear();
  const mes = lstMeses[date.getMonth()];
  const weekDay = lstDias[date.getDay()];
  const day = date.getDate();

  return {
    fecha,
    hora,
    year,
    mes,
    day,
    weekDay,
    date,
    mesNumber: date.getMonth(),
  };
};

export const calcularEdad = (fecha: string, fechaEvento?: string): number => {
  if (!fecha)
    return 0;

  const { date: hoy } = getLocalDate();
  const { date: nacimiento } = getInfoFecha(fecha);
  const { date } = getInfoFecha(fechaEvento!);

  const today: Date = fechaEvento ? date : hoy;
  const birthDate: Date = nacimiento;
  let age: number = today.getFullYear() - birthDate.getFullYear();
  const month: number = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
};

export const formatearFechaDDMMYYYY = (fecha?: string) => {
  if (!fecha)
    return '';
  const date = new Date(fecha);
  if (Number.isNaN(date.getTime()))
    return fecha;

  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const anio = date.getFullYear();

  return `${dia}/${mes}/${anio}`;
};
