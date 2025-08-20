import { useNavigate } from 'react-router-dom';

import usePermisos from 'hooks/Permisos';

import type { ModulosParams } from '../types/DashboardTypes';

import { estilosModulos } from '../estilos/EstilosModulos';
import styles from '../estilos/EstTarjetas.module.css';
import { imagenes } from '../recursos/ImagenesModulos.json';

const PanelPrincipal = ({ modulos }: { modulos: ModulosParams[] }) => {
  const { accesoModulos } = usePermisos();
  const navigate = useNavigate();

  const modulosConPermiso = modulos.filter(
    modulo => accesoModulos.includes(modulo.llaveModulo) && modulo.estaActivo,
  );

  return (
    <main className={styles.contenedor_dashboard}>
      {modulosConPermiso.map((item) => {
        const styleProps
          = estilosModulos[item.llaveModulo as keyof typeof estilosModulos] || estilosModulos.default;

        const description = styleProps.description || item.descripcion;

        return (
          <article
            className={styles.dashboard_tarjeta}
            role="button"
            key={item.titulo}
            onClick={() => navigate(item.url)}
          >
            <div
              className={styles.header_gradiente}
              style={{
                background: `linear-gradient(to right, ${styleProps.colorFrom}, ${styleProps.colorTo})`,
              }}
            />

            <div
              className={styles.contenedor_imagen}
              style={{ backgroundColor: styleProps.bgColor }}
            >
              <img
                className={styles.dashboard_imagen}
                src={imagenes?.[item.llaveModulo as keyof typeof imagenes] || '/placeholder.svg'}
                alt={`Ilustración de ${item.titulo}`}
              />
            </div>

            <div className={styles.contenido_tarjeta}>
              <div className={styles.header_contenido}>
                <div
                  className={styles.icono_wrapper}
                  style={{
                    background: `linear-gradient(to right, ${styleProps.colorFrom}, ${styleProps.colorTo})`,
                  }}
                >
                  {styleProps.iconoSvg && (
                    <div
                      className={styles.icono_svg}
                      dangerouslySetInnerHTML={{ __html: styleProps.iconoSvg }}
                    />
                  )}
                </div>
                <h1 className={styles.titulo}>{item.titulo}</h1>
              </div>
              <p className={styles.descripcion}>{description}</p>

              <button
                type="button"
                className={styles.boton_acceder}
                style={{
                  background: `linear-gradient(to right, ${styleProps.colorFrom}, ${styleProps.colorTo})`,
                }}
              >
                Acceder al Módulo
                <span className={styles.arrow_icon}>→</span>
              </button>
            </div>
          </article>
        );
      })}
    </main>
  );
};

export default PanelPrincipal;
