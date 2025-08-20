import type { JSX } from 'react';

import { nanoid } from 'nanoid';
import React, { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

import Condicional from 'comunes/funcionales/Condicional';
import Modal from 'comunes/funcionales/Modal';

import type {
  ArchivoImportadoEvidencia,
  EvidenciaProps,
} from './TypesEvidenciaImportar';

import ModalAviso from '../modal_aviso/ModalAviso';
import estilos from './EstilosEvidencia.module.css';
import {
  AsignarNombreTipo,
  eliminarArchivoConAnimacion,
  extensionesArchivo,
  iniciarCargaConReferencias,
  manejarArchivosSoltados,
} from './FuncionesEvidencia';
import {
  BasureroIconEvidencia,
  DocumentoPorDefectoIcono,
  ExcelIconoEvidencia,
  IconoRestaurarEvidencia,
  IconoSubiendoArchivos,
  ImagenIconoEvidencia,
  ImportarDocumentoEvidencia,
  ImportarIconoEvidencia,
  PDFIconoEvidencia,
  RarIconoEvidencia,
  VideoIconoEvidencia,
} from './IconosEvidencia';

const ICONO_MAPEO: Record<string, JSX.Element> = {
  imagen: <ImagenIconoEvidencia />,
  video: <VideoIconoEvidencia />,
  archivoComprimido: <RarIconoEvidencia />,
  pdf: <PDFIconoEvidencia />,
  excel: <ExcelIconoEvidencia />,
};

const AsignarIconoTipoArchivo = (tipo: string) => {
  return ICONO_MAPEO[tipo] || <DocumentoPorDefectoIcono />;
};

/**
 * Componente Evidencia para cargar y gestionar archivos de evidencia.
 *
 * Este componente provee una interfaz para cargar archivos mediante arrastrar y soltar o selección manual,
 * mostrar el progreso de carga, y administrar los archivos cargados (eliminar, restaurar).
 *
 * @param {Function} props.close - Función para cerrar el modal de carga de evidencias
 * @param {string} [props.titulo] - Título personalizado para el modal (por defecto: "Importar archivos")
 * @param {string} props.rutaStorage - Ruta en el almacenamiento donde se guardarán los archivos
 * @param {Function} props.archivosCargados - Función callback que recibe los archivos subidos exitosamente
 * @param {Array<object>} [props.archivosGuardados] - Lista de archivos previamente guardados para mostrar
 * @param {Function} [props.agregarNombreArchivo] - Función opcional para personalizar el nombre de los archivos
 * @param {number} [props.limiteArchivos] - Número máximo de archivos permitidos (Infinity por defecto)
 * @param {object} [props.confirmacion] - Configuración para mostrar un modal de confirmación antes de subir
 * @param {string} [props.confirmacion.titulo] - Título del modal de confirmación
 * @param {string} props.confirmacion.mensaje - Mensaje a mostrar en el modal de confirmación
 * @param {string} [props.confirmacion.textoBotonConfirmacion] - Texto del botón de confirmación
 * @returns {JSX.Element} Componente de carga de evidencias
 *
 * @example
 * <Evidencia
 *   close={() => setModalAbierto(false)}
 *   titulo="Subir documentos"
 *   rutaStorage="documentos/usuarioID/123"
 *   archivosCargados={(archivos) => console.log(archivos)}
 *   limiteArchivos={5}
 * />
 */
const Evidencia = ({
  close,
  titulo,
  rutaStorage,
  archivosCargados,
  archivosGuardados,
  agregarNombreArchivo,
  limiteArchivos,
  confirmacion,
  extensionesPermitidas = [],
}: EvidenciaProps) => {
  const [archivos, setArchivos] = useState<ArchivoImportadoEvidencia[]>(() =>
    archivosGuardados?.length === 0 || !archivosGuardados
      ? []
      : archivosGuardados?.map((archivo) => ({
          id: archivo?.id ?? nanoid(8),
          url: archivo?.url ?? '',
          nombre: archivo?.nombre ?? '',
          progreso: archivo?.progreso ?? 100,
          tamannio:
            typeof archivo?.tamannio === 'number' ? archivo.tamannio : 0,
          estado: archivo?.estado ?? 'cargado',
          tipo:
            archivo?.tipo ??
            AsignarNombreTipo(archivo?.nombre ?? '') ??
            'desconocido',
          blob: new File([], archivo?.nombre ?? '', {
            type: archivo?.tipo ?? '',
          }),
        })) ?? []
  );
  const [arrastrando, setArrastrando] = useState(false);
  const limite = limiteArchivos ?? Infinity;
  const archivosActivos = archivos.filter((a) => a.estado !== 'eliminado');
  const limiteAlcanzado = archivosActivos.length >= limite;
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [enProceso, setEnProceso] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const extensiones = extensionesArchivo(extensionesPermitidas);
  /**
   * Combina los archivos de evidencia existentes con nuevos archivos, respetando un límite máximo.
   *
   * Esta función gestiona la combinación de archivos de evidencia manteniendo un control sobre:
   * - Los archivos marcados como eliminados (se conservan en la lista pero no cuentan para el límite)
   * - Los archivos activos (cuentan para el límite establecido)
   * - Los nuevos archivos a añadir (se añaden hasta alcanzar el límite)
   *
   * El propósito es mantener la integridad del historial de archivos mientras se respeta
   * una cantidad máxima de archivos activos.
   *
   * @param prev - Array de archivos existentes, puede contener archivos eliminados y activos
   * @param nuevos - Array de nuevos archivos a incorporar
   * @param limite - Número máximo de archivos activos permitidos
   * @returns - Array combinado de archivos respetando el límite para los activos
   */
  const combinarArchivosConLimite = (
    prev: ArchivoImportadoEvidencia[],
    nuevos: ArchivoImportadoEvidencia[],
    limite: number
  ) => {
    const eliminados = prev.filter((a) => a.estado === 'eliminado');
    const activos = prev.filter((a) => a.estado !== 'eliminado');

    const espacio = limite - activos.length;
    const aceptados = nuevos.slice(0, espacio);

    return [...eliminados, ...activos, ...aceptados];
  };

  const manejarDrop = useCallback(
    (evento: React.DragEvent<HTMLDivElement>) => {
      evento.preventDefault();
      setArrastrando(false);

      const nuevosArchivos = manejarArchivosSoltados(
        evento,
        agregarNombreArchivo,
        extensiones,
        limite,
        archivosActivos.length
      );

      setArchivos((prev) =>
        combinarArchivosConLimite(prev, nuevosArchivos, limite)
      );
    },
    [agregarNombreArchivo, extensiones, limite, archivosActivos.length]
  );
  const manejarSeleccionArchivos = (
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nuevosArchivos = manejarArchivosSoltados(
      {
        dataTransfer: { files: evento.target.files },
      } as React.DragEvent<HTMLDivElement>,
      agregarNombreArchivo,
      extensiones,
      limite,
      archivosActivos.length
    );

    setArchivos((prev) =>
      combinarArchivosConLimite(prev, nuevosArchivos, limite)
    );
    evento.target.value = '';
  };

  const restaurarArchivo = (id: string) => {
    setArchivos((prev) =>
      prev.map((archivo) =>
        archivo.id === id ? { ...archivo, estado: 'cargado' } : archivo
      )
    );
  };

  /**
   * Inicia la carga de archivos al storage de firebase.
   *
   * Esta función sube los archivos actuales al storage de firebase utilizando la ruta especificada en Firebase,
   * notifica sobre los archivos cargados exitosamente y cierra el componente actual.
   * En caso de error durante la carga, muestra un mensaje de error al usuario.
   *
   * @returns {void}
   */
  const subirArchivos = () => {
    setEnProceso(true);
    iniciarCargaConReferencias(archivos, rutaStorage, setArchivos)
      .then((resultado) => {
        archivosCargados(resultado);
        close();
      })
      .catch(() => {
        toast.error('Error al subir los archivos:');
      })
      .finally(() => {
        setEnProceso(false);
      });
  };

  return (
    <Modal>
      <main className={estilos.contenedor_subida}>
        <h1 className={estilos.titulo}>
          <ImportarDocumentoEvidencia className={estilos.icono_titulo} />
          {titulo || 'Importar archivos'}
        </h1>
        <div
          className={`${estilos.zona_arrastre} ${
            arrastrando ? estilos.arrastrando : ''
          }`}
          onDrop={(e) => {
            if (enProceso || limiteAlcanzado) return;
            manejarDrop(e);
          }}
          onDragOver={(e) => {
            if (enProceso || limiteAlcanzado) return;
            e.preventDefault();
            setArrastrando(true);
          }}
          onDragLeave={() => setArrastrando(false)}
          id='contenedor_evidencia'
        >
          <ImportarIconoEvidencia className={estilos.icono_importar_archivo} />
          <p className={estilos.instrucciones}>
            Arrastra y suelta tus archivos aquí o
          </p>
          <button
            type='button'
            className={estilos.boton_elegir}
            onClick={() => !limiteAlcanzado && inputRef.current?.click()}
            disabled={enProceso || limiteAlcanzado}
          >
            Elegir archivos
          </button>
          <label htmlFor='fileInput' className={estilos.input_oculto}>
            <input
              id='fileInput'
              ref={inputRef}
              type='file'
              multiple={limite !== 1}
              onChange={manejarSeleccionArchivos}
              disabled={enProceso || limiteAlcanzado}
              aria-label='Seleccionar archivos'
              accept={extensiones.map((e: string) => `.${e}`).join(',')}
            />
          </label>
        </div>
        <p className={estilos.restricciones}>Tamaño máximo 1 MB.</p>
        <Condicional condicion={archivos.length > 0}>
          <h3 className={estilos.titulo_archivos}>Archivos subidos</h3>
          <div className={estilos.archivos_subidos}>
            {archivos.map((archivo) => {
              const claseEliminado =
                archivo.estado === 'eliminado' ? estilos.archivo_eliminado : '';

              const mostrarTamannio =
                archivo.tamannio && archivo.tamannio > 0
                  ? `${archivo.tamannio} MB`
                  : '';

              return (
                <div
                  id={archivo.id}
                  key={archivo.id}
                  className={`${estilos.contenedor_archivo} ${estilos.animacion_entrada} ${claseEliminado}`}
                >
                  <section className={estilos.informacion_archivo}>
                    <div className={estilos.icono_con_nombre}>
                      <span className={estilos.icono_archivo}>
                        {archivo.estado === 'subiendo' ? (
                          <IconoSubiendoArchivos
                            className={estilos.iconoCarga}
                          />
                        ) : (
                          AsignarIconoTipoArchivo(archivo.tipo)
                        )}
                      </span>
                      <div>
                        <p className={estilos.nombre_archivo}>
                          {archivo.nombre}
                        </p>
                        <p className={estilos.detalles_archivo}>
                          {mostrarTamannio && `${mostrarTamannio} | `}
                          {archivo.progreso}%
                          {archivo.estado === 'fallido' && (
                            <span className={estilos.estado_error}>
                              ⛔ Error al subir el archivo
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {archivo.estado !== 'eliminado' ? (
                      <button
                        title='Eliminar archivo'
                        type='button'
                        disabled={enProceso}
                        className={estilos.boton_eliminar}
                        onClick={(e) => {
                          e.stopPropagation();
                          eliminarArchivoConAnimacion(archivo.id, setArchivos);
                        }}
                      >
                        <BasureroIconEvidencia />
                      </button>
                    ) : (
                      <button
                        title='Restaurar archivo'
                        type='button'
                        disabled={enProceso}
                        className={estilos.boton_restaurar}
                        onClick={(e) => {
                          e.stopPropagation();
                          restaurarArchivo(archivo.id);
                        }}
                      >
                        <IconoRestaurarEvidencia />
                      </button>
                    )}
                  </section>
                  <progress
                    max='100'
                    value={archivo.progreso}
                    className={estilos.barra_progreso}
                  />
                </div>
              );
            })}
          </div>
        </Condicional>
        <div className={estilos.botones} id='botones_evidencia'>
          <button
            type='button'
            className={estilos.boton_cancelar}
            onClick={close}
          >
            Cerrar
          </button>
          <button
            type='button'
            className={estilos.boton_subir}
            onClick={() => {
              if (confirmacion) {
                setMostrarConfirmacion(true);
              } else {
                subirArchivos();
              }
            }}
            disabled={enProceso || archivosActivos.length === 0}
          >
            {enProceso ? (
              <span className={estilos.subiendo_archivos_texto}>
                <p>Subiendo</p>
                <IconoSubiendoArchivos />
              </span>
            ) : (
              'Actualizar archivos'
            )}
          </button>
        </div>
      </main>
      {mostrarConfirmacion && confirmacion && (
        <ModalAviso
          abrir={mostrarConfirmacion}
          tipo='advertencia'
          titulo={confirmacion.titulo ?? 'Advertencia'}
          mensaje={confirmacion.mensaje}
          textoConfirmar={confirmacion.textoBotonConfirmacion ?? 'Confirmar'}
          onConfirmar={() => {
            setMostrarConfirmacion(false);
            subirArchivos();
          }}
          onCancelar={() => setMostrarConfirmacion(false)}
        />
      )}
    </Modal>
  );
};

export default Evidencia;
