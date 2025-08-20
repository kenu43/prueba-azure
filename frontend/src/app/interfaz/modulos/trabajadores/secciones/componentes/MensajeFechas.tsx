import type { MensajeFechasProps } from 'modulos/trabajadores/types/TrabajadoresTypes';

import estilos from '../../estilos/EstFormulario.module.css';

const MensajeFechas = ({ cumple, noCumple, condicion }: MensajeFechasProps) => {
  const texto = condicion ? cumple : noCumple;

  return (
    <p
      className={`${estilos.texto_fecha} ${
        condicion ? estilos.cumple : estilos.no_cumple
      }`}
    >
      {texto}
    </p>
  );
};

export default MensajeFechas;
