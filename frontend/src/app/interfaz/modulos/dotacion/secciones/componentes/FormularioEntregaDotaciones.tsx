import { SignDesktop } from 'app/comunes/funcionales/firmas';
import usePermisos from 'app/hooks/Permisos';

import InformacionTrabajador from '../../../epp/secciones/componentes/InformacionTrabajador';
import estilos from '../../estilos/EntregaElementosEPP.module.css';
import ElementosDotaciones from './ElementosDotaciones';
import { useDotacion } from '../../store/StoreDotacion';
import { useTrabajadorEppStore } from 'app/interfaz/modulos/epp/store/StoreEpp';

const FormularioEntregaDotaciones = () => {
  const { accesos } = usePermisos();

  const { cedula } = useTrabajadorEppStore();
  const { celular, ciudad, correo, direccion, fechaSolicitud } =
    useDotacion().infoEntrega;

  return (
    <section className={estilos.contenedor_formulario}>
      <InformacionTrabajador />
      <ElementosDotaciones />

      <fieldset className={estilos.contenedor_seccion}>
        <legend>Información de la entrega</legend>
        <section className={estilos.contenedor_preguntas}>
          <div>
            <h6>Fecha de solicitud</h6>
            <p>{fechaSolicitud}</p>
          </div>
          <div>
            <h6>Celular</h6>
            <p>{celular}</p>
          </div>
          <div>
            <h6>Ciudad</h6>
            <p>{ciudad}</p>
          </div>
          <div>
            <h6>Correo</h6>
            <p>{correo}</p>
          </div>
          <div>
            <h6>Dirección</h6>
            <p>{direccion}</p>
          </div>
        </section>

        <p className={estilos.nota}>
          NOTA: Las prendas de trabajo, calzado de labor y prenda de imagen que
          recibe serán de uso exclusivo para el desempeño de sus funciones y no
          podrán ser entregadas a ninguna persona diferente, aunque estén
          deterioradas. Estas prendas le serán exigidas por su jefe inmediato
          para el desempeño de sus labores. Es responsabilidad de cada
          trabajador el uso que se le dé a las prendas que haya recibido. El
          incumplimiento en el uso o destinación le acarreará sanciones
          disciplinarias.
          <br />
          Declaro que conozco y entiendo las normas generales de seguridad
          industrial de la compañía y me someto a ellos en todas sus partes.
        </p>
      </fieldset>

      <fieldset className={estilos.contenedor_seccion}>
        <legend>Firmas</legend>
        <div className={estilos.firmas}>
          <SignDesktop
            label='Trabajador'
            path={`firmas/${cedula}/recibe`}
            firma=''
            onChange={() => {
              console.log('hioa');
            }}
            permisos={accesos.dotacion}
            required
          />
          <SignDesktop
            label='Entrega'
            path={`firmas/${cedula}/entrega`}
            firma=''
            onChange={() => {
              console.log('firma');
            }}
            permisos={accesos.dotacion}
            required
          />
        </div>
      </fieldset>
    </section>
  );
};

export default FormularioEntregaDotaciones;
