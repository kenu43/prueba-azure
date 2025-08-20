import React from 'react';
import { ClaimsType } from 'configuraciones/types/SeguridadTypes';

type PropsLazyComponents = {
  planes: React.LazyExoticComponent<() => React.ReactElement>;
};

export type keyList = 'modulosPrincipal';
export type keyComp = keyof PropsLazyComponents;

export interface ModulosParams {
  descripcion: string;
  titulo: string;
  url: string;
  subGrupo: string;
  responsable: string;
  imagen: string;
  estaActivo: boolean;
  llaveModulo: keyComp;
}

export interface MainPropsTypes {
  hayListas: boolean;
}

export interface DashboardClaims {
  usuario: ClaimsType;
}

export interface ProtectedProps {
  modulo: keyComp;
}

export type CardType = {
  time: number;
};

export interface ModulosType {
  descripcion: string;
  titulo: string;
  url: string;
  subGrupo: string;
  responsable: string;
  imagen: string;
  estaActivo: boolean;
  llaveModulo: keyComp;
}

export interface configType {
  getConfiguraciones: {
    version: string;
    acciones: {
      aplicacion: string[];
      infraestructura: string[];
    };
    modulos: ModulosType[];
  };
}
