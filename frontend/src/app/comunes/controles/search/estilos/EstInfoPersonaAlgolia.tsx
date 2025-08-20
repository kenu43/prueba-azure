import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import styled from 'styled-components';

export const ContInfoPersonas = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  @media ${screenSizes.movil} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const EtiquetaLabel = styled.p`
  font-size: var(--subtitle);
  font-weight: 700;
  margin: 0;
  color: var(--color-primary-text);
`;

export const EtiquetaValue = styled.p`
  font-size: var(--subtitle);
  font-weight: 500;
  margin: 0;
  color: var(--color-primary-text);
`;
