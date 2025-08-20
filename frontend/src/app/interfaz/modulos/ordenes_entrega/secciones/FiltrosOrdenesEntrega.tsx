import { useState } from 'react';

import Date from 'app/comunes/controles/Date';
import { SelectString } from 'app/comunes/controles/select';
import Text from 'app/comunes/controles/Text';
import ModalFiltro from 'app/comunes/funcionales/modalFiltros/ModalFiltro';

import type { FiltrosOrdenEntrega } from '../types/Types';

import estilos from '../estilos/FiltroOrdenesEntrega.module.css';

type FiltrosOrdenesEntregaProps = {
  cerrar: () => void;
  aplicarFiltros: (filtros: FiltrosOrdenEntrega) => void;
  filtrosActuales: FiltrosOrdenEntrega;
};

const FiltrosOrdenesEntrega = ({ cerrar, aplicarFiltros, filtrosActuales }: FiltrosOrdenesEntregaProps) => {
  const [filtros, setFiltros] = useState<FiltrosOrdenEntrega>(filtrosActuales);

  const handleAplicarFiltros = () => {
    aplicarFiltros(filtros);
    cerrar();
  };

  const handleLimpiarFiltros = () => {
    const filtrosVacios: FiltrosOrdenEntrega = {
      trabajador: '',
      estado: '',
      fechaDesde: '',
      fechaHasta: '',
    };
    setFiltros(filtrosVacios);
    aplicarFiltros(filtrosVacios);
    cerrar();
  };

  return (
    <ModalFiltro
      functions={{
        close: cerrar,
        apply: handleAplicarFiltros,
        delete: handleLimpiarFiltros,
      }}
    >
      <main className={estilos.contenedor_filtro}>
        <Text
          label="Trabajador"
          placeholder="Buscar por cédula o nombre"
          value={filtros.trabajador}
          onChange={e => setFiltros({ ...filtros, trabajador: e.target.value })}
        />

        <SelectString
          name="estado"
          label="Estado de entrega"
          value={filtros.estado}
          optionsArray={[
            'Aprobado',
            'Entregado',
            'Devuelto',
          ]}
          onChange={valor => setFiltros({ ...filtros, estado: valor as FiltrosOrdenEntrega['estado'] })}
        />

        <fieldset className={estilos.contenedor_fechas}>
          <legend>Fecha de solicitud</legend>
          <Date
            label="Fecha inicial"
            value={filtros.fechaDesde}
            onChange={e => setFiltros({ ...filtros, fechaDesde: e.target.value })}
          />

          <Date
            label="Fecha final"
            value={filtros.fechaHasta}
            onChange={e => setFiltros({ ...filtros, fechaHasta: e.target.value })}
          />
        </fieldset>
      </main>
    </ModalFiltro>
  );
};

export default FiltrosOrdenesEntrega;
