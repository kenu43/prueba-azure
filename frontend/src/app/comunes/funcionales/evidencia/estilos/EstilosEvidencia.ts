import styled from 'styled-components';
import { zoomIn } from 'comunes/estilos/Animaciones';

import { DivEvidenciaProps } from '../types/EvidenciasTypes';

export const DivEvidencia = styled.div<DivEvidenciaProps>`
  display: flex;
  flex-direction: column;
  border: 1.5px solid
    ${({ required, evidencia }) =>
      required && !evidencia ? 'var(--system-warning-color)' : 'none'};
  background-color: var(--gray-1);
  padding: 0.5rem;
  width: 15rem;
  justify-self: center;
  border-radius: var(--radius-3);
  box-shadow: var(--shadows);
  align-items: center;
  @media (prefers-color-scheme: dark) {
    background-color: var(--gray-9);
  }
`;
export const Label = styled.label`
  color: var(--color-primary-text);
  font-size: var(--label);
  padding-bottom: var(--gaps-2);
`;
export const InputOculto = styled.input.attrs(() => ({
  type: 'number',
  min: 1,
}))`
  width: 0;
  height: 0;
  opacity: 0;
`;

/* Modal evidencia */
export const DivFlex = styled.div`
  display: flex;
  align-items: center;
  background: var(--shadow-gray-dark);
  position: fixed;
  top: 0.1px;
  left: 0.1px;
  right: 0.1px;
  bottom: 0.1px;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;
export const Container = styled.div`
  background: var(--surface-first);
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-3);
  transition: 0.3s ease-in-out;
  box-shadow: var(--shadow-3);
  text-align: center;
  animation: ${zoomIn} 0.2s ease-in-out;
  width: 55vw;
  height: 52vh;
`;
export const BoxTitleMini = styled.div`
  background: var(--brand-secondary);
  border-radius: var(--radius-3) var(--radius-3) 0 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0.1rem 0.5rem;
`;
export const Title = styled.h3`
  font-size: var(--subtitulo);
  color: var(--brand-primary);
`;
export const DivMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--gaps-2);
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
export const LabelEvidencia = styled.label`
  width: -webkit-fill-available;
  text-align: left;
  color: var(--color-primary-text);
  font-size: var(--paragraph);
  padding: 1rem 0.5rem;
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const Form = styled.div`
  background: var(--surface-third);
  border: 1px solid var(--gray-5);
  border-radius: var(--radius-3);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  overflow-y: auto;
`;
export const DivInput = styled.div`
  display: grid;
  grid-template-columns: 90% 5% 5%;
  align-items: center;
  justify-items: center;
  width: 100%;
`;
export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding-top: 0.5em;
  justify-content: space-between;
`;
export const Nota = styled.p`
  margin: 0.5rem;
  font-size: var(--messages);
  color: var(--toast-info-color);
`;
