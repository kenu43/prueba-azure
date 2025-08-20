import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import { toast } from 'sonner';

import type {
  ArchivoImportadoEvidencia,
  GrupoPermitido,
} from './TypesEvidenciaImportar';

import { EXTENSIONES_GRUPOS, TIPO_ARCHIVO } from './ConstantesEvidencia';

const storage = getStorage();

const actualizarProgreso = (
  setArchivos: React.Dispatch<
    React.SetStateAction<ArchivoImportadoEvidencia[]>
  >,
  archivoId: string,
  progreso: number
) =>
  setArchivos((prev) =>
    prev.map((archivo) =>
      archivo.id === archivoId ? { ...archivo, progreso } : archivo
    )
  );

/**
 * Sube múltiples archivos a Firebase Storage usando referencias directas.
 * @param archivos - Lista de archivos a subir, representados como objetos de tipo ArchivoImportadoEvidencia.
 * @param setArchivos - Función para actualizar el estado de los archivos en el componente React.
 */
/**
 * Inicia la carga de los archivos al storage de Firebase.
 * Retorna una Promesa que resuelve a un arreglo con { name, url } de cada archivo.
 */
export const iniciarCargaConReferencias = async (
  archivos: ArchivoImportadoEvidencia[],
  rutaStorage: string,
  setArchivos: React.Dispatch<React.SetStateAction<ArchivoImportadoEvidencia[]>>
): Promise<{ nombre: string; url: string }[]> => {
  const archivosEliminados = archivos.filter(
    (a) => a.estado === 'eliminado' && a.url && a.url.includes('/')
  );
  await Promise.all(
    archivosEliminados.map(async ({ url }) => {
      const fileRef = ref(storage, url!);
      await deleteObject(fileRef);
    })
  );

  const archivosASubir = archivos.filter(
    (archivo) => archivo.estado !== 'eliminado'
  );

  const promesasSubida = archivosASubir.map((archivo) => {
    return new Promise<{ nombre: string; url: string }>((resolve, reject) => {
      setArchivos((prev) =>
        prev.map((archivoPorCargar) =>
          archivoPorCargar.id === archivo.id
            ? { ...archivoPorCargar, estado: 'subiendo', progreso: 0 }
            : archivoPorCargar
        )
      );

      const archivoRef = ref(storage, `${rutaStorage}/${archivo.nombre}`);
      const uploadTask = uploadBytesResumable(archivoRef, archivo.blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progreso = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          actualizarProgreso(setArchivos, archivo.id, progreso);
        },

        (error) => {
          setArchivos((prev) =>
            prev.map((archivoPorCargar) =>
              archivoPorCargar.id === archivo.id
                ? { ...archivoPorCargar, estado: 'fallido' }
                : archivoPorCargar
            )
          );
          toast.error(`Error al subir el archivo ${archivo.nombre}`);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              setArchivos((prevArchivos) =>
                prevArchivos.map((archivoExterno) =>
                  archivoExterno.id === archivo.id
                    ? {
                        ...archivoExterno,
                        estado: 'cargado',
                        progreso: 100,
                      }
                    : archivoExterno
                )
              );
              resolve({ nombre: archivo?.nombre ?? '', url });
            })
            .catch((err) => reject(err));
        }
      );
    });
  });

  return Promise.all(promesasSubida);
};

export const HallarTipoArchivo = (archivo: File): string => {
  const extension = archivo.name.toLowerCase().split('.').pop() || '';

  const coincidenciaExtension = TIPO_ARCHIVO.find(
    (extensionArchivo) => extensionArchivo.ext === extension
  );
  if (coincidenciaExtension) return coincidenciaExtension.type;

  return 'otro';
};

/**
 * Maneja los archivos soltados en la zona de arrastre.
 * @param evento - Evento de arrastre.
 * @returns Un array de objetos `Archivo`.
 */
export const manejarArchivosSoltados = (
  evento: React.DragEvent<HTMLDivElement>,
  agregarNombreArchivo = '',
  extensionesPermitidas: string[] = [],
  limite = Infinity,
  archivosActuales = 0
): ArchivoImportadoEvidencia[] => {
  const files = Array.from(evento.dataTransfer.files ?? []);
  const sobrantes = limite - archivosActuales;
  let errorMostrado = false;

  if (files.length > sobrantes) {
    toast.warning(`Solo puedes subir ${limite} archivo(s)`);
  }

  const rechazarArchivo = (mensaje: string) => {
    if (!errorMostrado) {
      toast.error(mensaje);
      errorMostrado = true;
    }
    return [];
  };

  return files.slice(0, sobrantes).flatMap((file) => {
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';

    if (
      extensionesPermitidas.length &&
      !extensionesPermitidas.includes(extension)
    ) {
      return rechazarArchivo(
        `Solo se aceptan archivos de tipo: ${extensionesPermitidas.join(', ')}`
      );
    }

    if (extension === 'exe') {
      return rechazarArchivo(
        `Los archivos ejecutables (.exe) no están permitidos.`
      );
    }

    const tamanioEnMB = file.size / (1024 * 1024);
    if (tamanioEnMB > 1) {
      return rechazarArchivo(`El tamaño máximo permitido es de 1 MB.`);
    }

    const [base, ext] = file.name.split(/\.(?=[^.]+$)/);
    const nombreFinal = `${base}${
      agregarNombreArchivo ? `_${agregarNombreArchivo}` : ''
    }.${ext}`;

    return [
      {
        id: nanoid(),
        nombre: nombreFinal,
        tamannio: +tamanioEnMB.toFixed(2),
        progreso: 0,
        estado: 'nuevo',
        tipo: HallarTipoArchivo(file),
        blob: file,
      } as ArchivoImportadoEvidencia,
    ];
  });
};

export function AsignarNombreTipo(name: string): string {
  const extension = name.toLowerCase().split('.').pop() || '';
  const coincidenciaExtension = TIPO_ARCHIVO.find(
    (extensionArchivo) => extensionArchivo.ext === extension
  );
  return coincidenciaExtension ? coincidenciaExtension.type : 'otro';
}

/**
 * Elimina un archivo de Firebase Storage y lo remueve del estado local con animación.
 * @param id - ID único del archivo en tu sistema (ej. para identificarlo en el DOM).
 * @param pathArchivo - Ruta (en Firebase Storage) del archivo a eliminar, ej. "evidencias/mi-archivo.pdf".
 * @param setArchivos - Función para actualizar el estado de los archivos en tu componente.
 */
export const eliminarArchivoConAnimacion = async (
  id: string,
  setArchivos: React.Dispatch<React.SetStateAction<ArchivoImportadoEvidencia[]>>
) => {
  setArchivos((prev) =>
    prev.map((archivo) => {
      if (archivo.id === id) {
        return { ...archivo, estado: 'eliminado' };
      }
      return archivo;
    })
  );
};

/**
 * Hook personalizado que retorna un array con las extensiones de archivo permitidas.
 *
 * @param listaDeExtensiones - Array de grupos de tipos de archivo permitidos. Por defecto es un array vacío.
 * @returns Un array de strings con las extensiones de archivo permitidas sin duplicados.
 *
 * @example
 * // Obtener extensiones para imágenes y documentos
 * const extensionesPermitidas = useExtensionesArchivo(['IMAGENES', 'DOCUMENTOS']);
 */
export const extensionesArchivo = (
  listaDeExtensiones: GrupoPermitido[] = []
): string[] => {
  return [
    ...new Set(
      listaDeExtensiones.flatMap((grupo) => EXTENSIONES_GRUPOS[grupo])
    ),
  ];
};
