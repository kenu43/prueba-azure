import { getInfoFecha } from 'utilidades/FuncionesGenerales';

import type { ClasificacionType, RegistroType } from '../types/Types';

import { ESTADO } from '../constantes/ConstGenerales';

export const obtenerValue = (valor: string, constante: ClasificacionType[]) =>
  constante.find((item) => item.codigo === valor)?.nombre ?? valor;

export const validarDatosTabla = (datosQuery: RegistroType[]) => {
  return datosQuery?.map(
    ({ trabajador, infoEntrega, elementosSeleccionados }) => ({
      estado: obtenerValue(infoEntrega.estado, ESTADO) || infoEntrega.estado,
      nombre: trabajador.nombre,
      region: trabajador.region,
      ciudad: trabajador.ciudad,
      cedula: trabajador.cedula,
      fechaSolicitud: infoEntrega.fechaSolicitud,
      trabajador,
      infoEntrega,
      elementosSeleccionados,
    })
  );
};

export const compararFecha = (fecha: string, fechaBase: string) => {
  if (!fecha) return false;
  const { date } = getInfoFecha(fechaBase!);

  const fechaLimite = new Date(date);

  const fechaComparar = new Date(fecha);
  return fechaComparar < fechaLimite;
};

export function revisarEvidencia(
  evidencias: { url: string; nombre: string }[]
) {
  const evidenciasDepuradas = evidencias.map((evidencia) => {
    if (!evidencia.url) {
      return null;
    }
    return evidencia;
  });

  return evidenciasDepuradas.filter((evidencia) => evidencia !== null);
}
