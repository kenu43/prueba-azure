import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { ConfigType } from './types/ContextoTypes';

import { APLICA_MFA, APP_CONFIGURACIONES } from './constantes/Configuraciones';

export const useUserStore = create(
  devtools<ConfigType>(
    () => ({
      ...APP_CONFIGURACIONES,
    }),
    { name: 'useUserStore', enabled: import.meta.env.DEV },
  ),
);

export function guardarToken(token: string) {
  useUserStore.setState({ token });
}

export function guardarUsuario(usuario: ConfigType['usuario'], token: string) {
  const segundoFactor = usuario?.claims?.auth_second_factor === APLICA_MFA;

  useUserStore.setState({
    usuario: { ...usuario },
    token,
    mfa: segundoFactor,
  });
}

export function cambiarYear(year: number) {
  useUserStore.setState({ year });
}

export function cerrarSesion() {
  useUserStore.setState({ ...APP_CONFIGURACIONES });
}

export function actualizarToken(token: string) {
  useUserStore.setState({ token });
}

export function removerAccesos() {
  localStorage.removeItem('MFA');
  useUserStore.setState({
    usuario: undefined,
    token: '',
    mfa: false,
  });
}
