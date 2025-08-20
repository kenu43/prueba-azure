import { signOut } from 'firebase/auth';
import { nanoid } from 'nanoid';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from 'configuraciones/Firebase';

import { configuraciones, otrasConfiguraciones } from '../constantes/ConstGenerales';
import estilos from '../estilos/EstBarraLateralConfiguracion.module.css';
import { iconografia } from '../recursos/Iconografia';

const AppConfig = () => {
  const navigate = useNavigate();
  const [verOtros, setVerOtros] = useState(false);

  const salir = useCallback(() => {
    signOut(auth);
    window.location.reload();
  }, []);

  const visibles = Object.values(configuraciones).filter(c => c.desplegar);
  const otras = Object.values(otrasConfiguraciones).filter(c => c.desplegar && c.nombre !== 'Salir de sesión');

  return (
    <div className={estilos.contenedor_config}>
      {visibles.map(op => (
        <a
          key={nanoid(8)}
          href={op.url}
          title={op.nombre}
          className={estilos.seccion_icono}
          onClick={(e) => {
            e.preventDefault();
            if (op.nombre === 'Salir de sesión')
              salir();
            else navigate(op.url);
          }}
        >
          <svg className={estilos.icono_config} viewBox="0 0 24 24">
            {iconografia[op.icono as keyof typeof iconografia].path}
          </svg>
          <small className={estilos.nombre_opcion}>{op.nombre}</small>
        </a>
      ))}

      <a
        href="/"
        className={estilos.seccion_icono}
        onClick={(e) => {
          e.preventDefault();
          salir();
        }}
      >
        <svg className={estilos.icono_config} viewBox="0 0 24 24">
          {iconografia.logout.path}
        </svg>
        <small className={estilos.nombre_opcion}>Salir de sesión</small>
      </a>

      {otras.length > 0 && (
        <>
          <button
            className={estilos.boton_mas}
            type="button"
            onClick={() => setVerOtros(true)}
          >
            <svg className={estilos.icono_config} viewBox="0 0 24 24">
              {iconografia.more.path}
            </svg>
            <small className={estilos.nombre_opcion}>Más</small>
          </button>

          {verOtros && (
            <div className={estilos.modal_opciones} onClick={() => setVerOtros(false)}>
              <div className={estilos.contenedor_modal_movil} onClick={e => e.stopPropagation()}>
                {otras.map(op => (
                  <a
                    key={nanoid(8)}
                    href={op.url}
                    className={estilos.seccion_icono}
                  >
                    <svg className={estilos.icono_config} viewBox="0 0 24 24">
                      {iconografia[op.icono as keyof typeof iconografia].path}
                    </svg>
                    <small className={estilos.nombre_opcion}>{op.nombre}</small>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppConfig;
