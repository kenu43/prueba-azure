import { nanoid } from 'nanoid';

import type { ITablaProps } from './types/TablaTypes';

import styles from './estilos/EstilosTablas.module.css';
import FilaDatos from './secciones/FilaDatos';

const TablaNumericaSinTotal = ({
  encabezados,
  contenido,
  titulo,
  style,
}: ITablaProps) => {
  return (
    <table style={style} className={styles.table_container}>
      <caption className={styles.title}>{titulo}</caption>
      <thead>
        <tr className={styles.table_row_container}>
          {encabezados.map(nombre => (
            <th key={nanoid()}>{nombre}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {contenido.map((dato) => {
          return (
            <tr
              className={styles.table_data_container_sin_total}
              key={nanoid()}
            >
              <td>{dato.categoria}</td>
              <FilaDatos datos={dato.datos} />
            </tr>
          );
        })}
      </tbody>

      {/* <Totales contenido={contenido} /> */}
    </table>
  );
};

export default TablaNumericaSinTotal;
