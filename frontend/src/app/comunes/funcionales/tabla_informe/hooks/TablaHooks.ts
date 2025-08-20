import type { IdatosProps } from '../types/TablaTypes';

type hookReturn = {
  totales: number[];
};

const useTablaDatos = ({ contenido }: IdatosProps): hookReturn => {
  const numColumnas = contenido[0].datos.length;

  const inicializarArray = (): number[] => {
    const array = [0];
    for (let i = 1; i < numColumnas; i++) {
      array.push(0);
    }
    return array;
  };

  const totales = inicializarArray();

  contenido.forEach((info) => {
    for (let i = 0; i < numColumnas - 1; i++) {
      totales[i] = totales[i] + info.datos[i];
    }

    totales[numColumnas - 1] = 100;
  });

  return { totales };
};

export default useTablaDatos;
