export type FormatType = {
  login: React.JSX.Element;
  restaurar: React.JSX.Element;
};

export type KeyFormat = keyof FormatType;

export type TokenType = {
  tipo: string;
  regional: string[];
  centro: string[];
  grupo: string;
  rol: string;
  organizacion: string;
  permisos: string;
};

export type QRType = {
  generarURIOTP: string;
};
