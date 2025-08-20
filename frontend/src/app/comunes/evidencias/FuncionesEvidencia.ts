import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { ArchivoImportadoEvidencia } from './TypesEvidenciaImportar';
import { TIPO_ARCHIVO } from './ConstantesEvidencia';

const storage = getStorage();

/**
 * Sube múltiples archivos a Firebase Storage usando referencias directas.
 * @param archivos - Lista de archivos a subir, representados como objetos de tipo ArchivoImportadoEvidencia.
 * @param setArchivos - Función para actualizar el estado de los archivos en el componente React.
 */
/**
 * Inicia la carga de los archivos al storage de Firebase.
 * Retorna una Promesa que resuelve a un arreglo con { nombre, url } de cada archivo.
 */
export const iniciarCargaConReferencias = (
  archivos: ArchivoImportadoEvidencia[],
  rutaStorage: string,
  setArchivos: React.Dispatch<React.SetStateAction<ArchivoImportadoEvidencia[]>>
): Promise<{ nombre: string; url: string }[]> => {
  // Usaremos un array de promesas para saber cuándo termine cada archivo.

  const archivosEliminados = archivos.filter(
    (archivo) => archivo.estado === 'eliminado'
  );
  archivosEliminados.map(async (archivo) => {
    const storage = getStorage(); // Asegúrate que ya hayas inicializado la app de Firebase
    if (archivo.url !== '') {
      const fileRef = ref(storage, archivo.url);
      await deleteObject(fileRef);
    }
  });
  const archivosASubir = archivos.filter(
    (archivo) => archivo.estado !== 'eliminado'
  );

  const promesasSubida = archivosASubir.map((archivo) => {
    return new Promise<{ nombre: string; url: string }>((resolve, reject) => {
      const archivoRef = ref(storage, `${rutaStorage}/${archivo.nombre}`);
      const uploadTask = uploadBytesResumable(archivoRef, archivo.blob);

      const startTime = Date.now();

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Actualiza el progreso en el estado local
          const progreso = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          const elapsedTime = (Date.now() - startTime) / 1000;
          const velocidad = snapshot.bytesTransferred / elapsedTime;
          const bytesRestantes =
            snapshot.totalBytes - snapshot.bytesTransferred;
          const tiempoRestanteSegundos = bytesRestantes / velocidad;

          const minutos = Math.floor(tiempoRestanteSegundos / 60);
          const segundos = Math.floor(tiempoRestanteSegundos % 60);
          const tiempoRestante =
            minutos > 0 ? `${minutos}m ${segundos}s` : `${segundos}s`;

          setArchivos((prevArchivos) =>
            prevArchivos.map((a) =>
              a.id === archivo.id ? { ...a, progreso, tiempoRestante } : a
            )
          );
        },
        (error) => {
          toast.error(`Error al subir el archivo ${archivo.nombre}`);
          reject(error);
        },
        () => {
          // Obtenemos la URL de descarga al completar la subida
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              // Actualizamos estado local a "cargado"
              setArchivos((prevArchivos) =>
                prevArchivos.map((a) =>
                  a.id === archivo.id
                    ? {
                        ...a,
                        estado: 'cargado',
                        progreso: 100,
                        tiempoRestante: undefined,
                      }
                    : a
                )
              );
              // Resolvemos la promesa con { nombre, url }
              resolve({ nombre: archivo?.nombre ?? '', url });
            })
            .catch((err) => reject(err));
        }
      );
    });
  });

  // Retornamos la promesa que se resuelve cuando se suban todos los archivos
  return Promise.all(promesasSubida);
};
/**
 * Maneja los archivos soltados en la zona de arrastre.
 * @param evento - Evento de arrastre.
 * @returns Un array de objetos `Archivo`.
 */
export const manejarArchivosSoltados = (
  evento: React.DragEvent<HTMLDivElement>
): ArchivoImportadoEvidencia[] => {
  const archivos = Array.from(evento.dataTransfer.files || []);

  const archivosValidos: ArchivoImportadoEvidencia[] = [];

  archivos.forEach((archivo) => {
    if (archivo.name.toLowerCase().endsWith('.exe')) {
      toast.error(`El archivo ${archivo.name} no está permitido (.exe).`);
      return;
    }

    const sizeInMB = archivo.size / (1024 * 1024);
    if (sizeInMB > 1) {
      toast.error(
        `El archivo ${archivo.name} supera el máximo de 1 MB: (${sizeInMB.toFixed(2)} MB).`
      );
      return;
    }

    // 3) Determinar tipo a partir del MIME type o de la extensión
    const tipo = HallarTipoArchivo(archivo);

    // 4) Agregar al array válido
    archivosValidos.push({
      id: nanoid(),
      nombre: archivo.name,
      tamannio: Number(sizeInMB.toFixed(2)),
      progreso: 0,
      estado: 'nuevo',
      tipo,
      blob: archivo, // Guarda el archivo original
    });
  });

  return archivosValidos;
};

export const HallarTipoArchivo = (archivo: File): string => {
  const extension = archivo.name.toLowerCase().split('.').pop() || '';

  const coincidenciaExtension = TIPO_ARCHIVO.find((e) => e.ext === extension);
  if (coincidenciaExtension) return coincidenciaExtension.type;

  return 'otro';
};

export function AsignarNombreTipo(nombre: string): string {
  const extension = nombre.toLowerCase().split('.').pop() || '';
  const coincidenciaExtension = TIPO_ARCHIVO.find((e) => e.ext === extension);
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
