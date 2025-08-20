import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

import { Button } from 'comunes/controles/Buttons';
import FormModal from 'comunes/funcionales/forms/Form';

import estilos from '../estilos/EstFormulario.module.css';
import { useTrabajadoresTextoStore } from '../store/StoreMensajes';
import { prepararDatosTrabajador, reiniciarDatosTrabajador, useTrabajadoresStore } from '../store/StoreTrabajadores';
import Ocupacional from './componentes/crear/Ocupacional';
import Sociodemografico from './componentes/crear/Sociodemografico';

const CrearTrabajador = ({ cerrar, agregarTrabajador }: { cerrar: () => void; agregarTrabajador: (nuevo: any) => void }) => {
  const { tipoCargo, genero } = useTrabajadoresStore(
    useShallow(({ tipoCargo, genero }) => ({ tipoCargo, genero })),
  );

  const crearTrabajador = () => {
    const nuevo = prepararDatosTrabajador();

    if (!genero) {
      toast.info('No ha registrado el género');
      return;
    }

    if (!tipoCargo) {
      toast.info('No ha registrado el tipo de cargo');
    }

    agregarTrabajador(nuevo);
    toast.success('Se guardó el trabajador con éxito');
    cerrar();
  };

  return (
    <FormModal
      tittle="Crear un trajabador"
      close={() => {
        cerrar();
        reiniciarDatosTrabajador();
        useTrabajadoresTextoStore.getState().reiniciarTocoNacimiento();
        useTrabajadoresTextoStore.getState().reiniciarTocoIngreso();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        crearTrabajador();
      }}
      buttons={[
        <Button
          key="button-1"
          icon="new"
          name="Crear trabajador"
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
        <Sociodemografico />
        <Ocupacional />
      </main>
    </FormModal>
  );
};

export default CrearTrabajador;
