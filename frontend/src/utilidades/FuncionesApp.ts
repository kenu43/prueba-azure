import type { ListadosType } from 'hooks/types/HookTypes';

import { capitalizarPrimeraLetra } from 'app/interfaz/barra-lateral/secciones/perfil/funciones/FunPerfil';

import type { FiltrosAplicadosType } from './types/FuncionesTypes';

export const adaptarListado = (listado: ListadoType) => {
  if (!listado) {
    return [{ id: '', value: '' }];
  }

  return Object.values(listado);
};

export const filtrarLista = <
  T extends Record<string, Record<keyof T[string], string>>
>(
  listado: T,
  variable: string,
  tipoVariable: keyof T[string],
  tipoVariableConsulta: keyof T[string]
) => {
  const resultado = Object.values(listado)?.find(
    (item) => item[tipoVariable] === variable
  );
  if (!resultado) return [];

  return resultado[tipoVariableConsulta];
};

/**
 *
 * @param listado Objeto completo del listado de la aplicación que se encuentra guardado en el realtime
 * @param tipoVariable Nombre de la variable por la cual se quiere buscar el listado completo
 * @returns
 */
export const filtrarCodigoLista = <
  T extends Record<string, Record<keyof T[string], string>>
>(
  listado: T,
  tipoVariable: keyof T[string]
) => {
  return Object.values(listado)?.map((item) => item?.[tipoVariable]);
};

/**
 *
 * @param listado Es el listado completo que viene del Hook useListados
 * @param nombreLista Es el nombre del tipo de lista para la cual desea extraer los valores
 * @param campoABuscar Es el nombre de la llave del objeto del listado específico para la cual desea extraer los valores
 * @returns Un arreglo de string o number que necesita el control
 */
export const extraerValoresDeListado = (
  listado: ListadosType['listas'],
  nombreLista: keyof ListadosType['listas'],
  campoABuscar: string
): (string | number)[] => {
  return Object.values(listado[nombreLista])?.map(
    (item) => item?.[campoABuscar]
  );
};

export const groupByCategory = (array: any[], categoria: string) => {
  console.log(array);
  Object.values(array)?.reduce((x: any, y: any) => {
    (x[y?.[categoria]] = x[y?.[categoria]] || [])?.push(y);

    return x;
  }, {});
};

export const validarCodigo = (
  lista: ListadoType,
  variable: boolean | string | number,
  tipoCodigo: string,
  campoBuscar: string
) => {
  const validar = Object.values(lista)?.find(
    (campo) => campo?.[tipoCodigo] === variable
  );

  return validar ? validar?.[campoBuscar] : '';
};

/**
 *
 * @param listado Listado proveniente del Hook useListados
 * @param nombreLista Nombre de la lista particular que desea extraer los datos
 * @param campoABuscar Campo a buscar en el objeto de la lista que se extrajo
 * @param palabraABuscar Valor de retorno del control a buscar dentro del listado
 * @param campoADevolver Nombre del campo a devolver en su contenido para ser guardado
 * @returns Devuelve el valor del listado encontrado con los parámetros anteriores
 */
export const buscarCodigoDeLista = (
  listado: ListadosType['listas'],
  nombreLista: keyof ListadosType['listas'],
  campoABuscar: string,
  palabraABuscar: string,
  campoADevolver: string
) => {
  const validar = Object.values(listado[nombreLista])?.find(
    (campo) => campo?.[campoABuscar] === palabraABuscar
  );

  return validar ? validar?.[campoADevolver] : '';
};

export const filtrosInfo = (filtro: string | number, nombre: string) => {
  return { valor: filtro, nombre };
};

export const filtrosAplicados = (filtros: FiltrosAplicadosType) => {
  const filtrosValidos = Object.values(filtros).filter(
    ({ valor }) => valor ?? ''
  );

  if (filtrosValidos.length === 0) return;

  const nombresFiltros = filtrosValidos.map(({ nombre }) => nombre).join(', ');

  const frase =
    filtrosValidos.length > 1
      ? `Filtros aplicados por la variables: ${capitalizarPrimeraLetra(
          nombresFiltros
        )}`
      : `Filtro aplicado por la variable: ${capitalizarPrimeraLetra(
          nombresFiltros
        )}`;

  return frase;
};
