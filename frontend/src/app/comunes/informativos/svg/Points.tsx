import styled from 'styled-components';
import { SpinnerQtyZ } from 'comunes/estilos/Animaciones';

const SVG = styled.svg`
  width: var(--icons-size);
  height: var(--icons-size);
  background-color: transparent;

  .spinner_nOfF {
    fill: var(--color-primary-text);
    animation: ${SpinnerQtyZ} 2s cubic-bezier(0.36, 0.6, 0.31, 1) infinite;
  }
  .spinner_fVhf {
    animation-delay: -0.5s;
  }
  .spinner_piVe {
    animation-delay: -1s;
  }
  .spinner_MSNs {
    animation-delay: -1.5s;
  }
`;

const Points = () => (
  <SVG viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <circle className='spinner_nOfF' cx='4' cy='12' r='3' />
    <circle className='spinner_nOfF spinner_fVhf' cx='4' cy='12' r='3' />
    <circle className='spinner_nOfF spinner_piVe' cx='4' cy='12' r='3' />
    <circle className='spinner_nOfF spinner_MSNs' cx='4' cy='12' r='3' />
  </SVG>
);

export default Points;
