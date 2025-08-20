export interface localStateBrowserVars {
  [propertyName: string]: string;
}

export interface iamType {
  modulos: {
    [mod: number]: string;
  };
  acciones: {
    aplicacion: string[];
    infraestructura: string[];
  };
}
