import { toast } from 'sonner';
import Modal from 'comunes/funcionales/Modal';

import {
  ImagenIconoEvidencia,
  VideoIconoEvidencia,
  DocumentoPorDefectoIcono,
  RarIconoEvidencia,
  ExcelIconoEvidencia,
  PDFIconoEvidencia,
  DescargarIcon,
} from './IconosEvidencia';
import { AsignarNombreTipo } from './FuncionesEvidencia';
import estilos from './EstilosEvidencia.module.css';
import { JSX } from 'react';

const ICONO_MAPEO: Record<string, JSX.Element> = {
  imagen: <ImagenIconoEvidencia />,
  video: <VideoIconoEvidencia />,
  archivoComprimido: <RarIconoEvidencia />,
  pdf: <PDFIconoEvidencia />,
  excel: <ExcelIconoEvidencia />,
};

const AsignarIconoTipoArchivo = (nombre: string) => {
  const tipo = AsignarNombreTipo(nombre);
  return ICONO_MAPEO[tipo] || <DocumentoPorDefectoIcono />;
};

interface EvidenciaCargadas {
  nombre: string;
  url: string;
  tipo?: string;
}

interface VerEvidenciaCargadaProps {
  close: () => void;
  titulo?: string;
  evidencias: EvidenciaCargadas[];
}
const descargarArchivo = async (url: string, nombre: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = nombre;
    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error al descargar archivo:', error);
    toast.error('Error al descargar el archivo');
  }
};

const VerEvidenciaCargada = ({
  close,
  titulo = 'Evidencias cargadas',
  evidencias,
}: VerEvidenciaCargadaProps) => {
  return (
    <Modal>
      <div className={estilos.contenedorSubida} id='contenedor_ver_evidencias'>
        <h1 className={estilos.titulo}>{titulo}</h1>

        {!evidencias || evidencias?.length === 0 ? (
          <p className={estilos.sinArchivos}>No hay evidencias para mostrar</p>
        ) : (
          <div className={estilos.archivosSubidos}>
            {evidencias.map((archivo, idx) => (
              <div
                key={`evidencia-${idx}`}
                className={estilos.contenedorArchivoVer}
              >
                <div className={estilos.infoArchivoVer}>
                  <span className={estilos.iconoArchivo}>
                    {AsignarIconoTipoArchivo(archivo.nombre)}
                  </span>
                  <p className={estilos.nombreArchivo}>{archivo.nombre}</p>
                </div>
                <a
                  onClick={() => descargarArchivo(archivo.url, archivo.nombre)}
                  href={archivo.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={estilos.botonDescargar}
                >
                  <DescargarIcon />
                </a>
              </div>
            ))}
          </div>
        )}

        <div className={estilos.botones}>
          <button
            type='button'
            className={estilos.botonCancelar}
            onClick={close}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VerEvidenciaCargada;
