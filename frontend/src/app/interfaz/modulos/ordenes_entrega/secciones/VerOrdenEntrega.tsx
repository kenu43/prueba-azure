import FormModal from 'app/comunes/funcionales/forms/Form';

import type { OrdenEntrega } from '../types/Types';

import estilos from '../estilos/VerOrdenEntrega.module.css';
import { IconoEntrega, IconoEstado, IconoObservaciones, IconoTrabajador } from '../recursos/Iconografia';

type VerOrdenEntregaProps = {
  cerrar: () => void;
  ordenEntrega: OrdenEntrega | null;
};

const VerOrdenEntrega = ({ cerrar, ordenEntrega }: VerOrdenEntregaProps) => {
  if (!ordenEntrega) {
    return null;
  }

  const { trabajador, infoEntrega } = ordenEntrega;

  const getEstadoClass = (estado: string) => {
    switch (estado) {
      case 'Entregado':
        return estilos.estado_entregado;
      case 'Devuelto':
        return estilos.estado_devuelto;
      case 'Aprobado':
        return estilos.estado_aprobado;
      default:
        return '';
    }
  };

  return (
    <FormModal
      tittle="Información de la orden de entrega"
      close={cerrar}
      onSubmit={(e) => {
        e.preventDefault();
        cerrar();
      }}
    >
      <section className={estilos.contenedor_formulario}>
        <fieldset className={estilos.contenedor_seccion}>
          <legend>
            <IconoTrabajador style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Información del trabajador
          </legend>
          <section className={estilos.contenedor_preguntas}>
            <div>
              <h6>Expediente</h6>
              <p>{trabajador.cedula}</p>
            </div>
            <div>
              <h6>Nombre completo</h6>
              <p>{trabajador.nombre}</p>
            </div>
            <div>
              <h6>Región</h6>
              <p>{trabajador.region}</p>
            </div>
            <div>
              <h6>Ciudad</h6>
              <p>{trabajador.ciudad}</p>
            </div>
            <div>
              <h6>Cargo</h6>
              <p>{trabajador.cargo}</p>
            </div>
            <div>
              <h6>Correo</h6>
              <p>{trabajador.correo}</p>
            </div>
          </section>
        </fieldset>

        <fieldset className={estilos.contenedor_seccion}>
          <legend>
            <IconoEntrega style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Información de la entrega
          </legend>
          <section className={estilos.contenedor_preguntas}>
            <div>
              <h6>Número de orden</h6>
              <p>{infoEntrega.numeroOrden}</p>
            </div>
            <div>
              <h6>Proveedor</h6>
              <p>{infoEntrega.proveedor}</p>
            </div>
            <div>
              <h6>Fecha de solicitud</h6>
              <p>{infoEntrega.fechaSolicitud}</p>
            </div>
            {infoEntrega.fechaEntrega && (
              <div>
                <h6>Fecha de entrega</h6>
                <p>{infoEntrega.fechaEntrega}</p>
              </div>
            )}
            <div>
              <h6>Celular</h6>
              <p>{infoEntrega.celular}</p>
            </div>
            <div>
              <h6>Ciudad</h6>
              <p>{infoEntrega.ciudad}</p>
            </div>
            <div>
              <h6>Correo</h6>
              <p>{infoEntrega.correo}</p>
            </div>
            <div>
              <h6>Dirección</h6>
              <p>{infoEntrega.direccion}</p>
            </div>
          </section>
        </fieldset>

        <fieldset className={estilos.contenedor_seccion}>
          <legend>
            <IconoEstado style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Estado de la orden
          </legend>
          <section className={estilos.contenedor_preguntas}>
            <div className={estilos.estado_container}>
              <h6>Estado actual</h6>
              <span className={`${estilos.estado_badge} ${getEstadoClass(infoEntrega.estado)}`}>
                {infoEntrega.estado}
              </span>
            </div>
          </section>
        </fieldset>

        {infoEntrega.observaciones && (
          <fieldset className={estilos.contenedor_seccion}>
            <legend>
              <IconoObservaciones style={{ marginRight: '5px', verticalAlign: 'middle' }} />
              Observaciones
            </legend>
            <section className={estilos.contenedor_preguntas}>
              <div className={estilos.observaciones_container}>
                <h6>Comentarios adicionales</h6>
                <p>{infoEntrega.observaciones}</p>
              </div>
            </section>
          </fieldset>
        )}
      </section>
    </FormModal>
  );
};

export default VerOrdenEntrega;
