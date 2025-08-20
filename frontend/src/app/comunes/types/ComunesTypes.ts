export type Colores = {
  primario: string;
  secundario: string;
  advertencia: string;
  error: string;
  informacion: string;
  exitoso: string;
  desactivado: string;
};

export type PropsAvisos = {
  fontColor?: keyof Colores;
};

export type ToastType = {
  advertencia: string;
  error: string;
  informacion: string;
  exitoso: string;
  notificacion: string;
};

export type TipoToast = keyof ToastType;

export type TipoAviso = 'advertencia' | 'eliminar' | 'exito';

export type PropsModalAviso = {
  abrir: boolean;
  tipo?: TipoAviso;
  titulo?: string;
  mensaje?: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
  colorBotonConfirmar?: string;
};
