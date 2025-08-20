const DATOS_USUARIO = {
  uid: '',
  email: '',
  emailVerified: false,
  authTime: '',
  expirationTime: '',
  claims: {
    organizacion: '',
    permisos: '',
    grupo: '',
    firma: '',
    name: '',
    rol: '',
    auth_provider: '',
    auth_second_factor: '',
  },
};

export const APP_CONFIGURACIONES = {
  usuario: DATOS_USUARIO,
  year: Number(localStorage.getItem('year') ?? new Date().getFullYear()),
  appCheckToken: '',
  token: '',
  mfa: false,
  iam: {
    version: '1.2.0',
    modulos: {
      0: {
        descripcion: 'Ninguna',
        titulo: 'Módulo sin datos',
        url: '/',
        subGrupo: 'Submodulo',
        responsable: 'Sin responsable',
        imagen: '',
        estaActivo: true,
        llaveModulo: 'trabajadores' as keyof PropsLazyComponents,
      },
    },
    acciones: {
      aplicacion: [],
      infraestructura: [],
    },
  },
  external: false,
};

export const TYPE_OF_DEVICE = /\b(iPad|iPhone|iPod|Android)\b/;
export const APLICA_MFA = 'sincronizada';
