export const FILTROS_TRABAJADORES = {
  idEmpresa: '',
  cedula: '',
  cedulaAplicado: '',
  activo: true,
  activoAplicado: true,
  nombre: '',
  nombreAplicado: '',
  fechaIngresoIni: '',
  fechaIngresoIniAplicado: '',
  fechaIngresoFin: '',
  fechaIngresoFinAplicado: '',
  empresa: '',
  empresaAplicada: ''
};

export const TRABAJADORES_INICIAL = {
  cedula: '',
  nombre: '',
  tipoDocumento: '',
  fechaNacimiento: '',
  genero: '',
  correo: '',
  fechaIngresoCargo: '',
  cargo: '',
  tipoCargo: '',
  gerencia: '',
  area: '',
  fechaRetiro: '',
  region: '',
  ciudad: '',
  activo: true,
  empresa: '',
  Idsap: '',
};

export const TIPO_DOCUMENTO = [
  { label: 'Tarjeta de identidad', codigo: 'ti' },
  { label: 'Cédula de ciudadanía', codigo: 'cc' },
  { label: 'Cédula de extranjería', codigo: 'ce' },
  { label: 'Pasaporte', codigo: 'pasaporte' },
];

export const NIVEL_EDUCATIVO = [
  { label: 'Primaria', codigo: 'primaria' },
  { label: 'Secundaria', codigo: 'secundaria' },
  { label: 'Técnica', codigo: 'tecnica' },
  { label: 'Universitaria', codigo: 'universitaria' },
  { label: 'Postgrado', codigo: 'postgrado' },
  { label: 'Maestría', codigo: 'maestria' },
  { label: 'Doctorado', codigo: 'doctorado' },
];

export const ESTADO_CIVIL = [
  { label: 'Soltero', codigo: 'soltero' },
  { label: 'Casado', codigo: 'casado' },
  { label: 'Viudo', codigo: 'viudo' },
  { label: 'Divorciado', codigo: 'divorciado' },
  { label: 'Separado', codigo: 'separado' },
  { label: 'Unión libre', codigo: 'union_libre' },
];

export const TIPO_EMPRESA = ['HITSS COLOMBIA', 'COMCEL S.A.']

export const TIPO_CARGO_FUNCION = [
  'Ingeniero(a)',
  'Consultor(a)',
  'Analista',
  'Arquitecto(a)',
  'Especialista',
];

export const TIPO_CARGO = [
  'Ingeniero(a) de proyectos de infraestructura civil y eléctrica',
  'Ingeniero(a) de mantenimiento de obras civiles estándar',
  'Arquitecto(a)',
  'Técnico(a) de atención y desinstalación de solicitudes HITSS',
  'Técnico(a) de atención y desinstalación de solicitudes UMM',
];

export const TIPO_GERENCIA = [
  'Gerencia de implementación de acceso celular e infraestructura',
  'Gestión de la demanda',
  'Gerencia de gestión digital IT',
  'Gerencia de evolución digital IT',
  'Gerencia de arquitectura IT',
];

export const TIPO_SEDE = [
  'Plaza claro t2',
  'Sede aliado',
  'Plaza claro',
  'Datacenter triara',
  'Ortezal administracion',
  'Sede admon medellin centro',
  'Sede admon pereira la rebeca',
  'Claro 5',
  'Sede administrativa barranquilla',
  'Ccm toberin',
];

export const TIPO_DIRECCION = [
  'Direccion corporativa tecnologia',
  'Unidad mercado corporativo',
  'Direccion corporativa planeacion estrategica y experiencia',
  'Direccion corporativa gestion humana y administrativo',
  'Direccion corporativa juridica y sostenibilidad',
  'Unidad mercado masivo',
  'Direccion gestion de riesgo y control interno',
  'Direccion corporativa producto e innovacion',
  'Direccion corporativa financiera',
  'Direccion corporativa marketing y medios de comunicacion',
];

export const TIPO_AREA = [
  'Dirección de implementación',
  'Gerencia de gestión de la demanda',
  'Dirección de experiencia, soporte y operación IT',
  'Inteligencia comercial',
  'Agilismo y nuevas formas de trabajo',
];

export const TIPO_REGION = [
  'Transversal',
  'Región 2',
  'Región 3',
  'Región 4',
  'Región 5',
  'Región 1',
];

export const TIPO_CIUDAD = [
  'Bogotá, D.C.',
  'Cali',
  'Medellín',
  'Cúcuta',
  'Barranquilla',
];
