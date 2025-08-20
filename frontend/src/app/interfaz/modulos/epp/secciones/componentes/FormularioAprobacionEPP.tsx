import { SignDesktop } from 'app/comunes/funcionales/firmas';

import estilos from '../../estilos/EntregaElementosEPP.module.css';
import { useEppStore } from '../../store/StoreEpp';
import ElementosSeleccionados from './ElementosSeleccionados';
import InformacionTrabajador from './InformacionTrabajador';

const FormularioAprobacionEPP = ({
  cedulaTrabajador,
}: {
  cedulaTrabajador: string;
}) => {
  const { fechaSolicitud, celular, ciudad, correo, direccion } =
    useEppStore().infoEntrega;

  return (
    <section className={estilos.contenedor_formulario}>
      <InformacionTrabajador />
      <ElementosSeleccionados />

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
          DECLARO HABER RECIBIDO LOS ELEMENTOS DE PROTECCIÓN PERSONAL AQUÍ
          SEÑALADOS, ASÍ COMO LAS INSTRUCCIONES PARA SU CORRECTO USO Y ACEPTO EL
          COMPROMISO QUE SE SOLICITA DE:
          <br />
          a. Utilizar el elemento durante la jornada de trabajo en las labores
          cuya obligatoriedad de uso se encuentra indicada.
          <br />
          b. Consultar cualquier duda sobre su correcta utilización, cuidando de
          su estado y conservación.
          <br />
          c. Solicitar un nuevo equipo en caso de pérdida o deterioro del mismo
          al correo elementosdeproteccion@claro.com.co
        </p>
      </fieldset>

      <fieldset className={estilos.contenedor_seccion}>
        <legend>Firmas</legend>
        <div className={estilos.firmas}>
          <SignDesktop
            label='Trabajador'
            path={`firmas/${cedulaTrabajador}/recibe`}
            firma=''
            onChange={() => {}}
            permisos={[]}
            required
          />
          <SignDesktop
            label='Entrega'
            path={`firmas/${cedulaTrabajador}/entrega`}
            firma=''
            onChange={() => {}}
            permisos={[]}
            required
          />
        </div>
      </fieldset>
    </section>
  );
};

export default FormularioAprobacionEPP;
