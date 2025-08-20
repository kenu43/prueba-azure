import Email from 'app/comunes/controles/Email';
import Date from 'comunes/controles/Date';
import { SelectString } from 'comunes/controles/select';
import {
  TIPO_AREA,
  TIPO_CARGO,
  TIPO_CARGO_FUNCION,
  TIPO_CIUDAD,
  TIPO_EMPRESA,
  TIPO_GERENCIA,
  TIPO_REGION,
} from 'modulos/trabajadores/constantes/ConstGenerales';
import {
  guardarDatos,
  useTrabajadoresStore,
} from 'modulos/trabajadores/store/StoreTrabajadores';
import {
  calcularMenorEdad,
} from 'modulos/trabajadores/utilidades/Funciones';

import estilos from '../../../estilos/EstFormulario.module.css';
import { useTrabajadoresTextoStore } from '../../../store/StoreMensajes';
import { useValidarFechasOcupacional } from '../../../utilidades/UseValidarFechasOcupacional';

const EditarOcupacional = () => {
  const {
    fechaIngresoCargo,
    fechaNacimiento,
    cargo,
    tipoCargo,
    gerencia,
    area,
    fechaRetiro,
    empresa,
    region,
    ciudad,
    correo,
  } = useTrabajadoresStore();

  useValidarFechasOcupacional(fechaNacimiento, fechaIngresoCargo, fechaRetiro);

  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Datos ocupacionales</legend>
      <section className={estilos.contenedor_preguntas}>
        <SelectString
          label="Empresa"
          name="empresa"
          optionsArray={TIPO_EMPRESA}
          value={empresa}
          onChange={valor => guardarDatos('empresa', valor)}
          required
        />

        <SelectString
          label="Gerencia"
          name="gerencia"
          value={gerencia}
          optionsArray={TIPO_GERENCIA}
          onChange={valor => guardarDatos('gerencia', valor)}
          required
        />

        <SelectString
          label="Dirección área"
          name="area"
          value={area}
          optionsArray={TIPO_AREA}
          onChange={valor => guardarDatos('area', valor)}
          required
        />

        <SelectString
          label="Región"
          name="region"
          optionsArray={TIPO_REGION}
          value={region}
          onChange={valor => guardarDatos('region', valor)}
          required
        />

        <SelectString
          label="Ciudad"
          name="ciudad"
          optionsArray={TIPO_CIUDAD}
          value={ciudad}
          onChange={valor => guardarDatos('ciudad', valor)}
          required
        />

        <SelectString
          label="Función - nivel de cargo"
          name="tipoCargo"
          value={tipoCargo}
          onChange={valor => guardarDatos('tipoCargo', valor)}
          optionsArray={TIPO_CARGO_FUNCION}
          required
        />

        <SelectString
          label="Cargo"
          name="cargo"
          value={cargo}
          optionsArray={TIPO_CARGO}
          onChange={valor => guardarDatos('cargo', valor)}
          required
        />

        <Email
          label="Correo institucional"
          name="correo"
          value={correo}
          onChange={e => guardarDatos('correo', e.target.value)}
          required
        />

        <div className={estilos.fecha}>
          <Date
            disabled={!calcularMenorEdad(fechaNacimiento)}
            label="Fecha de ingreso"
            name="fechaIngreso"
            value={fechaIngresoCargo}
            onChange={(e) => {
              guardarDatos('fechaIngresoCargo', e.target.value);
              useTrabajadoresTextoStore.getState().setTocoIngreso(true);
            }}
            required
          />
        </div>

        <div className={estilos.fecha}>
          <Date
            label="Fecha de retiro"
            name="fechaRetiro"
            value={fechaRetiro}
            min={fechaIngresoCargo}
            onChange={e => guardarDatos('fechaRetiro', e.target.value)}
          />
        </div>
      </section>
    </fieldset>
  );
};

export default EditarOcupacional;
