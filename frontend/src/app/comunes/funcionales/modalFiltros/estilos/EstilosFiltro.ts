import styled, { keyframes } from 'styled-components';

import { butonsTypes } from '../types/FiltrosTypes';
import { AnimacionBoton } from '../constantes/Constantes';
const slideRightReturn = keyframes`
  0% {
    transform-origin: 0 0;
    transform: translateX(0%);
  }
  20% {
    transform-origin: 0 0;
    transform: translateX(20%);
    }
  100% {
    transform-origin: 0 0;
    transform: translateX(0%);
    }
`;
const slideLeftReturn = keyframes`
  0% {
    transform-origin: 0 0;
    transform: translateX(0%);
  }
  20% {
    transform-origin: 0 0;
    transform: translateX(-20%);
  }
  100% {
    transform-origin: 0 0;
    transform: translateX(0%);
    }
`;
const slideLeftReturnModal = keyframes`
  0% {
    transform-origin: 0 0;
    transform: translateX(100%);
  }
  100% {
    transform-origin: 0 0;
    transform: translateX(0);
    }
`;

export const ContenedorFiltroGeneral = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5em;
  display: flex;
  width: fit-content;
  z-index: var(--layer-3);
  border-radius: var(--radius-3);

  animation: ${slideLeftReturnModal} 0.3s var(--ease-in-2);
`;

export const ContenedorFiltro = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--base);
  border-radius: var(--radius-3);
  border: 0.5px solid var(--surface-third);
  max-height: 98vh;
  max-width: min(85vw, 400px);
  overflow: hidden;
  gap: 0.5rem;
  text-align: center;
`;

export const Header = styled.div`
  background-color: var(--brand-primary);
  padding: var(--space-fluid-2);
  text-align: center;
  font-size: var(--subtitle);
  color: var(--gray-0);
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: -webkit-fill-available;
  overflow-y: auto;
  gap: 0.5rem;
  padding: var(--space-fluid-3);
`;

export const ContenedorBotones = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  height: fit-content;

  top: 5px;

  padding: var(--space-fluid-3);
`;

export const FiltroSVG = styled.svg`
  width: var(--icons-size);
  height: var(--icons-size);
  transition-duration: 0.3s;
`;

export const TooltipBoton = styled.span`
  display: none;
  padding: var(--space-fluid-2);
  border-radius: var(--radius-2);
  background-color: #3c3c3c;
  color: #fff;
  text-align: center;
  font-size: var(--label);
  position: absolute;
  z-index: var(--layer-2);
  width: fit-content;
  right: 100%;

  ::after {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 100%; /* To the right of the tooltip */
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent #3c3c3c;
  }
`;

export const BotonFiltro = styled.div<butonsTypes>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--icons-size) * 1.5);
  height: calc(var(--icons-size) * 1.5);
  border-radius: var(--radius-round);
  background-color: var(--base);
  border: 0.5px solid var(--surface-third);

  cursor: pointer;

  :hover {
    box-shadow: var(--inner-shadow-3);
  }

  :hover > ${FiltroSVG} {
    ${({ func }) => (func ? AnimacionBoton[func] : '')}
    animation-name: ${({ func }) => {
      if (func === 'next') return slideRightReturn;
      else if (func === 'before') return slideLeftReturn;
      return 'none';
    }}
  }

  :hover > ${TooltipBoton} {
    display: block;
  }
`;
