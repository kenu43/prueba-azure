import { useState } from 'react';
import { toast } from 'sonner';

import SearchComponent from 'app/comunes/controles/buscador/SearchComponent';
import { Button } from 'app/comunes/controles/Buttons';
import Condicional from 'app/comunes/funcionales/Condicional';
import FormModal from 'app/comunes/funcionales/forms/Form';

import { guardarTrabajador } from '../../epp/store/StoreEpp';
import estilos from '../estilos/EntregaElementosEPP.module.css';
import { reiniciarDotacion } from '../store/StoreDotacion';
import FormularioDotaciones from './componentes/FormularioDotaciones';

const SolicitarDotacion = ({ cerrar }: { cerrar: () => void }) => {
  const [cedulaTrabajador, setCedulaTrabajador] = useState('');

  return (
    <FormModal
      tittle='Solicitar dotación'
      close={() => {
        cerrar();
        reiniciarDotacion();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        toast.success('Se ha registrado la entrega de dotaciones con éxito');
        cerrar();
        reiniciarDotacion();
      }}
      buttons={[
        <Button
          key='guardar'
          name='Guardar'
          sizeBtn='small'
          typeBtn='primary'
          icon='add'
          permisos={['leer']}
          permiso=''
          type='submit'
        />,
      ]}
    >
      <main className={estilos.contenedor}>
        <Condicional condicion={!cedulaTrabajador}>
          <SearchComponent
            algoliaIndex='0b7eNgKSxmHUjzBH7Jvz_index'
            title='Escriba el nombre o la cédula del trabajador'
            returnAlgoliaValue={(e) => {
              guardarTrabajador({
                id: e.objectID,
                nombre: e.nombre,
                cedula: e.cedula,
                fechaNacimiento: e.fechaNacimiento,
                genero: e.genero,
                historiaOcupacional: e.historiaOcupacional,
              });
              setCedulaTrabajador(e.cedula);
            }}
            closeModal={() => {}}
          />
        </Condicional>

        <Condicional condicion={cedulaTrabajador !== ''}>
          <button
            type='button'
            onClick={() => setCedulaTrabajador('')}
            className={estilos.boton_seleccionar}
          >
            Seleccionar otro trabajador
          </button>
          <FormularioDotaciones />
        </Condicional>
      </main>
    </FormModal>
  );
};

export default SolicitarDotacion;
