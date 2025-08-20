import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

import { Button } from 'comunes/controles/Buttons';
import FormModal from 'comunes/funcionales/forms/Form';

import type { EditarTrabajadorProps } from '../types/TrabajadoresTypes';

import estilos from '../estilos/EstFormulario.module.css';
import {
  prepararDatosTrabajador,
  reiniciarDatosTrabajador,
  useTrabajadoresStore,
} from '../store/StoreTrabajadores';
import EditarOcupacional from './componentes/editar/EditarOcupacional';
import EditarSociodemografico from './componentes/editar/EditarSociodemografico';

const EditarTrabajador = ({
  cerrar,
  actualizarTrabajador,
}: EditarTrabajadorProps) => {
  const { tipoCargo, genero } = useTrabajadoresStore(
    useShallow(({ tipoCargo, genero }) => ({ tipoCargo, genero })),
  );

  const handleActualizar = () => {
    if (!genero) {
      toast.info('No ha registrado el género');
      return;
    }

    if (!tipoCargo) {
      toast.info('No ha registrado el tipo de cargo');
      return;
    }

    const datosFinales = prepararDatosTrabajador();
    actualizarTrabajador(datosFinales);
    toast.success('Se editó el trabajador correctamente');
    cerrar();
  };

  return (
    <FormModal
      tittle="Editar información"
      close={() => {
        cerrar();
        reiniciarDatosTrabajador();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleActualizar();
      }}
      buttons={[
        <Button
          key="button-1"
          icon="new"
          name="Guardar cambios"
          sizeBtn="normal"
          type="submit"
          id="guardar-edicion"
          typeBtn="primary"
          permisos={['escribir']}
          permiso="escribir"
        />,
      ]}
    >
      <main className={estilos.contenedor}>
        <EditarSociodemografico />
        <EditarOcupacional />
      </main>
    </FormModal>
  );
};

export default EditarTrabajador;
