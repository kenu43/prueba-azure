import { nanoid } from 'nanoid';

import type { ITablaProps } from './types/TablaTypes';

import styles from './estilos/EstilosTablas.module.css';
import FilaDatos from './secciones/FilaDatos';
import Totales from './secciones/Totales';

const TablaNumerica = ({
  encabezados,
  contenido,
  titulo,
  mostrarTotal = true, // Valor por defecto
  style,
}: ITablaProps) => {
  return (
    <table style={style} className={styles.table_container}>
      {titulo && <caption className={styles.title}>{titulo}</caption>}
      <thead>
        <tr className={styles.table_row_container}>
          {encabezados.map(nombre => (
            <th key={nanoid()}>{nombre}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {contenido.length > 0 ? (
          contenido.map(dato => (
            <tr className={styles.table_data_container} key={nanoid()}>
              <td>{dato.categoria}</td>
              <FilaDatos datos={dato.datos} />
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={encabezados.length} style={{ textAlign: 'center' }}>
              {/* No hay datos disponibles. */}
            </td>
          </tr>
        )}
      </tbody>

      {/* Se renderiza Totales solo si mostrarTotal es true */}
      {mostrarTotal && contenido.length > 0 && (
        <Totales contenido={contenido} />
      )}
    </table>
  );
};

export default TablaNumerica;
