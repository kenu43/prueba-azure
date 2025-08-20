import { create } from 'zustand';

import type {
  SECCIONES_AUTENTICACION,
} from '../constantes/Constantes';

import {
  PASOS_AUTENTICACION,
} from '../constantes/Constantes';

const useAutenticacionStore = create(() => ({ ...PASOS_AUTENTICACION }));

export const actualizarEstado = (
  opcionSelecionada: keyof typeof SECCIONES_AUTENTICACION,
) => {
  useAutenticacionStore.setState({ seleccionada: opcionSelecionada });
};

export function actualizarCodigo(codigo: string[]) {
  useAutenticacionStore.setState({ codigo });
}

export function obtenerCodigo() {
  const { codigo } = useAutenticacionStore.getState();
  return codigo;
}

export default useAutenticacionStore;
