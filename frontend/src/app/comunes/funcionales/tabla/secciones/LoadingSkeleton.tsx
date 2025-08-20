import {
  ContainerColumns,
  ContainerData,
  LoadingTable,
} from '../estilos/StyleData';
import { ConfigDataType } from '../types/ContextType';

const LoadingSkeleton = ({ config }: { config: ConfigDataType }) => {
  const { tableColumns } = config;
  const dataRowLoading = Array.from({ length: 8 }, (_, idx) => idx);
  const dataColumLoading = Array.from(
    { length: tableColumns.length + 1 },
    (_, idx) => idx
  );

  return (
    <ContainerData>
      {dataRowLoading.map((k) => (
        <ContainerColumns
          numColumns={
            config.Tableconfig?.columnWidth ??
            `repeat(${Number(config?.tableColumns.length) + 1}, 1fr)`
          }
          key={k}
        >
          {dataColumLoading.map((item) => (
            <LoadingTable key={item} />
          ))}
        </ContainerColumns>
      ))}
    </ContainerData>
  );
};

export default LoadingSkeleton;
