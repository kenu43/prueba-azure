import Condicional from 'comunes/funcionales/Condicional';
import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { TableContext } from '../../contexto/CtxTable';
import { Controls, RowContainer } from '../../estilos/StyleData';
import { Icon, IconContainer, TooltipIcon } from '../../estilos/StyleTable';
import { ControlsType } from '../../types/TableTypes';

const DataRows = ({
  options,
  index,
}: {
  options: ControlsType;
  index: number;
}) => {
  const { state } = useContext(TableContext);

  return (
    <>
      {state?.tableColumns?.map((rowName) => (
        <RowContainer key={nanoid(5)} aligment={rowName.styleConfig?.aligment}>
          {state.tableData[index][rowName.key]}
        </RowContainer>
      ))}
      <Controls>
        {options.map(
          ({ tooltipo, icon, event, columnName, style, isvisible = true }) => (
            <Condicional condicion={isvisible}>
              <IconContainer key={nanoid(7)}>
                <Icon
                  style={style}
                  role='button'
                  onClick={() =>
                    event(
                      columnName
                        ? state?.tableData?.[index]?.[columnName] ??
                            'Without params'
                        : state?.tableData?.[index] ?? 'Without params'
                    )
                  }
                >
                  {icon}
                </Icon>
                <Condicional condicion={!!tooltipo}>
                  <TooltipIcon>{tooltipo}</TooltipIcon>
                </Condicional>
              </IconContainer>
            </Condicional>
          )
        )}
      </Controls>
    </>
  );
};

export default DataRows;
