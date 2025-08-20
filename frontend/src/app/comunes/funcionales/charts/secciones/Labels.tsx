import { Icon } from 'comunes/controles/Buttons/estilos/Estilos';

import { ILabelProps } from '../types/LabelTypes';
import { Iconografia } from '../recursos/Iconografia';

import '../estilos/LabelStyles.css';

const Labels = ({
  nameX = 'Categoría x',
  nameY = 'Categoría y',
}: ILabelProps) => (
  <section className='label-container'>
    <div className='label-container-axis'>
      <div className='label-content'>
        <Icon>{Iconografia.ejes.path}</Icon>
        <small>Eje x - {nameX}</small>
      </div>
      <div className='label-content'>
        <Icon>{Iconografia.ejes.path}</Icon>
        <small>Eje y - {nameY}</small>
      </div>
    </div>
  </section>
);

export default Labels;
