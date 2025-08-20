import { nanoid } from 'nanoid';

import type { IdatosProps } from '../types/TablaTypes';

import styles from '../estilos/EstilosTablas.module.css';
import useTablaDatos from '../hooks/TablaHooks';

const Totales = ({ contenido }: IdatosProps) => {
  const { totales } = useTablaDatos({ contenido });

  return (
    <tfoot>
      <tr className={styles.table_foot_container}>
        <td>Total</td>
        {totales.map(total => (
          <td key={nanoid()}>{total}</td>
        ))}
      </tr>
    </tfoot>
  );
};

export default Totales;
