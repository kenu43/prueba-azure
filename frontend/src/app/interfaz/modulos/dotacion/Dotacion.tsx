import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from 'app/comunes/controles/Buttons';
import Condicional from 'app/comunes/funcionales/Condicional';
import usePermisos from 'app/hooks/Permisos';
import { filtrosAplicados, filtrosInfo } from 'utilidades/FuncionesApp';

import styles from './estilos/Generales.module.css';
import { IconoAprobar } from './recursos/Iconografia';
import Dotaciones from './recursos/TrabajadoresPrueba.json';
import FiltrosDotaciones from './secciones/FiltrosDotaciones';
import SolicitarDotacion from './secciones/SolicitarDotacion';
import { useFiltrosDotacionStore } from './store/StoreFiltros';
import AprobarDotacion from './secciones/AprobarDotacion';

const Dotacion = () => {
  const [estados, setEstados] = useState({
    filtrar: false,
    solicitarDotacion: false,
    aprobarDotacion: false,
  });

  const { accesos } = usePermisos();
  const { cedulaAplicado, estadoAplicado, nombreAplicado } =
    useFiltrosDotacionStore(
      useShallow(({ cedulaAplicado, estadoAplicado, nombreAplicado }) => ({
        cedulaAplicado,
        estadoAplicado,
        nombreAplicado,
      }))
    );

  const dotacionesProcesadas = Dotaciones.map((item) => ({
    ...item,
    estado: item.activo ? 'Activo' : 'Inactivo',
  }));

  const filtros = {
    nombre: filtrosInfo(nombreAplicado, 'nombre'),
    cedula: filtrosInfo(cedulaAplicado, 'expediente'),
    estado: filtrosInfo(estadoAplicado, 'estado'),
  };

  return (
    <main className={styles.contenedor}>
      <h1 className='titulo_modulos'>Dotaciones</h1>

      <div className={styles.contenedor_botones}>
        <Button
          icon='new'
          name='Solicitar dotación'
          sizeBtn='normal'
          type='button'
          typeBtn='add'
          permiso='escribir'
          id='solicitar-dotacion'
          permisos={accesos.dotacion}
          onClick={() => setEstados({ ...estados, solicitarDotacion: true })}
        />
        <div className={styles.boton_instructivos}>
          <Button
            icon='filter'
            name='Filtros'
            sizeBtn='normal'
            type='button'
            typeBtn='filter'
            permiso='escribir'
            id='filtro-dotaciones'
            permisos={accesos.dotacion}
            onClick={() => setEstados({ ...estados, filtrar: true })}
          />
        </div>
      </div>
      <div className={styles.frase_filtro}>
        <p>{filtrosAplicados(filtros)}</p>
      </div>
      <Tabla
        id='tabla_dotaciones'
        tableData={dotacionesProcesadas}
        configurations={{
          tableColumns: [
            {
              label: 'Expediente',
              key: 'cedula',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Nombre',
              key: 'nombre',
              styleConfig: { textAlign: 'start', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'start' },
            },
            {
              label: 'Región',
              key: 'region',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Ciudad',
              key: 'ciudad',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Fecha de solicitud',
              key: 'fechaSolicitud',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Estado',
              key: 'estado',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
          ],
        }}
        controls={[
          {
            tooltip: 'Aprobación de dotación',
            icon: <IconoAprobar />,
            id: 'boton-aprobar',
            event: () => setEstados({ ...estados, aprobarDotacion: true }),
          },
        ]}
      />

      <Condicional condicion={estados.filtrar}>
        <FiltrosDotaciones
          cerrar={() => setEstados({ ...estados, filtrar: false })}
        />
      </Condicional>

      <Condicional condicion={estados.solicitarDotacion}>
        <SolicitarDotacion
          cerrar={() => {
            setEstados({ ...estados, solicitarDotacion: false });
          }}
        />
      </Condicional>

      <Condicional condicion={estados.aprobarDotacion}>
        <AprobarDotacion
          cerrar={() => setEstados({ ...estados, aprobarDotacion: false })}
        />
      </Condicional>
    </main>
  );
};

export default Dotacion;
