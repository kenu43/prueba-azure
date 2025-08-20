import { useState } from 'react';
import { toast } from 'sonner';

import SearchComponent from 'app/comunes/controles/buscador/SearchComponent';
import { Button } from 'app/comunes/controles/Buttons';
import Condicional from 'app/comunes/funcionales/Condicional';
import FormModal from 'app/comunes/funcionales/forms/Form';

import estilos from '../estilos/SolicitarEPP.module.css';
import {
  guardarTrabajador,
  reiniciarEPP,
  useEppStore,
  useTrabajadorEppStore,
} from '../store/StoreEpp';
import { agregarRegistro } from '../store/StoreEppTabla';
import InfoEntregaTrabajador from './componentes/InfoEntregaTrabajador';
import InformacionTrabajador from './componentes/InformacionTrabajador';
import SeleccionarElementos from './componentes/SeleccionarElementos';

const SolicitarEPP = ({ cerrar }: { cerrar: () => void }) => {
  const [escogerTrabajador, setEscogerTrabajador] = useState(true);
  const { elementosSeleccionados, infoEntrega } = useEppStore();
  const trabajador = useTrabajadorEppStore();

  return (
    <FormModal
      tittle='Solicitar elementos de protección personal'
      close={() => {
        cerrar();
        reiniciarEPP();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        cerrar();
        toast.success('Se ha solicitado el EPP con éxito');
        reiniciarEPP();
        agregarRegistro({
          trabajador: {
            ...trabajador,
            SAP: '123456789',
            cargo: 'Zone Owner I',
            ciudad: 'Bogotá D.C',
            region: 'Cundinamarca',
          },
          elementosSeleccionados,
          infoEntrega,
        });
      }}
      buttons={[
        <Button
          key='button-1'
          icon='new'
          name='Guardar'
          sizeBtn='normal'
          type='submit'
          id='registrar'
          typeBtn='primary'
          permisos={['escribir']}
          permiso='escribir'
        />,
      ]}
    >
      <main className={estilos.contenedor}>
        <Condicional condicion={escogerTrabajador}>
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
              setEscogerTrabajador(false);
            }}
            closeModal={() => {}}
          />
        </Condicional>

        <Condicional condicion={!escogerTrabajador}>
          <button
            type='button'
            onClick={() => setEscogerTrabajador(true)}
            className={estilos.boton_seleccionar}
          >
            Seleccionar otro trabajador
          </button>

          <InformacionTrabajador />
          <SeleccionarElementos />
          <InfoEntregaTrabajador />
        </Condicional>
      </main>
    </FormModal>
  );
};

export default SolicitarEPP;
