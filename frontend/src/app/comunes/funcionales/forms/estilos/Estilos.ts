import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import { zoomIn } from 'comunes/estilos/Animaciones';

import { CardProps } from '../types/FormTypes';

export const FormCard = styled.form<CardProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-3);
  animation: ${zoomIn} 0.3s var(--ease-5);
  margin: 0 0.5em;
  max-height: 95vh;

  @supports (max-height: 95dvh) {
    max-height: 95dvh;
  }

  @media ${screenSizes.escritorio} {
    width: 65vw;
    max-height: 90vh;

    @supports (max-height: 90dvh) {
      max-height: 90dvh;
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

export const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-bottom-left-radius: var(--radius-2);
  border-bottom-right-radius: var(--radius-2);
  padding: var(--gaps-2) var(--gaps-3);
  background-color: var(--base);
  overflow-y: auto;
  width: -webkit-fill-available;
`;

export const SectionBtnStyle = styled.section`
  display: flex;
  align-items: center;
  margin-top: var(--gaps-1);
  border-radius: var(--radius-2);
  background-color: var(--surface-first);

  @media ${screenSizes.escritorio} {
    align-self: flex-end;
  }
`;

export const DetailBotones = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: var(--gaps-2);
  overflow-x: auto;
  padding: 0.25em;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-fluid-2);
  border-top-left-radius: var(--radius-2);
  border-top-right-radius: var(--radius-2);
  background-color: var(--brand-primary);
  width: -webkit-fill-available;
  gap: 0.5em;
`;

export const SubtituloModal = styled.h4`
  font-weight: var(--font-semibold);
    color: white;
  font-family: var(--font-family-secondary);
  text-align: center;

  @media ${screenSizes.movil} {
    max-width: 30ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const SvgContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Controls = styled.svg.attrs(() => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
}))`
  width: calc(var(--icons-size) * 0.8);
  height: calc(var(--icons-size) * 0.8);
  stroke-width: 1.5px;
  fill: white;
  transform: rotate(0deg);
  margin-right: var(--gaps-3);

  :active {
    transform: scale(0.9);
  }

  @media ${screenSizes.escritorio} {
    :hover {
      fill: var(--brand-secondary);
    }
  }
`;

export const Close = styled.svg.attrs(() => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
}))`
  width: var(--icons-size);
  height: var(--icons-size);
  stroke-width: 2px;
  stroke: white;
  transform: rotate(0deg);
  transition: transform 0.5s var(--ease-5);

  @media ${screenSizes.escritorio} {
    :hover {
      transform: rotate(360deg);
      transition: all 0.5s var(--ease-5);
    }
  }
`;

export const Icon = styled.svg.attrs(() => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
}))`
  width: calc(var(--icons-size) * 1.2);
  height: calc(var(--icons-size) * 1.2);
  stroke-width: 1px;
  transform: rotate(0deg);
  fill: currentcolor;
  stroke: var(--color-primary-text);
  :active {
    transform: scale(0.9);
  }

  @media ${screenSizes.escritorio} {
    :hover {
      fill: var(--brand-secondary);
    }
  }
`;

export const NombreBotones = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.3em;
  align-items: center;
  color: var(--color-primary-text);
  cursor: pointer;
`;
