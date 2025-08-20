import { useMemo, useState } from 'react';

import { SelectString } from 'app/comunes/controles/select';
import Condicional from 'app/comunes/funcionales/Condicional';
import FormModal from 'app/comunes/funcionales/forms/Form';

import estilos from '../../estilos/BusquedaProveedor.module.css';
import { EPP } from '../../recursos/Elementos.json';
import TarjetaElementoEPP from './TarjetaElementoEPP';

const BusquedaProveedorEPP = ({ cerrar }: { cerrar: () => void }) => {
  const [nombreProveedor, setNombreProveedor] = useState('');

  const listaProveedores = useMemo(
    () =>
      Array.from(
        new Set(EPP.map(el => el.proveedor ?? '')),
      ).sort(),
    [],
  );

  const elementosVisibles = useMemo(
    () =>
      nombreProveedor
        ? EPP.filter(el => el.proveedor === nombreProveedor)
        : [],
    [nombreProveedor],
  );

  return (
    <FormModal tittle="Elementos por proveedor" close={cerrar}>
      <section className={estilos.contenedor_formulario}>
        <fieldset className={estilos.contenedor_seccion}>
          <legend>Proveedor</legend>
          <SelectString
            label="Seleccione un proveedor"
            name="proveedor"
            optionsArray={listaProveedores}
            value={nombreProveedor}
            onChange={setNombreProveedor}
          />
        </fieldset>

        <Condicional condicion={!!nombreProveedor}>
          <fieldset className={estilos.contenedor_seccion}>
            <legend>Elementos disponibles</legend>
            <div className={estilos.galeria}>
              {elementosVisibles.map(el => (
                <TarjetaElementoEPP key={el.codigo} elemento={el} />
              ))}
            </div>
          </fieldset>
        </Condicional>
      </section>
    </FormModal>
  );
};

export default BusquedaProveedorEPP;
