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

import estilos from './EstilosEvidencia.module.css';
import {
  AsignarNombreTipo,
  eliminarArchivoConAnimacion,
  iniciarCargaConReferencias,
  manejarArchivosSoltados,
} from './FuncionesEvidencia';
import {
  BasureroIconEvidencia,
  DocumentoPorDefectoIcono,
  ExcelIconoEvidencia,
  IconoRestaurarEvidencia,
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

const Evidencia = ({
  close,
  titulo,
  rutaStorage,
  archivosCargados,
  archivosGuardados,
}: EvidenciaProps) => {
  const [archivos, setArchivos] = useState<ArchivoImportadoEvidencia[]>(() =>
    (archivosGuardados || []).map(archivo => ({
      id: archivo?.id ?? nanoid(8),
      url: archivo?.url ?? '',
      nombre: archivo?.nombre ?? '',
      progreso: archivo?.progreso ?? 100,
      tamannio: typeof archivo?.tamannio === 'number' ? archivo.tamannio : 0,
      estado: archivo?.estado ?? 'cargado',
      tipo:
        archivo?.tipo
        ?? AsignarNombreTipo(archivo?.nombre ?? '')
        ?? 'desconocido',
      tiempoRestante: archivo?.tiempoRestante ?? '',
      blob: new File([], archivo?.nombre ?? '', {
        type: archivo?.tipo ?? '',
      }),
    })),
  );
  const [arrastrando, setArrastrando] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const manejarDrop = useCallback((evento: React.DragEvent<HTMLDivElement>) => {
    evento.preventDefault();
    setArrastrando(false);
    const nuevosArchivos = manejarArchivosSoltados(evento);
    setArchivos(prev => [...prev, ...nuevosArchivos]);
  }, []);

  const manejarSeleccionArchivos = (
    evento: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nuevosArchivos = manejarArchivosSoltados({
      dataTransfer: { files: evento.target.files },
    } as React.DragEvent<HTMLDivElement>);
    setArchivos(prev => [...prev, ...nuevosArchivos]);
  };
  const handleRestoreArchivo = (id: string) => {
    setArchivos(prev =>
      prev.map(archivo =>
        archivo.id === id ? { ...archivo, estado: 'cargado' } : archivo,
      ),
    );
  };

  const handleSubirArchivos = () => {
    iniciarCargaConReferencias(archivos, rutaStorage, setArchivos)
      .then((resultado) => {
        archivosCargados(resultado);
        close();
      })
      .catch(() => {
        toast.error('Error al subir los archivos:');
      });
  };

  return (
    <Modal>
      <div
        className={
          estilos.contenedorSubida
        }
      >
        {' '}
        <h1 className={estilos.titulo}>
          <ImportarDocumentoEvidencia className={estilos.IconoTitulo} />
          {titulo || 'Importar archivos'}
        </h1>

        <div
          className={`${estilos.zonaArrastre} ${
            arrastrando ? estilos.arrastrando : ''
          }`}
          onDrop={manejarDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setArrastrando(true);
          }}
          onDragLeave={() => setArrastrando(false)}
          id="contenedor_evidencia"
        >
          <ImportarIconoEvidencia className={estilos.ImportarArchivoIcono} />
          <p className={estilos.instrucciones}>
            Arrastra y suelta tus archivos aquí o
          </p>
          <button
            type="button"
            className={estilos.botonElegir}
            onClick={() => inputRef.current?.click()}
          >
            Elegir archivos
          </button>
          <label htmlFor="fileInput" className={estilos.inputOculto}>
            <input
              id="fileInput"
              ref={inputRef}
              type="file"
              multiple
              className={estilos.inputOculto}
              onChange={manejarSeleccionArchivos}
              aria-label="Seleccionar archivos"
            />
          </label>
        </div>

        <p className={estilos.restricciones}>Tamaño máximo 1 MB.</p>

        <Condicional condicion={archivos.length > 0}>
          <h3 className={estilos.tituloArchivos}>Archivos subidos</h3>
          <div className={estilos.archivosSubidos}>
            {archivos.map((archivo) => {
              // (2) Clase adicional si el archivo está en estado "eliminado" (borde rojo).
              const claseEliminado
                = archivo.estado === 'eliminado' ? estilos.archivoEliminado : '';

              // (3) Si el tamaño es 0, no mostramos nada
              const mostrarTamannio
                = archivo.tamannio && archivo.tamannio > 0
                  ? `${archivo.tamannio} MB`
                  : '';

              return (
                <div
                  id={archivo.id}
                  key={archivo.id}
                  className={`${estilos.contenedorArchivo} ${estilos.animacionEntrada} ${claseEliminado}`}
                >
                  <div className={estilos.infoArchivo}>
                    <div className={estilos.iconoYNombre}>
                      <span className={estilos.iconoArchivo}>
                        {AsignarIconoTipoArchivo(archivo.tipo)}
                      </span>
                      <div>
                        <p className={estilos.nombreArchivo}>
                          {archivo.nombre}
                        </p>
                        <p className={estilos.detallesArchivo}>
                          {/* Si el tamaño existe, lo mostramos, si no, nada */}
                          {mostrarTamannio && `${mostrarTamannio} | `}
                          {archivo.progreso}
                          %
                          {archivo?.tiempoRestante
                            && ` • Tiempo restante: ${archivo.tiempoRestante}`}
                        </p>
                      </div>
                    </div>

                    {/* (1) Si no está eliminado, muestra "Eliminar"; si está eliminado, muestra "Restaurar". */}
                    {archivo.estado !== 'eliminado'
                      ? (
                          <button
                            title="Eliminar archivo"
                            type="button"
                            className={estilos.botonEliminar}
                            onClick={(e) => {
                              e.stopPropagation();
                              eliminarArchivoConAnimacion(archivo.id, setArchivos);
                            }}
                          >
                            <BasureroIconEvidencia />
                          </button>
                        )
                      : (
                          <button
                            title="Restaurar archivo"
                            type="button"
                            className={estilos.botonRestaurar}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRestoreArchivo(archivo.id);
                            }}
                          >
                            <IconoRestaurarEvidencia />
                          </button>
                        )}
                  </div>
                  <progress
                    max="100"
                    value={archivo.progreso}
                    className={estilos.barraProgreso}
                  />
                </div>
              );
            })}
          </div>
        </Condicional>

        <div className={estilos.botones} id="botones_evidencia">
          <button type="button" className={estilos.botonCancelar} onClick={close}>
            Cerrar
          </button>
          <button
            type="button"
            className={estilos.botonSubir}
            onClick={() => {
              handleSubirArchivos();
            }}
          >
            Actualizar archivos
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Evidencia;
