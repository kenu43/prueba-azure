import { ConfigType } from 'app/store/types/ContextoTypes';

export type TModKey = keyof IIAM['modulos'];

export interface IObjetoPermiso {
  [key: string]: string[];
}

export type IArbolPermiso = (
  usuario: ConfigType['usuario'],
  iam: IIAM
) => IObjetoPermiso[];
