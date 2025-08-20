import type { ArgColumnsType } from '../types/StyleTypes';

export const generateColumnsWidth = ({
  configColumns,
}: ArgColumnsType): string => {
  return (
    configColumns
      ?.map(
        columna =>
          `${
            columna?.styleConfig?.columnWidth
              ? columna?.styleConfig?.columnWidth
              : 1
          }fr`,
      )
      ?.concat('1fr')
      .join(' ')
      ?.toString() ?? ''
  );
};
