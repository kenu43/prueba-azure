export type AuthClaimsType = {
  claims: {
    tipo: string;
    gerencia: string[];
    regional: string[];
    centro: string[];
    grupo: string;
    rol: string;
    name: string;
    organizacion: string;
    permisos: string;
  };
  token: string;
};
