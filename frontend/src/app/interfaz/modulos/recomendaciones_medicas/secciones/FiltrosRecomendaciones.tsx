import { SelectString } from 'app/comunes/controles/select';
import Date from 'comunes/controles/Date';
import Radio from 'comunes/controles/Radio';
import Text from 'comunes/controles/Text';
import ModalFiltro from 'comunes/funcionales/modalFiltros/ModalFiltro';

import { TIPO_DIRECCION, TIPO_REGION, TIPO_SEDE } from '../../trabajadores/constantes/ConstGenerales';
import { TIPO_RECOMENDACIONES } from '../constantes/ConstGenerales';
import estilos from '../estilos/Generales.module.css';

const FiltrosRecomendaciones = ({ cerrar }: { cerrar: () => void }) => {
  return (
    <ModalFiltro
      functions={{
        close() {
          cerrar();
        },
        apply: () => {
          cerrar();
        },
        delete: () => {
          cerrar();
        },
      }}
    >
      <main className={estilos.contenedor_filtro}>
        <div id="filtrar-cedula">
          <Text
            label="Expediente"
            onChange={() => ''}
          />
        </div>
        <div id="filtrar-nombre">
          <Text
            label="Nombre"
            onChange={() => ''}
          />
        </div>

        <SelectString
          label="Tipo del reporte"
          name="tipos-recomendacion"
          optionsArray={TIPO_RECOMENDACIONES}
          value=""
          onChange={() => ''}
        />

        <SelectString
          label="Región"
          name="region-filtro"
          optionsArray={TIPO_REGION}
          value=""
          onChange={() => ''}
        />

        <SelectString
          label="Sede"
          name="sede-filtro"
          optionsArray={TIPO_SEDE}
          value=""
          onChange={() => ''}
        />

        <SelectString
          label="Dirección comité"
          name="direccion-filtro"
          optionsArray={TIPO_DIRECCION}
          value=""
          onChange={() => ''}
        />

        <fieldset
          className={estilos.contenedor_fecha}
          id="filtrar-fecha-ingreso"
        >
          <legend>Fecha del diligenciamiento</legend>
          <Date
            label="Fecha inicial"
            onChange={() => ''}
          />
          <Date
            label="Fecha final"
            onChange={() => ''}
          />
        </fieldset>

        <fieldset className={estilos.contenedor_estado} id="filtrar-estado">
          <legend>Estado del trabajador</legend>
          <Radio
            label=""
            options={['Activo', 'Inactivo']}
            onChange={() => ''}
          />
        </fieldset>

        <fieldset className={estilos.contenedor_estado} id="filtrar-estado">
          <legend>Estado del reporte</legend>
          <Radio
            label=""
            options={['Gestionado', 'No gestionado']}
            onChange={() => ''}
          />
        </fieldset>
      </main>
    </ModalFiltro>
  );
};

export default FiltrosRecomendaciones;
