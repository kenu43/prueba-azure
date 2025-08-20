import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from 'app/comunes/controles/Buttons';
import Condicional from 'app/comunes/funcionales/Condicional';
import usePermisos from 'app/hooks/Permisos';

import type { Recomendacion } from './types/Types';

import styles from './estilos/Generales.module.css';
import { CorreoIcon, IconoEditar, ReporteIndividualIcon } from './recursos/Iconografia';
import RECOMENDACIONES from './recursos/TrabajadoresPrueba.json';
import CrearRecomendaciones from './secciones/CrearRecomendaciones';
import EditarRecomendaciones from './secciones/editar/EditarRecomendacion';
import EnviarCorreo from './secciones/EnviarCorreo';
import FiltrosRecomendaciones from './secciones/FiltrosRecomendaciones';
import CargarRecomendaciones from './secciones/modulos/CargarRecomendaciones';

const RecomendacionesMedicas = () => {
  const [estados, setEstados] = useState({
    filtrar: false,
    crear: false,
    editar: false,
    correo: false,
    importar: false,
  });

  const { accesos } = usePermisos();
  return (
    <>
      <h1 className="titulo_modulos">Recomendaciones médicas</h1>
      <div className={styles.contenedor_botones}>
        <div className={styles.acciones_principales}>
          <Button
            icon="new"
            name="Crear reporte"
            sizeBtn="normal"
            type="button"
            typeBtn="add"
            permiso="escribir"
            id="crear-recomendaciones"
            permisos={accesos.recomendacionesMedicas}
            onClick={() => setEstados({ ...estados, crear: true })}
          />

          <Button
            icon="new"
            name="Importar reportes"
            sizeBtn="normal"
            type="button"
            typeBtn="import"
            permiso="escribir"
            id="crear-recomendaciones"
            permisos={accesos.recomendacionesMedicas}
            onClick={() => setEstados({ ...estados, importar: true })}
          />
        </div>

        <div className={styles.boton_instructivos}>
          <Button
            icon="filter"
            name="Filtros"
            sizeBtn="normal"
            type="button"
            typeBtn="filter"
            permiso="escribir"
            id="filtro-recomendaciones"
            permisos={accesos.recomendacionesMedicas}
            onClick={() => setEstados({ ...estados, filtrar: true })}
          />
        </div>
      </div>
      <Tabla
        id="tabla_recomendaciones"
        tableData={RECOMENDACIONES as Recomendacion[]}
        configurations={{
          tableColumns: [
            {
              label: 'Expediente',
              key: 'cedula',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Nombre completo',
              key: 'nombre',
              styleConfig: { textAlign: 'start', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'start' },
            },
            {
              label: 'Tipo de reporte',
              key: 'recomendacion',
              styleConfig: { textAlign: 'start', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'start' },
            },
            {
              label: 'Dirección área',
              key: 'area',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Estado del reporte',
              key: 'estadoReporte',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
          ],
        }}
        controls={[
          {
            tooltip: 'Editar reporte',
            id: 'editar-reporte-trabajador',
            icon: <IconoEditar />,
            event: () => setEstados({ ...estados, editar: true }),
          },
          {
            tooltip: 'Enviar respuesta de gestión',
            id: 'enviar-correo',
            icon: <CorreoIcon />,
            event: () => setEstados({ ...estados, correo: true }),
          },
          {
            tooltip: 'Reporte individual',
            id: 'reporte-individual-trabajador',
            icon: <ReporteIndividualIcon />,
            event: () => ({}),
          },
        ]}
      />

      <Condicional condicion={estados.filtrar}>
        <FiltrosRecomendaciones
          cerrar={() => setEstados({ ...estados, filtrar: false })}
        />
      </Condicional>

      <Condicional condicion={estados.crear}>
        <CrearRecomendaciones
          cerrar={() => setEstados({ ...estados, crear: false })}
        />
      </Condicional>

      <Condicional condicion={estados.editar}>
        <EditarRecomendaciones
          cerrar={() => setEstados({ ...estados, editar: false })}
        />
      </Condicional>

      <Condicional condicion={estados.correo}>
        <EnviarCorreo
          isOpen={estados.correo}
          cerrar={() => setEstados({ ...estados, correo: false })}
        />
      </Condicional>

      <Condicional condicion={estados.importar}>
        <CargarRecomendaciones
          titulo="Cargue de recomendaciones"
          close={() => setEstados({ ...estados, importar: false })}
          rutaStorage="empresas/trabajadores"
          archivosCargados={(e) => {
            if (e.length > 0) {
              toast('Se han cargado las recomendaciones');
            }
          }}
        />
      </Condicional>
    </>
  );
};

export default RecomendacionesMedicas;
