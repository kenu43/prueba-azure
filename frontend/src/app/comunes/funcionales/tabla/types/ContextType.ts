import React from 'react';

type DataFetchingType = Record<
  string,
  string | number | boolean | null | undefined
>[];

export interface ColumnsType {
  numColumns: string;
}

export interface StyleColumnType {
  aligment?: 'flex-start' | 'flex-end' | 'center';
  columnWidth?: number;
}

export interface ConfigDataType {
  /** Es un objeto con los parámetros para la implementación de la tabla */
  tableData: DataFetchingType;
  /**
   * Recibe un arreglo de objetos, debe tener la cantidad de columnas que desea renderizar
   * @property Key: Es la llave necesaria para renderizar los datos en la tabla, debe coincidir con las llaves de los datos asignados
   * @property Label: Es la etiqueta que se mostrará en los encabezados de la tabla, se ajustará como nombre propio por defecto
   */
  tableColumns: Array<{
    key: string;
    label: string;
    styleConfig?: StyleColumnType;
  }>;
  /** Es un objeto con las configuraciones adicionales para la tabla, por ejemplo, centrar alguna columnas */
  Tableconfig?: { columnWidth?: string };
  /** Es un objeto con los parámetros de la paginación y la cantidad de datos a renderizar en la tabla */
  pagination?: {
    first: number;
    last: number;
    actual: number;
  };
}

export interface PaginationPayloadType {
  first: number;
  last: number;
  actual: number;
}

export interface Actions {
  configurations: (state: StateType, payload: ConfigDataType) => ConfigDataType;
  reboot: () => ConfigDataType;
  pagination: (state: StateType, payload: PaginationPayloadType) => StateType;
}

export interface ActionTypePayload {
  type: keyof Actions;
  payload: ConfigDataType | PaginationPayloadType;
}

export type StateType = ConfigDataType | never;
export type ActionType = ActionTypePayload;

export interface ContextType {
  state?: StateType;
  dispatch?: React.Dispatch<ActionTypePayload>;
}

export interface ProviderType {
  children: React.ReactNode;
}
