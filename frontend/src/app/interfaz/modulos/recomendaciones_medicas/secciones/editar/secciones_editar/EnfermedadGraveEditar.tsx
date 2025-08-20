import { useState } from 'react';

import Date from 'app/comunes/controles/Date';
import TextArea from 'app/comunes/controles/TextArea';
import Evidencia from 'app/comunes/evidencias/Evidencia';
import Condicional from 'app/comunes/funcionales/Condicional';
import { useUserStore } from 'app/store/PrincipalStore';
import { getLocalDate } from 'utilidades/FuncionesGenerales';

import estilos from '../../../estilos/SeccionesFormularios.module.css';

const EnfermedadGraveEditar = () => {
  const [abrirEvidencia, setAbrirEvidencia] = useState(false);
  const { usuario } = useUserStore();
  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Reportar una enfermedad grave o catastrófica</legend>
      <section className={estilos.contenedor_informacion}>
        <TextArea
          label="Diagnóstico a reportar"
          value="Fiebre amarilla"
          onChange={() => {
          }}
        />
        <Date
          label="Fecha diagnóstico"
          value="2025-05-15"
          onChange={() => {
          }}
        />
        <Date
          label="Último control médico"
          value="2025-06-04"
          onChange={() => {
          }}
        />

        <Date
          label="Próximo control médico "
          value="2025-08-20"
          onChange={() => {
          }}
        />

        <div className={estilos.span_dos_columnas}>
          <TextArea
            label="Tratamiento actual"
            value="Hidratación intravenosa, transfusiones y oxigenoterapia"
            onChange={() => {
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', gridColumn: '1/-1' }}>
          <button
            onClick={() => {
              setAbrirEvidencia(true);
            }}
            className={estilos.boton_evidencia}
            type="button"
          >
            Adjuntar evidencia
          </button>

        </div>
        <Condicional condicion={abrirEvidencia}>
          <Evidencia
            titulo="Subir evidencia"
            close={() => setAbrirEvidencia(false)}
            rutaStorage={`recomendaciones-medicas/enfermedad-grave/${usuario.uid}/`}
            archivosCargados={() => {
            }}
          />
        </Condicional>
      </section>
    </fieldset>
  );
};
export default EnfermedadGraveEditar;
