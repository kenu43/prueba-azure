import { getFunctions, httpsCallable } from 'firebase/functions';

import { SERVICIO } from './Constantes';

type ServicioType = keyof typeof SERVICIO;

/**
 *
 * @param servicio Nombre del servicio que se quiere llamar en GCP
 * @param variables Argumentos del microservicio este debe tener la estructura { data: ... }
 * @description Es una función que ejecuta un microservcio en GCP como parte extensiva de la solución que se está desarrollando
 */
const correrMicroservicio = async <T>(servicio: ServicioType, info: T) => {
  const functions = getFunctions();
  const promesa = httpsCallable<T, string>(functions, SERVICIO[servicio]);

  try {
    const res = await promesa(info);
    return res.data;
  } catch {
    return 'Ha ocurrido un error en el microservicio';
  }
};

export default correrMicroservicio;
