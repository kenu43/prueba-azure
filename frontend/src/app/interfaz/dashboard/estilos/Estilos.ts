import styled from 'styled-components';

import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';

export const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto repeat(8, 1fr) auto;
  height: 100vh;

  @media ${screenSizes.escritorio} {
    grid-template-columns: auto repeat(11, 1fr);
    grid-template-rows: auto repeat(9, 1fr);
  }

  @supports (height: 100dvh) {
    height: 100dvh;
  }
`;

export const ContenedorApp = styled.section`
  grid-column: 1 / 5;
  grid-row: 2 / 10;
  overflow-y: auto;
  padding: 0.5em;
  scroll-behavior: smooth;

  @media ${screenSizes.escritorio} {
    grid-column: 2 / 13;
    grid-row: 2 / 11;
    padding: 1em 1.2em 1em 1.2em;
  }
`;
