import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';

export const UpperbarContainer = styled.section`
  grid-column: 1 / 5;
  grid-row: 1 / 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--gaps-3);
  border-bottom: 1px solid var(--surface-third);
  background-color: var(--base);
  padding: 0.25em 1em;
  box-shadow: var(--shadow-1);

  @media ${screenSizes.escritorio} {
    grid-column: 1 / 13;
    grid-row: 1 / 1;
    box-shadow: none;
  }
`;

export const UserCont = styled.div`
  display: flex;
  gap: var(--gaps-3);
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.small`
  font-weight: var(--font-medium);
  color: var(--brand-primary);
`;

export const Rol = styled.small`
  color: var(--brand-secondary);
  font-weight: var(--font-medium);
  font-style: italic;
`;

export const Version = styled.p`
  color: var(--color-primary-text);
  font-size: var(--messages);
  font-weight: var(--font-medium);
  background-color: var(--surface-first);
  padding: var(--space-fluid-2);
  border-radius: var(--radius-2);
`;
