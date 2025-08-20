import styled from 'styled-components';

import { ColumnsType, StyleColumnType } from '../types/ContextType';

export const ContainerHeader = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--surface-first);
`;

export const HeadersStyle = styled.div<ColumnsType>`
  display: grid;
  grid-template-columns: ${({ numColumns }) => numColumns};
  padding: var(--space-fluid-3);
  background-color: var(--surface-third);
  border: 2px solid var(--gray-3);
  border-radius: var(--radius-2);
`;

export const ColumnName = styled.p`
  font-size: var(--paragraph);
  font-weight: 800;
  color: var(--color-primary-text);
  text-transform: capitalize;
`;

export const ConfigSection = styled.section`
  display: flex;
  justify-content: flex-end;
  gap: 1em;
  padding-bottom: 1em;
`;

export const ConfigButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-2);
  padding: var(--space-fluid-2);
  font-size: var(--messages);
  text-transform: capitalize;
  color: var(--color-white);
  background-color: var(--surface-second);
  transition: background-color 0.3s ease-in-out;
  cursor: default;

  :active {
    transform: scale(0.95);
    user-select: none;
  }
`;

export const ColumnStyle = styled.div<StyleColumnType>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: ${({ aligment }) => (aligment || 'flex-start')};
`;
