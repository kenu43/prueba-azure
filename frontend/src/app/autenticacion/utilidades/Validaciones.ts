import { toast } from 'sonner';
import tiposErrores from 'comunes/recursos/Errores.json';

import { obtenerCodigo } from '../store/AutenticacionStore';

const mensajeDefecto =
  'Se produjo un error inesperado, comuníquese con el administrador';

export function validarEmail(correo: string) {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (regex.test(correo)) {
    return true;
  }

  return false;
}

export const validarErrores = (codigo: string) => {
  const mensajeDeError = tiposErrores.find((err) => err.codigo === codigo);
  toast.error(mensajeDeError?.mensaje ?? mensajeDefecto);
};

/**
 * Valida si una plataforma coincide con una plataforma a validar y retorna una clase CSS basada en la coincidencia.
 *
 * @param {string} plataforma - La plataforma actual a verificar.
 * @param {string} aValidar - La plataforma contra la cual se va a comparar.
 * @returns {string} - Retorna la clase de CSS 'botones_acceso_seleccionda' si las plataformas coinciden, o 'botones_acceso' si no coinciden.
 *
 * @example
 * validarPlataforma('ssc', 'ssc'); // Retorna 'botones_acceso_seleccionda'
 */
export const validarPlataforma = (
  plataforma: string,
  aValidar: string
): string => {
  if (plataforma === aValidar) {
    return 'botones_acceso_seleccionda';
  }

  return 'botones_acceso';
};

export function validarCodigo() {
  const codigo = obtenerCodigo();
  if (codigo.length !== 6) return { esValido: false, codigo: '' };
  return { esValido: true, codigo };
}
