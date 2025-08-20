import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from 'app/comunes/controles/Buttons';
import FormModal from 'app/comunes/funcionales/forms/Form';

import type { AprobarElementosProps, CorreoParametros } from '../types/Types';

import correrMicroservicio from '../../../../../cloud_functions/CorrerInforme';
import { APP_URL } from '../constantes/ConstGenerales';
import estilos from '../estilos/EntregaElementosEPP.module.css';
import { reiniciarEPP } from '../store/StoreEpp';
import { actualizarEstado } from '../store/StoreEppTabla';
import FormularioAprobacionEPP from './componentes/FormularioAprobacionEPP';

const AprobarElementosEPP = ({
  cerrar,
  cedulaTrabajador,
}: AprobarElementosProps) => {
  const [estado, setEstado] = useState('aprobado');

  const enviarCorreo = (correo: string) =>
    toast.promise(
      correrMicroservicio<CorreoParametros>('correoElementos', {
        correo,
        enlace: `${APP_URL}/ordenes-entrega`,
      }),
      {
        loading: 'Enviando correo...',
        success: () => {
          return 'Se ha enviado el correo al proveedor';
        },
        error: (err) => `Error al enviar correo: ${err}`,
      }
    );

  function cambiarEstado(estado: string) {
    setEstado(estado);
    actualizarEstado(cedulaTrabajador, estado);
  }

  return (
    <FormModal
      tittle='Aprobaciones de elementos de protección'
      close={() => {
        cerrar();
        reiniciarEPP();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        toast.success(`Se ha ${estado} la solicitud de epp con éxito`);

        // if (estado === 'aprobado')
        //   enviarCorreo('laura.gomez@pcsoluciones.com.co');

        reiniciarEPP();
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
            cambiarEstado('rechazado');
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
            cambiarEstado('aprobado');
          }}
        />,
      ]}
    >
      <main className={estilos.contenedor}>
        <FormularioAprobacionEPP cedulaTrabajador={cedulaTrabajador} />
      </main>
    </FormModal>
  );
};

export default AprobarElementosEPP;
