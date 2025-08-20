import { useShallow } from 'zustand/react/shallow';

import Date from 'comunes/controles/Date';
import Radio from 'comunes/controles/Radio';
import Text from 'comunes/controles/Text';
import ModalFiltro from 'comunes/funcionales/modalFiltros/ModalFiltro';

import estilos from '../estilos/Generales.module.css';
import { actualizarFiltroTrabajadores, aplicarFiltroTrabajadores, reiniciarFiltroTrabajadores, useFiltrosTrabStore } from '../store/StoreFiltroTrabajadores';
import { SelectString } from 'app/comunes/controles/select';
import { TIPO_EMPRESA } from '../constantes/ConstGenerales';

const FiltrosTrabajador = ({ cerrar }: { cerrar: () => void }) => {
  const {
    cedula,
    nombre,
    fechaIngresoIni,
    fechaIngresoFin,
    activo,
    empresa,
  } = useFiltrosTrabStore(
    useShallow(state => ({
      cedula: state.cedula,
      nombre: state.nombre,
      fechaIngresoIni: state.fechaIngresoIni,
      fechaIngresoFin: state.fechaIngresoFin,
      activo: state.activo,
      empresa: state.empresa,
    })),
  );

  return (
    <ModalFiltro
      functions={{
        close() {
          cerrar();
        },
        apply: () => {
          aplicarFiltroTrabajadores();
          cerrar();
        },
        delete: () => {
          reiniciarFiltroTrabajadores();
          cerrar();
        },
      }}
    >
      <main className={estilos.contenedor_filtro}>
          <Text
            label="Expediente"
            value={cedula}
            onChange={e =>
              actualizarFiltroTrabajadores('cedula', e.target.value)}
          />
          <Text
            label="Nombre"
            value={nombre}
            onChange={e =>
              actualizarFiltroTrabajadores('nombre', e.target.value)}
          />
    
          <SelectString
            name='empresa'
            label="Empresa"
            value={empresa}
            optionsArray={TIPO_EMPRESA}
            onChange={valor =>
              actualizarFiltroTrabajadores('empresa', valor)}
          />
        
        <fieldset
          className={estilos.contenedor_fecha}
          id="filtrar-fecha-ingreso"
        >
          <legend>Fecha de ingreso</legend>
          <Date
            value={fechaIngresoIni}
            max={fechaIngresoFin}
            label="Fecha inicial"
            onChange={e =>
              actualizarFiltroTrabajadores('fechaIngresoIni', e.target.value)}
          />
          <Date
            value={fechaIngresoFin}
            min={fechaIngresoIni}
            label="Fecha final"
            onChange={e =>
              actualizarFiltroTrabajadores('fechaIngresoFin', e.target.value)}
          />
        </fieldset>

        <fieldset className={estilos.contenedor_estado} id="filtrar-estado">
          <legend>Estado del trabajador</legend>
          <Radio
            label=""
            value={activo ? 'Activo' : 'Inactivo'}
            options={['Activo', 'Inactivo']}
            onChange={e =>
              actualizarFiltroTrabajadores(
                'activo',
                e.target.value === 'Activo',
              )}
          />
        </fieldset>
      </main>
    </ModalFiltro>
  );
};

export default FiltrosTrabajador;
