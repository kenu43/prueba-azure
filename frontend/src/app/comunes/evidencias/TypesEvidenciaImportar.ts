export interface ArchivoImportadoEvidencia {
  id: string;
  nombre: string;
  tamannio: number;
  progreso: number;
  estado: string;
  tipo: string;
  blob: File;
  tiempoRestante?: string;
  url?: string;
}

export interface EvidenciaProps {
  titulo: string;
  close: () => void;
  rutaStorage: string;
  archivosCargados: (resultado: { nombre: string; url: string }[]) => void;
  archivosGuardados?: Partial<ArchivoImportadoEvidencia | null>[];
}
