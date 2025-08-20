type Ifila = {
  categoria: string;
  datos: number[];
};

type IfilaLetra = {
  categoria: string;
  datos: string[];
};

export type ITablaProps = {
  titulo?: string;
  encabezados: string[];
  contenido: Ifila[];
  mostrarTotal?: boolean;
  style?: React.CSSProperties;
};

export type ITablaLetraProps = {
  titulo: string;
  encabezados: string[];
  contenido: IfilaLetra[];
};

export type IdatosProps = {
  contenido: Ifila[];
};
