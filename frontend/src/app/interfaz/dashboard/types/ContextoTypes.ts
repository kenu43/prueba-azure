export enum PrincipalCases {
  GENERAL = 'GENERAL',
  CAMBIAR_ANNIO = 'CAMBIAR_ANNIO',
}

export interface IPrincipalState {
  year: number;
  contratistaId: string;
  ordenTrabajoId: string;
}
