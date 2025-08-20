import styled from 'styled-components';
import { BackgroudColor } from 'comunes/controles/Buttons/estilos/Animations';

import { StylePropsType } from '../types/StyleTypes';
import { ColumnsType } from '../types/ContextType';

export const ContainerData = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
`;

export const ContainerColumns = styled.div<ColumnsType>`
  display: grid;
  grid-template-columns: ${({ numColumns }) => numColumns};
  padding: var(--space-fluid-2);
  box-shadow: var(--shadow-2);

  :nth-child(2n + 1) {
    background-color: var(--surface-second);
  }
`;

export const RowContainer = styled.p<StylePropsType>`
  display: flex;
  align-items: center;
  font-size: var(--paragraph);
  color: var(--color-primary-text);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: ${({ aligment }) => (aligment || 'flex-start')};
`;

export const Controls = styled.section`
  display: flex;
  gap: 0.5em;
  align-items: center;
  padding: var(--space-fluid-2);
  border: 1.5px solid var(--gray-3);
  border-radius: var(--radius-round);
  background-color: var(--surface-first);
  width: fit-content;
  align-self: flex-end;
`;
export const LoadingTable = styled.div`
  border-radius: var(--radius-2);

  height: 20px;
  width: 90%;

  background: linear-gradient(90deg, #eaf0f0, #d8d0d0);
  background-size: 200%;
  animation: ${BackgroudColor} 3s linear infinite;
`;
export const ImgSinDatos = styled.img`
  max-height: 300px;
  max-width: 300px;
`;
