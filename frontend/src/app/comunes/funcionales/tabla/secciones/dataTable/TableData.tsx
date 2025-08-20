import { nanoid } from 'nanoid';
import { useContext, useEffect } from 'react';

import { TableContext } from '../../contexto/CtxTable';
import {
  ContainerColumns,
  ContainerData,
  ImgSinDatos,
} from '../../estilos/StyleData';
import SinDatos from '../../recursos/SinDatos.gif';
import { TableDataProps } from '../../types/TableTypes';
import DataRows from './DataRows';

const TableData = ({ config, controls }: TableDataProps) => {
  const { state, dispatch } = useContext(TableContext);
  const limits = {
    first: state?.pagination?.first,
    last: state?.pagination?.last,
  };

  useEffect(() => {
    dispatch!({ type: 'configurations', payload: config });
  }, [config]);

  let DatosComponet = () =>
    state?.tableData?.slice(limits.first, limits.last).map((_, idxPosi) => (
      <ContainerColumns
        numColumns={
          state?.Tableconfig?.columnWidth ??
          `repeat(${Number(state?.tableColumns.length) + 1}, 1fr)`
        }
        key={nanoid(7)}
      >
        <DataRows options={controls} index={Number(limits.first) + idxPosi} />
      </ContainerColumns>
    ));
  if (state?.tableData.length === 0) {
    DatosComponet = () => [
      <ImgSinDatos
        src={SinDatos}
        alt='No se pudo cargar datos'
        key='SinDatos'
      />,
    ];
  }

  return <ContainerData>{DatosComponet()!}</ContainerData>;
};

export default TableData;
