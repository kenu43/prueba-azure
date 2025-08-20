import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';

import { EstConsultarType } from '../types/SearchTypes';

export const ContBuscadores = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2em;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 1em 0em;
  flex-wrap: wrap;
`;

export const ContBuscadoresFiltros = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 1em 0em;
`;

export const ContenedorAlgolia = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  @media ${screenSizes.movil} {
    flex-direction: column;
    align-items: center;
  }
`;
export const ContenedorSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  border-radius: var(--radius-3);
`;

export const EtiquetaAlgolia = styled.p`
  font-size: var(--subtitle);
  font-weight: 700;
  margin: 0;
  color: var(--color-primary-text);
  text-align: justify;
`;
export const ContBuscadoresAlgolia = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`;

export const ContFiltroAlgolia = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: center;
  justify-content: flex-start;
  background-color: var(--surface-second);
  padding: var(--gaps-2);
  border-radius: var(--radius-2);
`;

export const ContBuscador = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  align-items: flex-start;
  font-size: var(--etiqueta);
  font-weight: 500;
  margin: 0;
  color: var(--color-primary-text);
  min-width: 200px;
`;
export const ContBuscadorFiltros = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  align-items: flex-start;
  font-size: var(--etiqueta);
  font-weight: 500;

  margin: 0;
  color: var(--color-primary-text);
`;

export const BotonConsultar = styled.div<EstConsultarType>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-primary-text);
  width: fit-content;
  height: fit-content;
  padding: 0.5em 1em;
  background-color: ${({ disabled }) =>
    disabled ? 'var(--surface-fourth)' : 'var(--brand-primary)'};
  border: none;
  border-radius: var(--radius-3);
  outline: none;
  color: var(--gray-0);
  cursor: pointer;
  font-weight: 600;

  :active {
    transform: ${({ disabled }) => (disabled ? 'unset' : 'scale(0.95)')};
    box-shadow: ${({ disabled }) =>
      disabled ? 'var(--shadows)' : 'var(--shadows)'};
  }
`;

export const ContFlex = styled.div`
  display: flex;
  align-items: center;
`;
