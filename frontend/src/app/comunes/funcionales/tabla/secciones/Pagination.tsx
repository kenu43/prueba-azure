import { memo, useContext } from 'react';
import { TableContext } from '../contexto/CtxTable';
import {
  ControlPageContainer,
  NumPage,
  PagContainer,
  PagContent,
} from '../estilos/StylePag';
import { Icon } from '../estilos/StyleTable';

import Condicional from 'comunes/funcionales/Condicional';
import { icons } from '../recursos/Icons';
import { PaginationFunction } from '../recursos/Pagination';

const Pagination = memo(() => {
  const { state, dispatch } = useContext(TableContext);
  const numPages = Math.ceil(state?.tableData.length! / 10);
  const docs = Intl.NumberFormat('de-DE').format(state?.tableData.length!);

  return (
    <PagContainer>
      <ControlPageContainer>
        <PagContent
          style={{ padding: 'var(--space-fluid-2)' }}
        >{`Documentos: ${docs}`}</PagContent>
      </ControlPageContainer>
      <ControlPageContainer>
        <Condicional condicion={state?.pagination?.first! >= 2}>
          <Icon
            onClick={() => {
              dispatch!({
                type: 'pagination',
                payload: PaginationFunction({
                  eventType: 'previous',
                  actualpage: state?.pagination,
                }),
              });
            }}
          >
            {icons.prevPage.path}
          </Icon>
        </Condicional>
        <PagContent>
          {`Página ${state?.pagination?.actual!} de ${numPages}`}
        </PagContent>
        <Condicional condicion={state?.pagination?.actual !== Number(numPages)}>
          <Icon
            onClick={() => {
              dispatch!({
                type: 'pagination',
                payload: PaginationFunction({
                  eventType: 'next',
                  actualpage: state?.pagination,
                }),
              });
            }}
          >
            {icons.nextPage.path}
          </Icon>
        </Condicional>
      </ControlPageContainer>
      <ControlPageContainer>
        <NumPage
          type='number'
          value={state?.pagination?.actual}
          min={1}
          max={state?.tableData.length!}
        />
        <Icon>{icons.resetPage.path}</Icon>
      </ControlPageContainer>
    </PagContainer>
  );
});

export default Pagination;
