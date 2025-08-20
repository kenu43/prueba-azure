import { useState } from 'react';
import { Icon } from 'comunes/controles/Buttons/estilos/Estilos';

import { Iconografia } from '../recursos/Iconografia';

import type { IToolboxProps } from '../types/ToolboxTypes';

const ToolBox = ({ data, descargaGrafica }: IToolboxProps) => {
  const [image, setImage] = useState('');

  return (
    <section className='tool-box-container'>
      <a
        href={image}
        download
        onClick={() => {
          const dataURL = descargaGrafica();
          setImage(dataURL);
        }}
      >
        <Icon>{Iconografia.descargar.path}</Icon>
      </a>
      <div>{data}</div>
    </section>
  );
};

export default ToolBox;
