import type { JSX } from 'react';

export type FuncionesBotonesProps = {
  close: () => void;
  apply: () => void;
  delete: () => void;
};
export type FuncionesBotones = {
  dates: () => void;
  next: () => void;
  before: () => void;
} & FuncionesBotonesProps;

export type IconoFiltrosTypes = Record<keyof FuncionesBotones, JSX.Element[]>;
export type AnimacionBotonTypes = Record<keyof FuncionesBotones, string>;

export type ModalButtonsFilterProps = {
  functions: FuncionesBotonesProps;
};
export type ModalFilterProps = {
  children: React.ReactNode | React.ReactNode[];
  functions: FuncionesBotonesProps;
  nota?: string;
  pageDates?: number;
} & ModalButtonsFilterProps;

// estilos
export type butonsTypes = {
  func: keyof FuncionesBotones;
  readonly disabled?: boolean;
};

// contexto
export type InitialStateType = {
  pageFecha: number;
  pagina: number;
  nPages: number;
};
export type ActionType = {
  type: string;
  payload: any;
  name: string;
};

export type StateType = InitialStateType;
export type DispatchType = React.Dispatch<any>;

export type ContextParamType = [state: InitialStateType, dispatch: React.Dispatch<ActionType>];

export type ProviderType = {
  children: React.ReactNode;
};
