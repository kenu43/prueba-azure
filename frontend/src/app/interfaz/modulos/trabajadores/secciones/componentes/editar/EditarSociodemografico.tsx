import Date from 'comunes/controles/Date';
import Email from 'comunes/controles/Email';
import Numeric from 'comunes/controles/Numeric';
import Radio from 'comunes/controles/Radio';
import { SelectObject } from 'comunes/controles/select';
import Text from 'comunes/controles/Text';
import {
  ESTADO_CIVIL,
  NIVEL_EDUCATIVO,
  TIPO_DOCUMENTO,
} from 'modulos/trabajadores/constantes/ConstGenerales';
import {
  guardarDatos,
  guardarFechaNac,
  useTrabajadoresStore,
} from 'modulos/trabajadores/store/StoreTrabajadores';
import {
  obtenerFechaMaxima,
  obtenerValue,
} from 'modulos/trabajadores/utilidades/Funciones';
import { calcularEdad } from 'utilidades/FuncionesGenerales';

import estilos from '../../../estilos/EstFormulario.module.css';
import MensajeFechas from '../MensajeFechas';

const EditarSociodemografico = () => {
  const {
    tipoDocumento,
    cedula,
    nombre,
    fechaNacimiento,
    genero,
    fechaIngresoCargo,
    Idsap,
  } = useTrabajadoresStore();

  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Datos sociodemográficos y de identificación</legend>
      <section className={estilos.contenedor_preguntas}>
        <SelectObject
          optionsArray={TIPO_DOCUMENTO}
          value={obtenerValue(tipoDocumento, TIPO_DOCUMENTO)}
          label="Tipo de expediente"
          name="tipoDocumento"
          target="label"
          onChange={e => guardarDatos('tipoDocumento', e.codigo)}
          required
        />

        <Text
          label="Número de expediente"
          name="numeroDocumento"
          value={cedula}
          onChange={e => guardarDatos('cedula', e.target.value)}
          required
        />

        <Text
          label="Nombre completo"
          name="nombreCompleto"
          value={nombre}
          onChange={e => guardarDatos('nombre', e.target.value)}
          required
        />

        <div className={estilos.centrar}>
          <Radio
            label="Género"
            name="genero"
            value={genero}
            options={['Femenino', 'Masculino']}
            onChange={e => guardarDatos('genero', e.target.value)}
            required
          />
        </div>

        <Text
          label="SAP"
          name="Idsap"
          value={Idsap}
          onChange={e => guardarDatos('Idsap', e.target.value)}
          required
        />

        <div className={`${estilos.fecha} ${estilos.seccion}`}>
          <Date
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            value={fechaNacimiento}
            max={obtenerFechaMaxima(fechaIngresoCargo)}
            onChange={e => guardarFechaNac(e.target.value ?? '')}
            required
          />
          <MensajeFechas
            cumple={`Edad: ${calcularEdad(fechaNacimiento)} años`}
            noCumple="No se puede registrar una fecha de nacimiento menor a 16 años"
            condicion={fechaNacimiento !== ''}
          />
        </div>
      </section>
    </fieldset>
  );
};

export default EditarSociodemografico;
