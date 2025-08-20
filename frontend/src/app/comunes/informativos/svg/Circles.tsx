import styled, { keyframes } from 'styled-components';

const spinnerSTY6 = keyframes`
 100% {
  transform: rotate(360deg);
 }
`;

const SVG = styled.svg`
  width: var(--icons-size);
  height: var(--icons-size);
  fill: var(--color-primary-text);
  background-color: transparent;

  .spinner_GuJz {
    transform-origin: center;
    animation: ${spinnerSTY6} 1.5s linear infinite;
  }
`;

const Points = () => (
  <SVG viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <g className='spinner_GuJz'>
      <circle cx='3' cy='12' r='2' />
      <circle cx='21' cy='12' r='2' />
      <circle cx='12' cy='21' r='2' />
      <circle cx='12' cy='3' r='2' />
      <circle cx='5.64' cy='5.64' r='2' />
      <circle cx='18.36' cy='18.36' r='2' />
      <circle cx='5.64' cy='18.36' r='2' />
      <circle cx='18.36' cy='5.64' r='2' />
    </g>
  </SVG>
);

export default Points;
