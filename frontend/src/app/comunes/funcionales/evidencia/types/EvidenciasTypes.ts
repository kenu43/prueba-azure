import type { AuthClaimsType } from 'autenticacion/hooks/types/AuthTypes';

export type MetaDataType = { name: string; url: string; type: string };
type CallbackOnChange = (e: MetaDataType[]) => void;
export type ObjEvidenciasType = { [campo: string]: MetaDataType[] };

/**
 * @param evidencia Objeto o arreglo de objetos con los metadatos que almacenan la evidencia.
 * @param required Opcional, valida si es obligatorio al menos subir un archivo
 * @param disabled Opcional, deshabiliatar la opcion de subir evidencia, pero permite ver la que este cargada
 * @param usuario Datos de las claims del usuario
 * @param permisos Lista de permisos del usuario en el modulo actual
 * @param verTodo Opcional, presenta para solo lectura, todos los archivos cargado en el arreglo evidencia
 * @param ruta Este parametro recibe la url del bucked que va a guardar
 * @param index Opcional, este parametro recibe numero de indice del arreglo de evidencias que se este trabajando
 * @param {CallbackOnChange} onChange Funcion que retorna los metadatos de la evidencia
 */
export type EvidenciasPropsType = {
  evidencia: ObjEvidenciasType;
  required?: boolean;
  disabled?: boolean;
  usuario: AuthClaimsType;
  permisos: string[];
  verTodo?: boolean;
  campo: string;
  ruta: string;
  index?: number;
  accept?: AcceptFileType;
  name?: string;
  onChange: CallbackOnChange;
};

export type DivEvidenciaProps = {
  required?: boolean;
  evidencia?: number;
};

export type ModalEvidenciasPropsType = {
  close: () => void;
} & EvidenciasPropsType;
type UpdaterChangeFuncProps = {
  file?: File;
  status?: boolean;
};
type AcceptFileType
  = | 'audio/*'
    | 'video/*'
    | 'image/*'
    | '.pdf'
    | '.doc'
    | '.docx'
    | string;
export type FileUploaderPropsType = {
  accept?: AcceptFileType;
  permisos: string[];
  onChange: (e: UpdaterChangeFuncProps) => void;
};

export type IniEvidenciasFuncType = (
  evidencia: ObjEvidenciasType,
  campo: string,
  index?: number,
  verTodo?: boolean
) => MetaDataType[];

export type SubirEvidenciaFuncType = (tipoArchivo: File) => Promise<void>;
export type BajarEvidenciaFuncType = (index: number) => void;
export type BorrarEvidenciaFuncType = (index: number) => void;
export type EvidenciaValueType = {
  name: string;
  url: string;
};
