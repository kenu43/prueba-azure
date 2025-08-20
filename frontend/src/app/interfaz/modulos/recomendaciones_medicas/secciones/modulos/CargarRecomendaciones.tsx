import type { JSX } from 'react';

import { nanoid } from 'nanoid';
import React, { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import Condicional from 'comunes/funcionales/Condicional';
import FormModal from 'comunes/funcionales/forms/Form';


import estilos from '../../../trabajadores/estilos/EstilosCargueTrabajadores.module.css';
import { DocumentoPorDefectoIcono } from 'app/comunes/evidencias/IconosEvidencia';
import { BasureroIcon, ExcelIcono, IconoRestaurar, ImportarDocumento, ImportarIcono } from 'app/interfaz/modulos/trabajadores/recursos/IconosCargaTrabajadores';
import { AsignarNombreTipo, manejarArchivosSoltados, iniciarCargaConReferencias } from 'app/comunes/evidencias/FuncionesEvidencia';
import { CargueProps, ArchivoImportado, TrabajadorNormalizado } from 'app/interfaz/modulos/trabajadores/types/CargueImportarTypes';
import { validarTrabajadoresExcel } from 'app/interfaz/modulos/trabajadores/utilidades/FuncionCargueTrabajadores';
import { validarCamposRequeridos, eliminarArchivoDefinitivamente } from 'app/interfaz/modulos/trabajadores/utilidades/FuncionesCargue';

const ICONO_MAPEO: Record<string, JSX.Element> = {
  excel: <ExcelIcono />,
};

const AsignarIconoTipoArchivo = (tipo: string) => {
  return ICONO_MAPEO[tipo] || <DocumentoPorDefectoIcono />;
};

const CargarRecomendaciones: React.FC<CargueProps> = ({
  close,
  titulo,
  rutaStorage,
  archivosCargados,
  archivosGuardados,
}) => {
  const [archivos, setArchivos] = useState<ArchivoImportado[]>(() =>
    (archivosGuardados || []).map(archivo => ({
      id: archivo?.id ?? nanoid(8),
      url: archivo?.url ?? '',
      nombre: archivo?.nombre ?? '',
      progreso: archivo?.progreso ?? 100,
      tamannio: typeof archivo?.tamannio === 'number' ? archivo.tamannio : 0,
      estado: archivo?.estado ?? 'cargado',
      tipo:
        archivo?.tipo
        ?? AsignarNombreTipo(archivo.nombre ?? '')
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

    evento.target.value = '';
  };

  const handleRestoreArchivo = (id: string) => {
    setArchivos(prev =>
      prev.map(archivo =>
        archivo.id === id ? { ...archivo, estado: 'cargado' } : archivo,
      ),
    );
  };

  const handleSubirArchivos = async () => {
    if (archivos.length === 0) {
      toast.error('Primero debes seleccionar un archivo Excel válido.');
      return;
    }

    const archivo = archivos[0];

    if (!archivo.blob || archivo.blob.size === 0) {
      toast.error('El archivo seleccionado no es válido o está vacío.');
      return;
    }

    try {
      const data = await archivo.blob.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonOriginal = XLSX.utils.sheet_to_json<TrabajadorNormalizado>(
        sheet,
        {
          raw: false,
          dateNF: 'yyyy-mm-dd',
        },
      );

      const datosConEncabezadosNormalizados = jsonOriginal.map((fila) => {
        const filaNormalizada: TrabajadorNormalizado = {};
        for (const clave in fila) {
          const claveLimpia = clave
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036F]/g, '');

          filaNormalizada[claveLimpia] = fila[clave];
        }
        return {
          cedula: `${filaNormalizada.cedula ?? ''}`.trim(),
          fechaIngreso: `${filaNormalizada['fecha de ingreso'] ?? ''}`.trim(),
          fechadeRetiro: `${filaNormalizada['fecha de retiro'] ?? ''}`.trim(),
          fechaNacimiento:
            `${filaNormalizada['fecha de nacimiento'] ?? ''}`.trim(),
          ...filaNormalizada,
        };
      });

      if (!validarCamposRequeridos(datosConEncabezadosNormalizados)) {
        return;
      }
      const errores = validarTrabajadoresExcel(datosConEncabezadosNormalizados);

      if (errores.length > 0) {
        const erroresFormateados = errores
          .map(
            e =>
              `Fila ${e.fila}: ${e.errores
                .map((err, i) => `${i > 0 ? '- ' : ''}${err}`)
                .join(', ')}`,
          )
          .join('\n');

        toast.error(
          `Errores encontrados en el archivo:\n${erroresFormateados}\n\n Archivo: ${archivo.nombre}`,
          {
            duration: 8000,
          },
        );
        return;
      }

      iniciarCargaConReferencias(archivos, rutaStorage, setArchivos)
        .then((resultado) => {
          archivosCargados(resultado);
          close();
        })
        .catch(() => {
          toast.error('Error al subir los archivos');
        });
    }
    catch (error) {
      toast.error('No se pudo leer el archivo Excel');
      console.error(error);
    }
  };

  return (
    <FormModal close={close}>
      <div className={estilos.contenedor_subida}>
        <h1 className={estilos.titulo}>
          <ImportarDocumento />
          {titulo || 'Importar archivos'}
        </h1>

        <div
          className={`${estilos.zona_arrastre} ${arrastrando ? estilos.arrastrando : ''}`}
          onDrop={manejarDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setArrastrando(true);
          }}
          onDragLeave={() => setArrastrando(false)}
        >
          <ImportarIcono className={estilos.importar_archivo_icono} />
          <p className={estilos.instrucciones}>
            Arrastra y suelta tus archivos aquí o
          </p>
          <button
            type="button"
            className={estilos.boton_elegir}
            onClick={() => inputRef.current?.click()}
          >
            Elegir archivo
          </button>
          <label htmlFor="fileInput" className={estilos.input_oculto}>
            <input
              id="fileInput"
              ref={inputRef}
              type="file"
              multiple
              className={estilos.input_oculto}
              onChange={manejarSeleccionArchivos}
              aria-label="Seleccionar archivos"
            />
          </label>
        </div>

        <Condicional condicion={archivos.length > 0}>
          <h3 className={estilos.titulo_archivos}>Archivos subidos</h3>
          <div className={estilos.archivos_subidos}>
            {archivos.map((archivo) => {
              const claseEliminado
                = archivo.estado === 'eliminado' ? estilos.archivo_eliminado : '';

              const mostrarTamannio
                = archivo.tamannio && archivo.tamannio > 0
                  ? `${archivo.tamannio} MB`
                  : '';

              return (
                <div
                  id={archivo.id}
                  key={archivo.id}
                  className={`${estilos.contenedor_archivo} ${estilos.animacion_entrada} ${claseEliminado}`}
                >
                  <div className={estilos.info_archivo}>
                    <div className={estilos.icono_y_nombre}>
                      <span className={estilos.icono_archivo}>
                        {AsignarIconoTipoArchivo(archivo.tipo)}
                      </span>
                      <div>
                        <p className={estilos.nombre_archivo}>
                          {archivo.nombre}
                        </p>
                        <p className={estilos.detalles_archivo}>
                          {mostrarTamannio && `${mostrarTamannio} | `}
                          {archivo.progreso}
                          %
                          {archivo?.tiempoRestante
                            && ` • Tiempo restante: ${archivo.tiempoRestante}`}
                        </p>
                      </div>
                    </div>

                    {archivo.estado !== 'eliminado'
                      ? (
                          <button
                            title="Eliminar archivo"
                            type="button"
                            className={estilos.boton_eliminar}
                            onClick={(e) => {
                              e.stopPropagation();
                              eliminarArchivoDefinitivamente(
                                archivo.id,
                                archivos,
                                setArchivos,
                              );
                            }}
                          >
                            <BasureroIcon />
                          </button>
                        )
                      : (
                          <button
                            title="Restaurar archivo"
                            type="button"
                            className={estilos.boton_restaurar}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRestoreArchivo(archivo.id);
                            }}
                          >
                            <IconoRestaurar />
                          </button>
                        )}
                  </div>
                  <progress
                    max="100"
                    value={archivo.progreso}
                    className={estilos.barra_progreso}
                  />
                </div>
              );
            })}
          </div>
        </Condicional>

        <div className={estilos.botones}>
          <button
            type="button"
            className={estilos.boton_subir}
            onClick={handleSubirArchivos}
          >
            Cargar archivos
          </button>
        </div>
      </div>
    </FormModal>
  );
};

export default CargarRecomendaciones;
