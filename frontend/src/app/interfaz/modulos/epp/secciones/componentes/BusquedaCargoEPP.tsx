import { useMemo, useState } from 'react';

import { SelectString } from 'app/comunes/controles/select';
import Condicional from 'app/comunes/funcionales/Condicional';
import FormModal from 'app/comunes/funcionales/forms/Form';

import estilos from '../../estilos/BusquedaProveedor.module.css';
import { EPP as EPP_DATA } from '../../recursos/Elementos.json';
import TarjetaElementoEPP from './TarjetaElementoEPP';

const BusquedaCargoEPP = ({ cerrar }: { cerrar: () => void }) => {
  const [cargoActual, setCargoActual] = useState('');

  const listaCargos = useMemo(() => {
    const set = new Set<string>();
    EPP_DATA.forEach((el) => {
      (el.cargo ?? []).forEach(c => set.add(c));
    });
    return Array.from(set).sort();
  }, []);

  const elementosFiltrados = useMemo(
    () =>
      cargoActual
        ? EPP_DATA.filter(el => (el.cargo ?? []).includes(cargoActual))
        : [],
    [cargoActual],
  );

  return (
    <FormModal tittle="Elementos por cargo" close={cerrar}>
      <section className={estilos.contenedor_formulario}>
        <fieldset className={estilos.contenedor_seccion}>
          <legend>Cargo</legend>
          <SelectString
            label="Seleccione un cargo"
            name="cargo"
            optionsArray={listaCargos}
            value={cargoActual}
            onChange={setCargoActual}
          />
        </fieldset>

        <Condicional condicion={!!cargoActual}>
          <fieldset className={estilos.contenedor_seccion}>
            <legend>Elementos disponibles</legend>
            <div className={estilos.galeria}>
              {elementosFiltrados.map(el => (
                <TarjetaElementoEPP
                  key={el.codigo}
                  elemento={{
                    codigo: el.codigo,
                    label: el.label,
                    imagen: el.imagen,
                  }}
                />
              ))}
            </div>
          </fieldset>
        </Condicional>
      </section>
    </FormModal>
  );
};

export default BusquedaCargoEPP;
