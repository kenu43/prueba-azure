import { NavLink } from 'react-router-dom';

import type { PropsListaModulos } from '../types/SidebarTypes';

import { MapeoNombreIconoModulo } from '../constantes/ConstGenerales';
import estilos from '../estilos/EstBarraLateralModulos.module.css';
import { iconografia } from '../recursos/Iconografia';

/**
 * Componente que renderiza una lista de módulos como enlaces de navegación.
 *
 * @component
 * @param {object} props - Las propiedades del componente
 * @param {Array} props.modulos - Arreglo de módulos a mostrar
 * @param {boolean} props.visible - Indica si la lista debe mostrarse como abierta/visible
 * @returns {JSX.Element} Un elemento ul que contiene enlaces de navegación para cada módulo
 *
 * Cada módulo se renderiza como un elemento de lista con:
 * - Un NavLink que apunta a la URL del módulo
 * - Un icono determinado desde MapeoNombreIconoModulo usando la llave del módulo
 * - El título del módulo o un alias si está definido
 * - Estilo que indica cuando un módulo es la ruta activa
 */
const ListaModulos = ({ modulos, visible }: PropsListaModulos) => {
  return (
    <ul className={`${estilos.lista} ${visible ? estilos.lista_abierta : ''}`}>
      {modulos.map((m) => {
        const config
          = MapeoNombreIconoModulo[m.llaveModulo as keyof typeof MapeoNombreIconoModulo] ?? {};
        const nombreIcono = (config).icono;
        const alias = (config).alias;

        const textoVisible = alias ?? m.titulo;

        return (
          <li key={m.llaveModulo}>
            <NavLink
              to={m.url}
              end
              className={({ isActive }) =>
                `${estilos.enlace} ${isActive ? estilos.activo : ''}`}
            >
              <span className={estilos.icono} aria-hidden="true" style={{ marginLeft: '4px' }}>
                {iconografia[nombreIcono as keyof typeof iconografia]?.path}
              </span>
              <span className={estilos.texto}>{textoVisible}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default ListaModulos;
