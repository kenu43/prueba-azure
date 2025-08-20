import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import Button from 'app/comunes/controles/Buttons/secciones/Button';
import Condicional from 'app/comunes/funcionales/Condicional';
import usePermisos from 'app/hooks/Permisos';
import { filtrosAplicados, filtrosInfo } from 'utilidades/FuncionesApp';

import { STORE_INICIAL } from './constantes/ConstGenerales';
import estilos from './estilos/Generales.module.css';
import { IconoAprobar, IconoReportePdf } from './recursos/Iconografia';
import AprobarElementosEPP from './secciones/AprobarElementosEPP';
import BusquedaCargoEPP from './secciones/componentes/BusquedaCargoEPP';
import BusquedaProveedorEPP from './secciones/componentes/BusquedaProveedorEPP';
import FiltrosEpp from './secciones/FiltrosEPP';
import SolicitarEPP from './secciones/SolicitarEPP';
import { prepararDatosAprobar } from './store/StoreEpp';
import { useStoreTabla } from './store/StoreEppTabla';
import { useFiltrosEppStore } from './store/StoreFiltrosEpp';
import { validarDatosTabla } from './utilidades/Funciones';

const Epp = () => {
  const { accesos } = usePermisos();
  const [estados, setEstados] = useState({
    solicitarEPP: false,
    aprobarEPP: false,
    elementosProveedor: false,
    elementosCargo: false,
    filtros: false,
    aprobar: {
      cedulaTrabajador: '',
    },
  });

  const { cedulaAplicado, nombreAplicado, estadoAplicado } = useFiltrosEppStore(
    useShallow((state) => ({
      cedulaAplicado: state.cedulaAplicado,
      nombreAplicado: state.nombreAplicado,
      estadoAplicado: state.estadoAplicado,
    }))
  );

  const { registros } = useStoreTabla();

  // const iniciarTour = useTourGuiado(GENERAL_TOUR_EPP);

  const datosFiltrados =
    registros?.filter(({ trabajador, infoEntrega }) => {
      const matchCedula = cedulaAplicado
        ? trabajador.cedula.includes(cedulaAplicado)
        : true;
      const matchNombre = nombreAplicado
        ? trabajador.nombre.toLowerCase().includes(nombreAplicado.toLowerCase())
        : true;
      const matchEstado = estadoAplicado
        ? infoEntrega.estado === estadoAplicado
        : true;
      return matchCedula && matchNombre && matchEstado;
    }) ?? [];

  const filtros = {
    nombre: filtrosInfo(nombreAplicado, 'nombre'),
    cedula: filtrosInfo(cedulaAplicado, 'expediente'),
    estado: filtrosInfo(estadoAplicado, 'estado'),
  };

  return (
    <main className={estilos.contenedor}>
      <h1 className='titulo_modulos'>Elementos de protección personal</h1>

      <section className={estilos.botones_contenedor}>
        <div className={estilos.acciones_principales}>
          <Button
            icon='new'
            name='Solicitar EPP'
            id='boton-solicitar'
            sizeBtn='small'
            type='button'
            typeBtn='add'
            permiso='escribir'
            permisos={accesos.epp}
            onClick={() => setEstados({ ...estados, solicitarEPP: true })}
          />

          <Button
            icon='add'
            name='Buscar elementos por proveedor'
            id='boton-elemetos-proveedor'
            sizeBtn='small'
            type='button'
            typeBtn='add'
            permiso='escribir'
            permisos={accesos.epp}
            onClick={() => setEstados({ ...estados, elementosProveedor: true })}
          />
          <Button
            icon='new'
            name='Buscar elementos por cargo'
            id='boton-elemetos-cargo'
            sizeBtn='small'
            type='button'
            typeBtn='add'
            permiso='escribir'
            permisos={accesos.epp}
            onClick={() => setEstados({ ...estados, elementosCargo: true })}
          />

          <Button
            icon='update'
            id='boton-refrescar'
            name='Actualizar tabla'
            sizeBtn='small'
            type='button'
            typeBtn='update'
            permisos={accesos.epp}
          />
        </div>
        <div className={estilos.acciones_principales}>
          {/*           <Button
            name="Instructivo"
            type="button"
            sizeBtn="small"
            typeBtn="primary"
            icon="new"
            permiso="escribir"
            permisos={accesos.epp}
            onClick={iniciarTour}
          /> */}
          <Button
            name='Filtro'
            id='boton-filtro'
            type='button'
            sizeBtn='small'
            typeBtn='filter'
            icon='filter'
            permisos={accesos.epp}
            onClick={() => setEstados({ ...estados, filtros: true })}
          />
        </div>
      </section>
      <div className={estilos.frase_filtro}>
        <p>{filtrosAplicados(filtros)}</p>
      </div>

      <section>
        <Tabla
          id='tabla-epp'
          tableData={validarDatosTabla(datosFiltrados)}
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
              tooltip: 'Aprobación de EPP',
              icon: <IconoAprobar />,
              id: 'boton-aprobar',
              event: (e) => {
                setEstados({
                  ...estados,
                  aprobarEPP: true,
                  aprobar: { cedulaTrabajador: e.data?.cedula ?? '' },
                });
                prepararDatosAprobar(
                  {
                    ...(e.data?.trabajador ?? {
                      cedula: '',
                      SAP: '',
                      cargo: '',
                      ciudad: '',
                      nombre: '',
                      region: '',
                    }),
                  },
                  {
                    elementosSeleccionados:
                      e.data?.elementosSeleccionados ??
                      STORE_INICIAL.elementosSeleccionados,
                    infoEntrega:
                      e.data?.infoEntrega ?? STORE_INICIAL.infoEntrega,
                  }
                );
              },
            },
            {
              tooltip: 'Reporte individual',
              icon: <IconoReportePdf />,
              id: 'boton-descargar',
              event: () => {},
            },
          ]}
        />
      </section>
      <Condicional condicion={estados.solicitarEPP}>
        <SolicitarEPP
          cerrar={() => setEstados({ ...estados, solicitarEPP: false })}
        />
      </Condicional>

      <Condicional condicion={estados.aprobarEPP}>
        <AprobarElementosEPP
          cedulaTrabajador={estados.aprobar.cedulaTrabajador}
          cerrar={() => setEstados({ ...estados, aprobarEPP: false })}
        />
      </Condicional>

      <Condicional condicion={estados.elementosProveedor}>
        <BusquedaProveedorEPP
          cerrar={() => setEstados({ ...estados, elementosProveedor: false })}
        />
      </Condicional>

      <Condicional condicion={estados.elementosCargo}>
        <BusquedaCargoEPP
          cerrar={() => setEstados({ ...estados, elementosCargo: false })}
        />
      </Condicional>
      <Condicional condicion={estados.filtros}>
        <FiltrosEpp cerrar={() => setEstados({ ...estados, filtros: false })} />
      </Condicional>
    </main>
  );
};

export default Epp;
