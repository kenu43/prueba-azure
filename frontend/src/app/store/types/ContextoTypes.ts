export type IOpcionesConfig = {
  name: string;
  version: number;
};

export type UsuarioType = {
  uid: string;
  email: string;
  emailVerified: boolean;
  authTime: string;
  expirationTime: string;
  claims: {
    organizacion: string;
    permisos: string;
    grupo: string;
    firma: string;
    name: string;
    rol: string;
    auth_provider: string;
    auth_second_factor: string;
  };
};

export type ConfigType = {
  usuario: UsuarioType;
  year: number;
  appCheckToken: string;
  token: string;
  mfa: boolean;
  external: boolean;
  iam: IIAM;
};
