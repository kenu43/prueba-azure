import AppError from 'comunes/informativos/Error';
import CtxTabla from './contexto/CtxTable';
import { ContainerTable } from './estilos/StyleTable';

import TableData from './secciones/dataTable/TableData';
import Headers from './secciones/Headers';
import LoadingSkeleton from './secciones/LoadingSkeleton';
import Pagination from './secciones/Pagination';

import { TableConfigType } from './types/TableTypes';

const Table = ({
  configurations,
  loading,
  error,
  controls,
}: TableConfigType) => {
  if (error) return <AppError error={error} />;
  if (loading) return <LoadingSkeleton config={configurations} />;

  return (
    <CtxTabla>
      <ContainerTable>
        <Headers />
        <TableData config={configurations} controls={controls} />
        <Pagination />
      </ContainerTable>
    </CtxTabla>
  );
};

export default Table;
