import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { TableContext } from '../contexto/CtxTable';
import {
  ColumnName,
  ColumnStyle,
  ContainerHeader,
  HeadersStyle,
} from '../estilos/StyleHeaders';

const Headers = () => {
  const { state } = useContext(TableContext);

  return (
    <ContainerHeader>
      {/* <ConfigSection>
        <ConfigButton>
          <Icon>{icons.search.path}</Icon>
        </ConfigButton>
        <ConfigButton>
          <Icon>{icons.columns.path}</Icon>
        </ConfigButton>
        <Button
          type='button'
          name='Excel'
          icon='download'
          sizeBtn='small'
          typeBtn='download'
          permisos={[]}
        />
      </ConfigSection> */}
      <HeadersStyle
        numColumns={
          state?.Tableconfig?.columnWidth ??
          `repeat(${Number(state?.tableColumns.length) + 1}, 1fr)`
        }
      >
        {state?.tableColumns.map((data, index) => (
          <ColumnStyle
            key={nanoid(7)}
            aligment={state.tableColumns[index].styleConfig?.aligment}
          >
            <ColumnName>{data.label}</ColumnName>
          </ColumnStyle>
        ))}
      </HeadersStyle>
    </ContainerHeader>
  );
};

export default Headers;
