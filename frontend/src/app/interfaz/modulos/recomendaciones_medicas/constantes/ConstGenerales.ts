export const STORE_TRABAJADORES = {
  id: '',
  nombre: '',
};

export const TIPO_RECOMENDACIONES = ['Reportar la emisión de recomendaciones médico - laborales', 'Reportar una discapacidad certificada', 'Reportar una enfermedad grave o catastrófica', 'Reportar una enfermedad laboral, calificada mediante dictamen', 'Reportar una notificación de concepto de rehabilitación', 'Reportar una notificación de pérdida de capacidad laboral'];

export const TRABAJADOR = {
  id: '',
  cedula: '',
  nombre: '',
  genero: '',
  fechaNacimiento: '',
  historiaOcupacional: {
    fechaIngresoCargo: '',
    cargo: '',
    area: '',
    horarioLaboral: '',
    rotacionesLaborales: '',
    tipoCargo: '',
  },
};

export type EvidenciaArchivo = {
  nombre: string;
  url: string;
};
export type InformacionBase = {
  fechaDiligenciamiento: string;
  asisteSede: string;
  motivoDeNoAsistencia: string;
  proyectoAsignado: string;
  infoActualizadaSuccessFactors: string;
  correoCorporativoActivo: string;
};

export type EmisionMedicaLaboral = {
  entidadRecomendacion: string;
  nombreMedicoEmisor: string;
  fechaInicioRecomendacion: string;
  duracionMeses: number;
  deseaAgregarOtraRecomendacion: string;
  archivos: EvidenciaArchivo[];
};

export type DiscapacidadCertificada = {
  fechaEmision: string;
  entidadEmiteCalificacion: string;
  porcentajePCL: number;
};

export type EnfermedadGrave = {
  diagnosticoReportar: string;
  fechaDiagnostico: string;
  ultimoControlMedico: string;
  proximoControlMedico: string;
  tratamientoActual: string;
  deseaAgregarOtroDiagnostico: string;
  archivos: EvidenciaArchivo[];
};

export type EnfermedadLaboral = {
  diagnosticoLaboral: string;
  diagnosticoReportarCIE10: string;
  fechaCalificacion: string;
  deseaAgregarOtroDiagnostico: string;
  archivos: EvidenciaArchivo[];
};

export type ConceptoRehabilitacion = {
  fechaEmisionRehabilitacion: string;
  entidadEmiteConcepto: string;
  conceptoRehabilitacion: string;
  archivos: EvidenciaArchivo[];
};

export type PerdidaCapacidadLaboral = {
  fechaEmision: string;
  entidadEmiteCertificacion: string;
  porcentajePCL: number;
};

export type RecomendacionesMedicas = {
  informacionBase: InformacionBase;
  emisionMedicaLaboral: EmisionMedicaLaboral[];
  discapacidadCertificada: DiscapacidadCertificada;
  enfermedadGrave: EnfermedadGrave[];
  enfermedadLaboral: EnfermedadLaboral[];
  conceptoRehabilitacion: ConceptoRehabilitacion;
  perdidaCapacidadLaboral: PerdidaCapacidadLaboral;
};

export type MultiplesRecomendaciones = {
  emisionMedicaLaboral: EmisionMedicaLaboral[];
  enfermedadGrave: EnfermedadGrave[];
  enfermedadLaboral: EnfermedadLaboral[];
};

