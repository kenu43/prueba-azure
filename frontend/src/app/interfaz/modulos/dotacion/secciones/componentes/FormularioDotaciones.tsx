import InformacionTrabajador from '../../../epp/secciones/componentes/InformacionTrabajador';
import estilos from '../../estilos/EntregaElementosEPP.module.css';
import ElementosDotaciones from './ElementosDotaciones';
import InfoEntregaTrabajador from './InfoEntregaTrabajador';

const FormularioDotaciones = () => {
  return (
    <section className={estilos.contenedor_formulario}>
      <InformacionTrabajador />
      <ElementosDotaciones />

      <fieldset className={estilos.contenedor_seccion}>
        <legend>Información de la entrega</legend>
        <div className={estilos.contenedor_preguntas}>
          <InfoEntregaTrabajador />
        </div>
      </fieldset>
    </section>
  );
};

export default FormularioDotaciones;
