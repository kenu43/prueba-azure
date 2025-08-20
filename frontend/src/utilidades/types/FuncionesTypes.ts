type GetLocalDateOuput = {
  fecha: string;
  hora: string;
  year: number;
  mes: string;
  day: number;
  weekDay: string;
  date: Date;
  mesNumber: number;
};

export type GetLocalDateFunc = (
  opciones?: Intl.DateTimeFormatOptions
) => GetLocalDateOuput;

export type GetInfoFechaOuput = {
  date: Date;
  year: number;
  semester: number;
  strSemester: string;
  quarter: number;
  strQuarter: string;
  month: number;
  strMonth: string;
  day: number;
  weekDay: number;
  strDay: string;
};
/**
 * Función para obtener parametro de una decha en string
 * @param fecha Fecha en \<string\> 'yyyy-mm-dd'
 * @returns Diferentes propiedades o parametros de la fecha ingresada
 * - date: Fecha en formato \<Date\> de JavaScript;
 * - year: Año en formato \<number\>;
 * - semester: Número del semestre en formato \<number\> con valores 0 y 1;
 * - strSemester: Nombre del semestre en formato \<string\>;
 * - quarter: Número del trimestre en formato \<number\> con valores del 0 al 3;
 * - strQuarter: Nombre del trimestre en formato \<string\>;
 * - month: Número del mes en formato \<number\> con valores del 0 al 11;
 * - strMonth: Nombre del mes en formato \<string\>;
 * - day: Número del día en el mes en formato \<number\> con valores del 1 al 31;
 * - weekDay: Número del día en la semana en formato \<number\> con valores del 0 al 6, donde 0 corresponde al día domingo;
 * - strDay: Nombre del día en la semana en formato \<string\>;
 */
export type getInfoFechaFunc = (fecha: string) => GetInfoFechaOuput;

export type FiltrosAplicadosType = {
  [key: string]: {
    valor: string | number;
    nombre: string;
  };
};
