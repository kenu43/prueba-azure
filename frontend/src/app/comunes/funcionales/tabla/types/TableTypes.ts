import React from 'react';
import { ApolloError } from '@apollo/client';

import { ConfigDataType } from './ContextType';

export type ControlsType = Array<{
  tooltipo?: string;
  icon: React.ReactNode;
  event: (e: unknown) => void;
  columnName?: string;
  style?: React.CSSProperties;
  isvisible?: boolean;
}>;

export interface TableConfigType {
  configurations: ConfigDataType;
  controls: ControlsType;
  loading: boolean;
  error: ApolloError | undefined;
}

/**
 * @author Soluciones en epidemiología y salud ocupacional pc <nicolai.martin@pcsoluciones.com.co>
 *
 * @interface TableDataProps
 * @param Config es la configuración de los parámetros de la tabla, por ejemplo los encabezados.
 * @param Controls usados para generar la interacción con los registros de la tabla .
 */
export interface TableDataProps {
  /** Es un objeto con los parámetros para la implementación de la tabla, por ejemplo los datos de una petición */
  config: ConfigDataType;
  /** Recibe un arreglo de botones que controlan cada fila de la tabla, los eventos son externos a la implementación */
  controls: ControlsType;
}
