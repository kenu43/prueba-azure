export interface IBLState {
  configuraciones: Record<string, string>;
  temas: Record<string, string>;
  verModulo: boolean;
  verOtrosModulos: boolean;
  abrirModulos: (ver: boolean) => void;
  abrirOtrosModulos: (ver: boolean) => void;
}

export interface IConfiguraciones {
  [key: string]: {
    icono: string;
    nombre: string;
    url: string;
    desplegar?: boolean;
    mostrarUrl?: boolean;
  };
}
