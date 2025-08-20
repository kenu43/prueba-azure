import { toast } from 'sonner';

import { Button } from 'app/comunes/controles/Buttons';
import Toggle from 'app/comunes/controles/Toggle';
import FormModal from 'app/comunes/funcionales/forms/Form';

import estilos from '../../estilos/FormularioRegistro.module.css';
import { restablecerRecomendaciones } from '../../store/StoreRecomendaciones';
import { reiniciarTrabajador } from '../../store/TrabajadoresRecomendacionesStore';
import InformacionTrabajador from '../InformacionTrabajadorEditar';
import BaseFormularioRecomendaciones from '../secciones_formularios/BaseFormularioRecomendaciones';
import ConceptoRehabilitacionEditar from './secciones_editar/ConceptoRehabilitacionEditar';
import EnfermedadGraveEditar from './secciones_editar/EnfermedadGraveEditar';
import BaseFormularioRecomendacionesEditar from './secciones_editar/BaseFormularioRecomendacionesEditar';

// const componentePorTipo: Record<string, React.ComponentType> = {
//   [TIPO_RECOMENDACIONES[0]]: EmisionMedicaLaboral,
//   [TIPO_RECOMENDACIONES[1]]: DiscapacidadCertificada,
//   [TIPO_RECOMENDACIONES[2]]: EnfermedadGrave,
//   [TIPO_RECOMENDACIONES[3]]: ReporteEnfermedadLaboral,
//   [TIPO_RECOMENDACIONES[4]]: ConceptoRehabilitacion,
//   [TIPO_RECOMENDACIONES[5]]: PerdidaCapacidadLaboral,
// };

const EditarRecomendaciones = ({ cerrar }: { cerrar: () => void }) => {
//   const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([]);

  const resetear = () => {
    cerrar();
    reiniciarTrabajador();
    restablecerRecomendaciones();
    // setTiposSeleccionados([]);
  };

  return (
    <FormModal
      tittle="Editar reporte de condiciones de salud"
      close={resetear}
      onSubmit={(e) => {
        e.preventDefault();
        toast.success('Se ha editado la recomendación médica con éxito');
        resetear();
      }}
      buttons={[
        <div key="botones" className={estilos.botonesForm}>
          <Button
            key="guardar"
            name="Guardar"
            sizeBtn="small"
            typeBtn="primary"
            icon="add"
            permisos={['leer']}
            permiso=""
            type="submit"
          />

          <Toggle label="Gestionado" key="gestionado" />

        </div>,
      ]}
    >
      <main className={estilos.contenedor}>

        <InformacionTrabajador />

        <BaseFormularioRecomendacionesEditar />

        {/*
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
        })} */}

        <ConceptoRehabilitacionEditar />
        <EnfermedadGraveEditar />
      </main>
    </FormModal>
  );
};

export default EditarRecomendaciones;
