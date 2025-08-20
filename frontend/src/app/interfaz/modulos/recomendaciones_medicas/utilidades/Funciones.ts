export const obtenerLabelPorValue = (
  value: string,
  listado: { value: string; label: string }[],
): string => {
  const opcion = listado.find(op => op.value === value);
  return opcion ? opcion.label : '';
};
