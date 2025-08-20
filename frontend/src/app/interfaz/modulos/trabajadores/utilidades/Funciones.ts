import {
  calcularEdad,
  getInfoFecha,
  getLocalDate,
} from 'utilidades/FuncionesGenerales';

import type {
  ClasificacionType,
  TrabajadoresType,
} from '../types/TrabajadoresTypes';

export const calcularMenorEdad = (
  fechaNacimiento: string,
  fechaIngreso?: string
) => {
  if (!fechaNacimiento) return false;
  const { date } = getInfoFecha(fechaIngreso!);
  const { date: hoy } = getLocalDate();

  const fecha = fechaIngreso ? date : hoy;

  const fechaLimite = new Date(fecha);
  fechaLimite.setFullYear(fechaLimite.getFullYear() - 16);

  const nacimiento = new Date(fechaNacimiento);
  return nacimiento <= fechaLimite;
};

export const obtenerValue = (valor: string, constante: ClasificacionType[]) =>
  constante.find((item) => item.codigo === valor)?.label ?? valor;

export const validarDatosTablaTrabajadores = (
  datosQuery: TrabajadoresType[]
) => {
  return datosQuery?.map((dato) => ({
    nombre: dato.nombre,
    idEmpresa: dato.idEmpresa,
    id: dato.id,
    cedula: dato.cedula,
    sede: dato.gerencia,
    area: dato.area,
    nombreEmpresa: dato.empresa,
  }));
};

export const obtenerAntiguedad = (
  fechaIngreso: string,
  fechaRetiro?: string
) => {
  const antiguedad = calcularEdad(fechaIngreso, fechaRetiro);

  if (antiguedad < 1) {
    return '0 años';
  }

  if (antiguedad === 1) {
    return '1 año';
  }

  return `${antiguedad} años`;
};

export const validarMenorEdad = (
  fechaNacimiento: string,
  fechaAComparar: string
) => {
  const [yearNac, monthNac, dayNac] = fechaNacimiento.split('-');
  const [yearDil, monthDil, dayDil] = fechaAComparar.split('-');

  const fechaNacimientoInterna = new Date(
    Number(yearNac),
    Number(monthNac) - 1,
    Number(dayNac)
  );
  const fechaACompararInterna = new Date(
    Number(yearDil),
    Number(monthDil) - 1,
    Number(dayDil)
  );

  const milisegundosNacimiento = fechaNacimientoInterna.getTime();
  const milisegundosDiligencia = fechaACompararInterna.getTime();

  const diferenciaMilisegundos = Math.abs(
    milisegundosDiligencia - milisegundosNacimiento
  );

  const dias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

  const edad = Math.floor(dias / 365);

  if (edad >= 16) {
    return fechaNacimiento;
  }

  return '';
};

export const esFechaValida = (fecha: string) => {
  return (
    typeof fecha === 'string' &&
    fecha.length === 10 &&
    !Number.isNaN(Date.parse(fecha))
  );
};

export const obtenerFechaMaxima = (fechaIngreso?: string) => {
  const { date: hoy } = getLocalDate();

  const base = esFechaValida(fechaIngreso ?? '')
    ? new Date(fechaIngreso!)
    : new Date(hoy);
  base.setFullYear(base.getFullYear() - 16);

  return base.toISOString().split('T')[0];
};
