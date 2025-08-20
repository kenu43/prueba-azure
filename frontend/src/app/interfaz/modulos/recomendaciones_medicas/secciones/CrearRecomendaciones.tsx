import { useState } from 'react';
import { toast } from 'sonner';

import SearchComponent from 'app/comunes/controles/buscador/SearchComponent';
import { Button } from 'app/comunes/controles/Buttons';
import { SelectMultString } from 'app/comunes/controles/select';
import Condicional from 'app/comunes/funcionales/Condicional';
import FormModal from 'app/comunes/funcionales/forms/Form';

import { TIPO_RECOMENDACIONES } from '../constantes/ConstGenerales';
import estilos from '../estilos/FormularioRegistro.module.css';
import { restablecerRecomendaciones } from '../store/StoreRecomendaciones';
import {
  guardarTrabajador,
  reiniciarTrabajador,
} from '../store/TrabajadoresRecomendacionesStore';
import InformacionTrabajador from './InformacionTrabajador';
import BaseFormularioRecomendaciones from './secciones_formularios/BaseFormularioRecomendaciones';
import ConceptoRehabilitacion from './secciones_formularios/ConceptoRehabilitacion';
import DiscapacidadCertificada from './secciones_formularios/DiscapacidadCertificada';
import EmisionMedicaLaboral from './secciones_formularios/EmisionMedicaLaboral';
import EnfermedadGrave from './secciones_formularios/EnfermedadGrave';
import PerdidaCapacidadLaboral from './secciones_formularios/PerdidaCapacidadLaboral';
import ReporteEnfermedadLaboral from './secciones_formularios/ReporteEnfermedadLaboral';

const componentePorTipo: Record<string, React.ComponentType> = {
  [TIPO_RECOMENDACIONES[0]]: EmisionMedicaLaboral,
  [TIPO_RECOMENDACIONES[1]]: DiscapacidadCertificada,
  [TIPO_RECOMENDACIONES[2]]: EnfermedadGrave,
  [TIPO_RECOMENDACIONES[3]]: ReporteEnfermedadLaboral,
  [TIPO_RECOMENDACIONES[4]]: ConceptoRehabilitacion,
  [TIPO_RECOMENDACIONES[5]]: PerdidaCapacidadLaboral,
};

const CrearRecomendaciones = ({ cerrar }: { cerrar: () => void }) => {
  const [cedulaTrabajador, setCedulaTrabajador] = useState('');
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([]);

  const resetear = () => {
    cerrar();
    reiniciarTrabajador();
    restablecerRecomendaciones();
    setTiposSeleccionados([]);
  };

  return (
    <FormModal
      tittle="Registrar reporte de condiciones de salud"
      close={resetear}
      onSubmit={(e) => {
        e.preventDefault();
        toast.success('Se ha registrado la recomendación médica con éxito');
        resetear();
      }}
      buttons={[
        <Button
          key="guardar"
          name="Guardar"
          sizeBtn="small"
          typeBtn="primary"
          icon="add"
          permisos={['leer']}
          permiso=""
          type="submit"
        />,
      ]}
    >
      <main className={estilos.contenedor}>
        <Condicional condicion={!cedulaTrabajador}>
          <SearchComponent
            algoliaIndex="0b7eNgKSxmHUjzBH7Jvz_index"
            title="Escriba el nombre o la cédula del trabajador"
            returnAlgoliaValue={(e) => {
              guardarTrabajador({
                id: e.objectID,
                nombre: e.nombre,
                cedula: e.cedula,
                sap: e.sap,
                fechaNacimiento: e.fechaNacimiento,
                genero: e.genero,
                cargo: e.historiaOcupacional.cargo,
                gerencia: e.historiaOcupacional.gerencia,
                nombreJefe: e.historiaOcupacional.nombreJefe,
                region: e.historiaOcupacional.region,
              });
              setCedulaTrabajador(e.cedula);
            }}
            closeModal={() => {}}
          />
        </Condicional>

        <Condicional condicion={!!cedulaTrabajador}>

          <InformacionTrabajador />

          <button
            type="button"
            onClick={() => {
              setCedulaTrabajador('');
              setTiposSeleccionados([]);
            }}
            className={estilos.boton_seleccionar}
          >
            Seleccionar otro trabajador
          </button>

          <BaseFormularioRecomendaciones />

          <SelectMultString
            label="Tipo de reporte de condiciones de salud"
            name="tipos-recomendacion"
            optionsArray={TIPO_RECOMENDACIONES}
            value={tiposSeleccionados}
            onChange={arr => setTiposSeleccionados(arr)}
            required={true}

          />
          {tiposSeleccionados.map((tipo) => {
            const Componente = componentePorTipo[tipo];
            return Componente
              ? (
                  <Componente key={tipo} />
                )
              : null;
          })}
        </Condicional>
      </main>
    </FormModal>
  );
};

export default CrearRecomendaciones;
