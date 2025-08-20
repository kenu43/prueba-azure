import { useQuery } from '@apollo/client';
import { useMediaQuery } from '@uidotdev/usehooks';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import useArrastreCerrar from 'app/hooks/ManejoArrastreTouch';
import usePermisos from 'app/hooks/Permisos';
import { MODULOS_ACCESO } from 'app/interfaz/dashboard/peticiones/Queries';

import type { ModuloType } from '../types/SidebarTypes';

import estilos from '../estilos/EstBarraLateralModulos.module.css';
import { ChevronDown, ChevronUp, IconoBarraLateral } from '../recursos/Iconografia';
import ListaModulos from './ListaModulos';

const GRUPO_DE_MODULO: Record<string, string> = {
  trabajadores: 'Trabajadores',
  epp: 'Elementos',
  dotacion: 'Elementos',
  recomendacionesMedicas: 'Recomendaciones médicas',
  cargueMasivoLaboral: 'Recomendaciones médicas',
  cargueMasivoComun: 'Recomendaciones médicas',
  reporteCondicionesSalud: 'Recomendaciones médicas',
  ordenesEntrega: 'Proveedores',
};

const AppModulos = () => {
  const { data } = useQuery(MODULOS_ACCESO);
  const { accesoModulos } = usePermisos();
  const { pathname } = useLocation();

  const esTablet = useMediaQuery('only screen and (max-width: 1100px)');
  const esMovil = useMediaQuery('only screen and (max-width: 600px)');

  const [barraAbierta, setBarraAbierta] = useState(false);
  const [pestañasAbiertas, setPestañasAbiertas] = useState<
    Record<string, boolean>
  >({});
  const abrirBarra = useCallback(() => setBarraAbierta(true), []);
  const cerrarBarra = useCallback(() => setBarraAbierta(false), []);
  useEffect(() => {
    if (!esTablet) {
      const id = setTimeout(() => {
        setBarraAbierta(true);
      }, 120);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [esTablet]);

  useEffect(() => {
    if (!esTablet) {
      const id = setTimeout(abrirBarra, 120);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [esTablet, abrirBarra]);

  /**
   * Agrupa los módulos activos por su categoría utilizando un Map.
   *
   * Esta función memorizada procesa los módulos obtenidos de los datos de configuración
   * y los organiza en grupos basados en el mapeo GRUPO_DE_MODULO.
   * Solo los módulos activos y permitidos por los permisos del usuario son incluidos en la agrupación.
   * Si un módulo no tiene un grupo definido en el mapeo, se coloca en 'Otros'.
   *
   * @returns Un array de tuplas, donde cada tupla contiene un nombre de grupo y un array de módulos en ese grupo
   * @example
   * // Devuelve algo como:
   * // [
   * //   ['Administración', [modulo1, modulo2]],
   * //   ['Reportes', [modulo3]],
   * //   ['Otros', [modulo4, modulo5]]
   * // ]
   */
  const grupoModulos = useMemo(() => {
    const modulosQuery = data?.getConfiguraciones?.modulos ?? [];

    const modulosActivos = modulosQuery.filter((mod: any) => mod.estaActivo);

    const modulosPermitidos = modulosActivos.filter((modulo: any) =>
      accesoModulos.includes(modulo.llaveModulo),
    );

    const mapa = new Map<string, ModuloType[]>();

    modulosPermitidos.forEach((mod: any) => {
      const grupo = GRUPO_DE_MODULO[mod.llaveModulo] ?? 'Otros';
      if (!mapa.has(grupo))
        mapa.set(grupo, []);
      mapa.get(grupo)!.push(mod);
    });

    return Array.from(mapa.entries()) as [string, ModuloType[]][];
  }, [data, accesoModulos]);

  const arrastre = useArrastreCerrar(esMovil && barraAbierta, cerrarBarra);

  return (
    <>
      {esTablet && (
        <div
          className={`${estilos.overlay} ${
            barraAbierta ? estilos.abierto : ''
          }`}
          aria-hidden={!barraAbierta}
          onClick={cerrarBarra}
        />
      )}

      <aside
        className={`${estilos.barra_lateral} ${
          barraAbierta ? estilos.abierta : estilos.cerrada
        }`}
        aria-label="Barra lateral de módulos"
        style={
          esMovil && barraAbierta
            ? { transform: `translateY(${arrastre.desplazamiento}px)` }
            : undefined
        }
        onPointerDown={arrastre.bajar}
        onPointerMove={arrastre.mover}
        onPointerUp={arrastre.subir}
      >
        <div className={estilos.cabecera}>
          <p className={estilos.titulo}>Módulos</p>
          <button
            type="button"
            className={estilos.boton_alternar}
            aria-label={barraAbierta ? 'Cerrar barra lateral' : 'Abrir barra lateral'}
            onClick={barraAbierta ? cerrarBarra : abrirBarra}
          >
            <IconoBarraLateral className={estilos.icono_alternar} />
          </button>
        </div>

        <nav className={estilos.contenido}>
          {grupoModulos.map(([nombre, modulos]) => {
            const abierta = pestañasAbiertas[nombre] ?? true;
            const activa = modulos.some(m => pathname.startsWith(m.url));

            return (
              <div
                key={nombre}
                className={`${estilos.grupo} ${
                  activa ? estilos.grupo_activo : ''
                }`}
              >
                <button
                  type="button"
                  className={estilos.encabezado}
                  onClick={() =>
                    setPestañasAbiertas(p => ({
                      ...p,
                      [nombre]: !abierta,
                    }))}
                >
                  <span
                    className={`${estilos.etiqueta} ${
                      activa ? estilos.etiqueta_activa : ''
                    }`}
                  >
                    {nombre}
                  </span>
                  {abierta
                    ? (
                        <ChevronUp
                          className={`${estilos.chevron} ${
                            activa ? estilos.chevron_activo : ''
                          }`}
                        />
                      )
                    : (
                        <ChevronDown
                          className={`${estilos.chevron} ${
                            activa ? estilos.chevron_activo : ''
                          }`}
                        />
                      )}
                </button>

                <div
                  className={estilos.contenedor_lista}
                  style={{ maxHeight: abierta ? '400px' : 0 }}
                >
                  <ListaModulos modulos={modulos} visible={abierta} />
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      {esTablet && (
        <div className={estilos.contenedor_botones}>
          <button
            type="button"
            className={estilos.boton_mobile_abrir}
            onClick={abrirBarra}
          >
            Módulos
            {' '}
            <IconoBarraLateral className={estilos.icono_alternar} />
          </button>
        </div>
      )}
    </>
  );
};

export default AppModulos;
