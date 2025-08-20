import { Tabla } from "@pc-component-ui-test-v2/tabla";
import { useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

import { Button } from "comunes/controles/Buttons";
import Condicional from "comunes/funcionales/Condicional";
import usePermisos from "hooks/Permisos";
import { filtrosAplicados, filtrosInfo } from "utilidades/FuncionesApp";

import type { TrabajadoresType } from "./types/TrabajadoresTypes";

import styles from "./estilos/Generales.module.css";
import { IconoEditar } from "./recursos/Iconografia";
import trabajadoresIniciales from "./recursos/TrabajadoresPrueba.json";
import CargarTrabajadores from "./secciones/componentes/CargarTrabajadores";
import CrearTrabajador from "./secciones/CrearTrabajador";
import EditarTrabajador from "./secciones/EditarTrabajador";
import FiltrosTrabajador from "./secciones/FiltrosTrabajador";
import { useFiltrosTrabStore } from "./store/StoreFiltroTrabajadores";
import { prepararDatosTrabajadorEditar } from "./store/StoreTrabajadores";

const Trabajadores = () => {
  const {
    cedulaAplicado,
    nombreAplicado,
    activoAplicado,
    fechaIngresoIniAplicado,
    fechaIngresoFinAplicado,
    empresaAplicada,
  } = useFiltrosTrabStore(
    useShallow((state) => ({
      cedulaAplicado: state.cedulaAplicado,
      nombreAplicado: state.nombreAplicado,
      activoAplicado: state.activoAplicado,
      fechaIngresoIniAplicado: state.fechaIngresoIniAplicado,
      fechaIngresoFinAplicado: state.fechaIngresoFinAplicado,
      empresaAplicada: state.empresaAplicada,
    }))
  );

  const { accesos } = usePermisos();

  const [trabajadores, setTrabajadores] = useState(trabajadoresIniciales);

  const agregarTrabajador = (nuevoTrabajador: TrabajadoresType) => {
    setTrabajadores((prev) => [...prev, nuevoTrabajador]);
  };

  const editarTrabajadorExistente = (
    trabajadorActualizado: TrabajadoresType
  ) => {
    setTrabajadores((prev) =>
      prev.map((t) =>
        t.cedula === trabajadorActualizado.cedula ? trabajadorActualizado : t
      )
    );
  };

  const [estados, setEstados] = useState({
    filtrar: false,
    editarTrabajador: false,
    crearTrabajador: false,
    idEmpresa: "",
    idGrupoEmpresarial: "",
    cargarTrabajadores: false,
    editarProps: {
      idTrabajador: "",
    },
  });

  // const iniciarTour = useTourGuiado(GENERAL_TRABAJADORES_TOUR);

  const trabajadoresFiltrados = trabajadores.filter((t) => {
    const coincideCedula = cedulaAplicado
      ? t.cedula.includes(cedulaAplicado)
      : true;

    const coincideEmpresa = empresaAplicada
      ? t.empresa.toLowerCase().includes(empresaAplicada.toLowerCase())
      : true;

    const coincideNombre = nombreAplicado
      ? t.nombre.toLowerCase().includes(nombreAplicado.toLowerCase())
      : true;

    const coincideActivo =
      activoAplicado !== undefined ? t.activo === activoAplicado : true;

    const fechaIngreso = new Date(t.fechaIngresoCargo).getTime();
    const fechaInicioFiltro = fechaIngresoIniAplicado
      ? new Date(fechaIngresoIniAplicado).getTime()
      : null;
    const fechaFinFiltro = fechaIngresoFinAplicado
      ? new Date(fechaIngresoFinAplicado).getTime()
      : null;

    const coincideFechas =
      (!fechaInicioFiltro || fechaIngreso >= fechaInicioFiltro) &&
      (!fechaFinFiltro || fechaIngreso <= fechaFinFiltro);

    return (
      coincideCedula &&
      coincideNombre &&
      coincideEmpresa &&
      coincideActivo &&
      coincideFechas
    );
  });

  const filtros = {
    activo: filtrosInfo(
      activoAplicado ? "activo" : "inactivo",
      activoAplicado ? "trabajador activo" : "trabajador inactivo"
    ),
    cedula: filtrosInfo(cedulaAplicado, "cédula"),
    fechaIngreso: filtrosInfo(
      fechaIngresoIniAplicado || fechaIngresoFinAplicado,
      "fecha de ingreso"
    ),
    nombre: filtrosInfo(nombreAplicado, "nombre"),
    cargo: filtrosInfo(empresaAplicada, "empresa"),
  };

  return (
    <>
      <h1 className="titulo_modulos">Trabajadores</h1>

      <div className={styles.contenedor_botones}>
        <div className={styles.acciones_principales}>
          <Button
            icon="new"
            name="Crear trabajador"
            sizeBtn="small"
            type="button"
            typeBtn="primary"
            permiso="escribir"
            id="crear-trabajador"
            permisos={accesos.trabajadores}
            onClick={() => setEstados({ ...estados, crearTrabajador: true })}
          />
          <Button
            icon="import"
            name="Importar trabajadores"
            sizeBtn="small"
            type="button"
            typeBtn="import"
            id="importar-trabajadores"
            permisos={accesos.trabajadores}
            onClick={() => setEstados({ ...estados, cargarTrabajadores: true })}
          />
          <Button
            icon="update"
            name="Actualizar tabla"
            sizeBtn="small"
            type="button"
            typeBtn="pendings"
            id="refrescar-tabla"
            permisos={accesos.trabajadores}
          />
        </div>
        <div className={styles.boton_instructivos}>
          {/* <Button
            name="Instructivo"
            type="button"
            sizeBtn="small"
            typeBtn="primary"
            icon="new"
            permiso="escribir"
            permisos={accesos.trabajadores}
            onClick={iniciarTour}
          /> */}
          <Button
            icon="filter"
            name="Filtros"
            sizeBtn="normal"
            type="button"
            typeBtn="filter"
            permiso="escribir"
            id="filtro-trabajadores"
            permisos={accesos.trabajadores}
            onClick={() => setEstados({ ...estados, filtrar: true })}
          />
        </div>
      </div>
      <div className={styles.frase_filtro}>
        <p>{filtrosAplicados(filtros)}</p>
      </div>
      <Tabla
        id="tabla_trabajadores"
        tableData={trabajadoresFiltrados}
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
              label: "Empresa",
              key: "empresa",
              styleConfig: { textAlign: "start", color: "var(--brand-1)" },
              rowStyleConfig: { textAlign: "start" },
            },
            {
              label: "Gerencia",
              key: "gerencia",
              styleConfig: { textAlign: "center", color: "var(--brand-1)" },
              rowStyleConfig: { textAlign: "center" },
            },
            {
              label: "Área",
              key: "area",
              styleConfig: { textAlign: "center", color: "var(--brand-1)" },
              rowStyleConfig: { textAlign: "center" },
            },
            {
              label: "Empresa",
              key: "empresa",
              styleConfig: { textAlign: "start", color: "var(--brand-1)" },
              rowStyleConfig: { textAlign: "start" },
            },
          ],
        }}
        controls={[
          {
            tooltip: "Editar trabajador",
            id: "editar-trabajador",
            icon: <IconoEditar />,
            event: (e: any) => {
              if (!e.data) return;

              prepararDatosTrabajadorEditar(e.data);
              setEstados({
                ...estados,
                editarTrabajador: true,
                editarProps: {
                  idTrabajador: e.data.cedula,
                },
              });
            },
          },
        ]}
      />

      <Condicional condicion={estados.crearTrabajador}>
        <CrearTrabajador
          cerrar={() => setEstados({ ...estados, crearTrabajador: false })}
          agregarTrabajador={agregarTrabajador}
        />
      </Condicional>

      <Condicional condicion={estados.editarTrabajador}>
        <EditarTrabajador
          idTrabajador={estados.editarProps.idTrabajador}
          cerrar={() => setEstados({ ...estados, editarTrabajador: false })}
          actualizarTrabajador={editarTrabajadorExistente}
        />
      </Condicional>

      <Condicional condicion={estados.filtrar}>
        <FiltrosTrabajador
          cerrar={() => setEstados({ ...estados, filtrar: false })}
        />
      </Condicional>

      <Condicional condicion={estados.cargarTrabajadores === true}>
        <CargarTrabajadores
          titulo="Cargue de Trabajadores"
          close={() => setEstados({ ...estados, cargarTrabajadores: false })}
          rutaStorage="empresas/trabajadores"
          archivosCargados={(e) => {
            if (e.length > 0) {
              toast("Se han cargado los trabajadores");
            }
          }}
        />
      </Condicional>
    </>
  );
};

export default Trabajadores;
