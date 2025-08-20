import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import { PropsAvisos } from 'app/comunes/types/ComunesTypes';
import { seleccionarColor } from 'app/comunes/funciones/Funciones';

export const StyleCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-fluid-1);
`;

export const ContFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContFlexRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const VinculosSoporte = styled(Link)`
  background-color: var(--brand-2);
  border-radius: var(--radius-conditional-1);
  padding: 0.5em 1em;
  color: var(--color-white);
  font-weight: var(--font-bold);
  text-decoration: none;
  font-size: var(--title);
`;
export const TituloGradiente = styled.h1`
  font-size: calc(var(--title) * 1.1);
  font-weight: var(--font-bold);
  text-align: center;
  background-color: var(--brand-primary);
  background-size: 100%;
  background-clip: text;
  z-index: var(--layer-1);
  width: fit-content;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;

  @media ${screenSizes.movil} {
    font-size: calc(var(--title));
  }

  @media ${screenSizes.tablet} {
    font-size: calc(var(--title) * 1);
  }
`;

export const Titulo = styled.h1`
  font-size: var(--title);
  font-weight: var(--font-medium);
  color: var(--brand-primary);
  font-family: var(--font-family-secondary);
  text-align: center;
`;

export const Subtitulo = styled.h3`
  font-size: var(--subtitle);
  font-weight: var(--font-medium);
  color: var(--brand-secondary);
  font-family: var(--font-family-secondary);
  text-align: center;
`;

export const Parrafo = styled.p`
  font-size: var(--paragraph);
  color: var(--color-primary-text);
`;

export const Etiqueta = styled.p`
  font-size: var(--label);
  font-family: var(--font-family-secondary);
  color: var(--color-secondary-text);
  font-weight: var(--font-medium);
  padding-bottom: 0.3em;
`;

export const Avisos = styled.p<PropsAvisos>`
  font-size: var(--messages);
  white-space: pre-line;
  color: ${({ fontColor }) => seleccionarColor(fontColor)};
`;

export const Vinculos = styled(Link)`
  background-color: var(--color-add-2);
  border-radius: var(--radius-conditional-1);
  padding: 0.5em 1em;
  color: var(--color-black);
  text-decoration: none;
  font-size: var(--label);
`;
