import Date from 'app/comunes/controles/Date';
import Email from 'app/comunes/controles/Email';
import Phone from 'app/comunes/controles/Phone';
import { SelectString } from 'app/comunes/controles/select';
import Text from 'app/comunes/controles/Text';

import { ciudades } from '../../../epp/recursos/Ciudades.json';
import { useDotacion, guardarDatosEntrega } from '../../store/StoreDotacion';

const InfoEntregaTrabajador = () => {
  const { celular, ciudad, correo, direccion, fechaSolicitud } =
    useDotacion().infoEntrega;

  return (
    <>
      <Date label='Fecha de solicitud' value={fechaSolicitud} />
      <Email
        label='Correo electrónico'
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
    </>
  );
};

export default InfoEntregaTrabajador;
