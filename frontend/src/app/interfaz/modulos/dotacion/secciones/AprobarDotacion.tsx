import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from 'app/comunes/controles/Buttons';
import FormModal from 'app/comunes/funcionales/forms/Form';

import type { AprobarElementosProps } from '../types/Types';

import estilos from '../estilos/EntregaElementosEPP.module.css';
import { reiniciarDotacion } from '../store/StoreDotacion';
import FormularioEntregaDotaciones from './componentes/FormularioEntregaDotaciones';

const AprobarDotacion = ({ cerrar }: AprobarElementosProps) => {
  const [estado, setEstado] = useState('aprobado');

  return (
    <FormModal
      tittle='Aprobaciones de elementos de protección'
      close={() => {
        cerrar();
        reiniciarDotacion();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        toast.success(`Se ha ${estado} la solicitud de epp con éxito`);
        reiniciarDotacion();
        cerrar();
      }}
      buttons={[
        <Button
          key='guardar'
          name='Guardar'
          sizeBtn='small'
          typeBtn='primary'
          icon='new'
          permisos={['crear']}
          permiso=''
          type='submit'
          onClick={() => {
            setEstado('actualizado');
          }}
        />,

        <Button
          key='rechazar'
          name='Rechazar'
          sizeBtn='small'
          typeBtn='delete'
          icon='none'
          permisos={['leer']}
          permiso=''
          type='submit'
          onClick={() => {
            setEstado('rechazado');
          }}
        />,
        <Button
          key='aprobar'
          name='Aprobar'
          sizeBtn='small'
          typeBtn='download'
          icon='none'
          permisos={['leer']}
          permiso=''
          type='submit'
          onClick={() => {
            setEstado('aprobado');
          }}
        />,
      ]}
    >
      <main className={estilos.contenedor}>
        <FormularioEntregaDotaciones />
      </main>
    </FormModal>
  );
};

export default AprobarDotacion;
