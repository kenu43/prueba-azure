import { useContext, useEffect } from 'react';
import Condicional from 'comunes/funcionales/Condicional';
import { Avisos } from 'comunes/estilos/EstComunes';

import { ModalFilterProps } from '../types/FiltrosTypes';
import { CtxFiltros } from '../contextos/CtxFiltro';
import Botones from './Botones';

import {
  Body,
  ContenedorFiltro,
  ContenedorFiltroGeneral,
  Header,
} from '../estilos/EstilosFiltro';

const GeneralFiltro = ({
  nota,
  children,
  functions,
  pageDates,
}: ModalFilterProps) => {
  const [{ pagina }, dispatch] = useContext(CtxFiltros);
  const child = Array.isArray(children) ? children[pagina] : children;

  useEffect(() => {
    dispatch({
      type: 'INICIALIZAR',
      name: '',
      payload: {
        nPages: Array.isArray(children) ? children.length : 1,
        pageFecha: pageDates,
      },
    });
  }, [children]);

  return (
    <ContenedorFiltroGeneral id='filtro'>
      <Botones functions={functions} />
      <ContenedorFiltro>
        <Header>Filtros dispobibles</Header>
        <Condicional condicion={!!nota}>
          <Avisos
            style={{ padding: 'var(--space-fluid-3)' }}
            fontColor='informacion'
          >
            {nota}
          </Avisos>
        </Condicional>
        <Body>{child}</Body>
      </ContenedorFiltro>
    </ContenedorFiltroGeneral>
  );
};

export default GeneralFiltro;