export const STORE_RECOMENDACIONES: RecomendacionesMedicas = {
  informacionBase: {
    fechaDiligenciamiento: new Date().toISOString().split('T')[0],
    asisteSede: '',
    motivoDeNoAsistencia: '',
    proyectoAsignado: '',
    infoActualizadaSuccessFactors: '',
    correoCorporativoActivo: '',
  },
  emisionMedicaLaboral: [{
    entidadRecomendacion: '',
    nombreMedicoEmisor: '',
    fechaInicioRecomendacion: '',
    duracionMeses: 0,
    deseaAgregarOtraRecomendacion: '',
    archivos: [],
  }],
  discapacidadCertificada: {
    fechaEmision: '',
    entidadEmiteCalificacion: '',
    porcentajePCL: 0,
  },
  enfermedadGrave: [{

    diagnosticoReportar: '',
    fechaDiagnostico: '',
    ultimoControlMedico: '',
    proximoControlMedico: '',
    tratamientoActual: '',
    deseaAgregarOtroDiagnostico: '',
    archivos: [],
  }],

  enfermedadLaboral: [{
    diagnosticoLaboral: '',
    diagnosticoReportarCIE10: '',
    fechaCalificacion: '',
    deseaAgregarOtroDiagnostico: '',
    archivos: [],
  }],
  conceptoRehabilitacion: {
    fechaEmisionRehabilitacion: '',
    entidadEmiteConcepto: '',
    conceptoRehabilitacion: '',
    archivos: [],
  },
  perdidaCapacidadLaboral: {
    fechaEmision: '',
    entidadEmiteCertificacion: '',
    porcentajePCL: 0,
  },
};

export const PROYECTOS_RECOMENDACIONES = [
  'Ninguno',
  'Flujo valor canales asistidos',
  'Back office cav',
  'Home pass',
  'Consultor barra',
  'Flujo de valor digital',
  'Gestor Soc',
  'Salesforce',
  'CAV',
  'Soporte Herramientas de la operación',
  'SSTA',
];

export const ENTIDADES_RECOMENDACIONES = [
  'EPS (Entidad Promotora de Salud)',
  'ARL (Administradora de Riesgos Laborales)',
  'Prestador de servicios de medicina laboral contratada por Claro (Colmédicos)',
  'Medicina prepagada',
];

export const OPCIONES_RECHAZO = [
  { label: 'Cierre de registros muy antiguos', value: 'op1' },
  { label: 'Cierre de registros cuando el colaborador está en incapacidad', value: 'op2' },
  { label: 'Reporte de recomendaciones de trabajo en casa por pocos días', value: 'op3' },
  { label: 'Certificado de Colmédicos sin recomendaciones', value: 'op4' },
  { label: 'Caso aplica', value: 'op5' },
  { label: 'No se evidencian recomendaciones médicas', value: 'op6' },
  { label: 'Reporte de enfermedad catastrófica', value: 'op7' },
  { label: 'Reporte de enfermedad catastrófica que no aplica', value: 'op8' },
  { label: 'Recomendaciones médicas aplicables', value: 'op9' },
  { label: 'Cierre de registro porque lleva más de tres meses y no se logra coordinar cita con Colmédicos', value: 'op10' },
  { label: 'Reporte de recomendaciones que se encuentra dentro de la historia clínica o resumen de la historia clínica', value: 'op11' },
  { label: 'Documento aportado por el colaborador es un recorte y no registra información del paciente ni del centro médico que genera las recomendaciones', value: 'op12' },
  { label: 'Reporte de recomendaciones que ya se habían socializadas y están vigentes', value: 'op13' },
  { label: 'Reporte de aislamiento por COVID', value: 'op14' },
  { label: 'Reporte de incapacidad', value: 'op15' },
  { label: 'Rechazo porque los documentos adjuntos no aplican', value: 'op16' },
  { label: 'Reporte de recomendaciones de años anteriores', value: 'op17' },
  { label: 'Caso particular', value: 'op18' },
  { label: 'Cuando un colaborador registra acta de socialización de recomendaciones y están vigentes', value: 'op19' },
  { label: 'Registro de historia clínica de Colmédicos', value: 'op20' },
  { label: 'Registro de certificado de discapacidad emitido por el Ministerio de Salud y Protección Social', value: 'op21' },
  { label: 'Registro de remisión a EPS para calificación de origen', value: 'op22' },
  { label: 'Registro de recomendaciones de asma, rinitis u otras patologías respiratorias por arreglos en las sedes de trabajo, las cuales ya finalizaron o se están haciendo en jornada contraria y por ende no afectan su salud', value: 'op23' },
  { label: 'Reporte de recomendaciones por correo', value: 'op24' },
];
