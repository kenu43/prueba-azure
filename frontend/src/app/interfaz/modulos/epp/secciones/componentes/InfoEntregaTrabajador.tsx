import Date from 'app/comunes/controles/Date';
import Email from 'app/comunes/controles/Email';
import Phone from 'app/comunes/controles/Phone';
import { SelectString } from 'app/comunes/controles/select';
import Text from 'app/comunes/controles/Text';

import estilos from '../../estilos/ElementosSeleccionados.module.css';
import { ciudades } from '../../recursos/Ciudades.json';
import { guardarDatosEntrega, useEppStore } from '../../store/StoreEpp';

const InfoEntregaTrabajador = () => {
  const { celular, ciudad, correo, direccion, fechaSolicitud } =
    useEppStore().infoEntrega;

  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Información de la entrega</legend>
      <section className={estilos.contenedor_info_entrega}>
        <Date label='Fecha de solicitud' value={fechaSolicitud} />
        <Email
          label='Correo electrónico alternativo'
          value={correo}
          onChange={(correo) =>
            guardarDatosEntrega('correo', correo.target.value)
          }
          required
        />

        <Phone
          label='Celular'
          value={celular}
          onChange={(celular) =>
            guardarDatosEntrega('celular', celular.target.value)
          }
          required
        />
        <SelectString
          optionsArray={ciudades}
          label='Ciudad'
          name='ciudad'
          value={ciudad}
          onChange={(ciudad) => guardarDatosEntrega('ciudad', ciudad)}
          required
        />
        <Text
          style={{ gridColumn: '1/-1' }}
          label='Dirección de entrega'
          value={direccion}
          onChange={(direccion) =>
            guardarDatosEntrega('direccion', direccion.target.value)
          }
          required
        />
      </section>
    </fieldset>
  );
};

export default InfoEntregaTrabajador;
