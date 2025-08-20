import { Tabla } from "@pc-component-ui-test-v2/tabla";
import { useState } from "react";

import { Button } from "app/comunes/controles/Buttons";
import Condicional from "app/comunes/funcionales/Condicional";
import usePermisos from "app/hooks/Permisos";
import { useTourGuiado } from "app/hooks/TourHook";

import type { FiltrosOrdenEntrega, OrdenEntrega } from "./types/Types";

import { TOUR_ORDENES_ENTREGA } from "./constantes/TourOrdenesEntrega";
import estilos from "./estilos/Generales.module.css";
import { IconoVer } from "./recursos/Iconografia";
import ORDENES_ENTREGA from "./recursos/OrdenesEntregasPrueba.json";
import FiltrosOrdenesEntrega from "./secciones/FiltrosOrdenesEntrega";
import VerOrdenEntrega from "./secciones/VerOrdenEntrega";

const OrdenesEntrega = () => {
  const { accesos } = usePermisos();
  const iniciarTour = useTourGuiado(TOUR_ORDENES_ENTREGA);

  const [estados, setEstados] = useState({
    filtrar: false,
    ver: false,
  });

  const [ordenSeleccionada, setOrdenSeleccionada] =
    useState<OrdenEntrega | null>(null);
  const [filtros, setFiltros] = useState<FiltrosOrdenEntrega>({
    trabajador: "",
    estado: "",
    fechaDesde: "",
    fechaHasta: "",
  });

  const aplicarFiltros = (nuevosFiltros: FiltrosOrdenEntrega) => {
    setFiltros(nuevosFiltros);
  };

  const datosFiltrados = (ORDENES_ENTREGA as OrdenEntrega[]).filter((orden) => {
    const matchTrabajador = filtros.trabajador
      ? orden.trabajador.cedula.includes(filtros.trabajador) ||
        orden.trabajador.nombre
          .toLowerCase()
          .includes(filtros.trabajador.toLowerCase())
      : true;

    const matchEstado = filtros.estado
      ? orden.infoEntrega.estado === filtros.estado
      : true;

    const matchFechaDesde = filtros.fechaDesde
      ? new Date(orden.infoEntrega.fechaSolicitud) >=
        new Date(filtros.fechaDesde)
      : true;

    const matchFechaHasta = filtros.fechaHasta
      ? new Date(orden.infoEntrega.fechaSolicitud) <=
        new Date(filtros.fechaHasta)
      : true;

    return matchTrabajador && matchEstado && matchFechaDesde && matchFechaHasta;
  });

  const prepararDatosTabla = (ordenes: OrdenEntrega[]) => {
    return ordenes.map((orden) => ({
      cedula: orden.trabajador.cedula,
      nombre: orden.trabajador.nombre,
      region: orden.trabajador.region,
      ciudad: orden.trabajador.ciudad,
      fechaSolicitud: orden.infoEntrega.fechaSolicitud,
      estado: orden.infoEntrega.estado,
      numeroOrden: orden.infoEntrega.numeroOrden,
      proveedor: orden.infoEntrega.proveedor,
    }));
  };

  return (
    <main id="ordenes-entrega-modulo" className={estilos.contenedor}>
      <h1 className="titulo_modulos">Órdenes de entrega</h1>

      <section className={estilos.contenedor_botones}>
        <div className={estilos.acciones_principales}>
          <Button
            icon="update"
            name="Actualizar tabla"
            sizeBtn="normal"
            type="button"
            typeBtn="update"
            permiso="leer"
            id="actualizar-ordenes"
            permisos={accesos.ordenesEntrega}
            onClick={() => {
              // Implementar lógica de actualización lauris
            }}
          />

          <Button
            icon="new"
            name="Instructivo"
            sizeBtn="normal"
            type="button"
            typeBtn="primary"
            permiso="leer"
            id="tour-ordenes"
            permisos={accesos.ordenesEntrega}
            onClick={iniciarTour}
          />
        </div>

        <div className={estilos.boton_instructivos}>
          <Button
            icon="filter"
            name="Filtros"
            sizeBtn="normal"
            type="button"
            typeBtn="filter"
            permiso="leer"
            id="filtro-ordenes"
            permisos={accesos.ordenesEntrega}
            onClick={() => setEstados({ ...estados, filtrar: true })}
          />
        </div>
      </section>

      <section className={estilos.tabla_container}>
        <Tabla
          id="tabla_ordenes_entrega"
          tableData={prepararDatosTabla(datosFiltrados)}
          configurations={{
            tableColumns: [
              {
                label: "Expediente",
                key: "cedula",
                styleConfig: { textAlign: "center", color: "var(--brand-1)" },
                rowStyleConfig: { textAlign: "center" },
              },
              {
                label: "Nombre completo",
                key: "nombre",
                styleConfig: { textAlign: "start", color: "var(--brand-1)" },
                rowStyleConfig: { textAlign: "start" },
              },
              {
                label: "Región",
                key: "region",
                styleConfig: { textAlign: "center", color: "var(--brand-1)" },
                rowStyleConfig: { textAlign: "center" },
              },
              {
                label: "Ciudad",
                key: "ciudad",
                styleConfig: { textAlign: "center", color: "var(--brand-1)" },
                rowStyleConfig: { textAlign: "center" },
              },
              {
                label: "Fecha de solicitud",
                key: "fechaSolicitud",
                styleConfig: { textAlign: "center", color: "var(--brand-1)" },
                rowStyleConfig: { textAlign: "center" },
              },
              {
                label: "Estado del pedido",
                key: "estado",
                styleConfig: { textAlign: "center", color: "var(--brand-1)" },
                rowStyleConfig: { textAlign: "center" },
              },
              {
                label: "Número de orden",
                key: "numeroOrden",
                styleConfig: { textAlign: "center", color: "var(--brand-1)" },
                rowStyleConfig: { textAlign: "center" },
              },
            ],
          }}
          controls={[
            {
              tooltip: "Ver orden de entrega",
              id: "ver-orden-entrega",
              icon: <IconoVer />,
              event: (e: any) => {
                // pues por ahora se busca la orden completa usando el índice o algún identificador
                const ordenCompleta = datosFiltrados.find(
                  (orden) => orden.trabajador.cedula === e.data?.cedula
                );
                setOrdenSeleccionada(ordenCompleta || null);
                setEstados({ ...estados, ver: true });
              },
            },
          ]}
        />
      </section>

      <Condicional condicion={estados.filtrar}>
        <FiltrosOrdenesEntrega
          cerrar={() => setEstados({ ...estados, filtrar: false })}
          aplicarFiltros={aplicarFiltros}
          filtrosActuales={filtros}
        />
      </Condicional>

      <Condicional condicion={estados.ver}>
        <VerOrdenEntrega
          cerrar={() => setEstados({ ...estados, ver: false })}
          ordenEntrega={ordenSeleccionada}
        />
      </Condicional>
    </main>
  );
};

export default OrdenesEntrega;
