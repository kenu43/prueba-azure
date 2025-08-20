import type { EXTENSIONES_GRUPOS } from './ConstantesEvidencia';

export type ArchivoImportadoEvidencia = {
  id: string;
  nombre: string;
  tamannio: number;
  progreso: number;
  estado: string;
  tipo: string;
  blob: File;
  url?: string;
};

export type GrupoPermitido = keyof typeof EXTENSIONES_GRUPOS;

export type EvidenciaProps = {
  titulo: string;
  close: () => void;
  rutaStorage: string;
  extensionesPermitidas?: GrupoPermitido[];
  archivosCargados: (resultado: { nombre: string; url: string }[]) => void;
  archivosGuardados?: Partial<ArchivoImportadoEvidencia | null>[];
  agregarNombreArchivo?: string;
  limiteArchivos?: number;
  confirmacion?:
    | false
    | {
        titulo?: string;
        mensaje: string;
        textoBotonConfirmacion?: string;
      };
};
