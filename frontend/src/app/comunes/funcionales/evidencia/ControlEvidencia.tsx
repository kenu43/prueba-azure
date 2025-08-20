import { Button } from 'comunes/controles/Buttons';
import { useState } from 'react';
import Condicional from '../Condicional';
import { DivEvidencia, InputOculto, Label } from './estilos/EstilosEvidencia';
import CargarArchivos from './secciones/ModalEvidencias';
import { EvidenciasPropsType } from './types/EvidenciasTypes';

const ControlEvidencia = ({
  evidencia,
  required,
  disabled,
  usuario,
  permisos,
  verTodo,
  campo = 'evidencias',
  ruta,
  index,
  name,
  onChange,
  accept,
}: EvidenciasPropsType) => {
  const [modal, setModal] = useState<boolean>(false);
  const numEvidencias = evidencia?.[campo]?.length ?? 0;

  const buttonName = name || 'Cargar evidencia';

  return (
    <>
      <DivEvidencia required={required} evidencia={numEvidencias}>
        <Label>Evidencias: {numEvidencias}</Label>
        <Condicional condicion={required}>
          <InputOculto required value={numEvidencias} onChange={() => {}} />
        </Condicional>
        <Button
          icon='import'
          typeBtn='import'
          name={disabled ? 'Ver evidencia' : buttonName}
          sizeBtn='normal'
          type='button'
          permisos={permisos}
          onClick={() => setModal(!modal)}
        />
      </DivEvidencia>

      <Condicional condicion={modal}>
        <CargarArchivos
          close={() => setModal(false)}
          disabled={disabled}
          permisos={permisos}
          evidencia={evidencia}
          ruta={ruta}
          onChange={onChange}
          usuario={usuario}
          index={index}
          campo={campo}
          verTodo={verTodo}
          accept={accept}
        />
      </Condicional>
    </>
  );
};

export default ControlEvidencia;
