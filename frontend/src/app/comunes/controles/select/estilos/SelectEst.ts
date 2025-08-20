import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import { ocultar, verLista } from 'comunes/estilos/Animaciones';

import { SelectionProps } from '../types/SelectMultiTypes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: fit-content;
  width: 100%;
`;

export const Opciones = styled.div`
  position: absolute;
  background-color: var(--base);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-3);
  box-sizing: border-box;
  justify-content: space-between;
  overflow: auto;
  padding: 0.5em;
  scroll-behavior: smooth;
  top: 110%;
  left: 0;
  width: 100%;
  max-height: 9rem;
  opacity: 0;
  z-index: var(--layer-2);
  animation: ${ocultar} 0.25s cubic-bezier(0.39, 0.575, 0.565, 1) both;

  :not([role='combobox']) {
    opacity: 1;
    animation: ${verLista} 0.25s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
`;

export const Opcion = styled.p`
  font-size: var(--paragraph);
  padding: 0.5em;
  color: var(--color-primary-text);
  border-radius: var(--radius-3);
  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

  :hover {
    border-radius: var(--radius-2);
    background-color: var(--surface-first);
  }

  :focus {
    outline: none;
    border-radius: var(--radius-2);
    background-color: var(--surface-);
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
  border-radius: var(--radius-3);
  padding: var(--space-fluid-2);
  color: var(--color-primary-text);
  min-height: 2em;
  font-size: var(--paragraph);
  background-color: var(--surface-first);
  width: 100%;
  transition: all 0.3s var(--ease-out-2);

  :focus {
    box-shadow: var(--shadow-2);
    transition: all 0.3s var(--ease-out-2);
    background-color: var(--base);
  }

  :disabled {
    background-color: var(--system-disabled-color);
    color: var(--color-black);
    cursor: not-allowed;
  }

  :required {
    border: 1.5px solid var(--system-warning-color);
  }

  :read-only {
    border: 1.5px solid transparent;
  }
`;

export const Selections = styled.label<SelectionProps>`
  display: flex;
  align-items: center;

  padding: 0.2rem 0.5rem;
  background-color: var(--brand-primary);
  border-radius: var(--radius-3);
  width: fit-content;

  font-size: var(--label);
  font-weight: var(--font-medium);
  color: var(--color-primary-text);
  box-shadow: var(--shadow-3);

  > p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
 color: white;
    max-width: ${({ widthLabel }) => widthLabel || '10rem'};
  }

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-round);
    background-color: var(--surface-first);
    cursor: ${({ disabled }) => !disabled && 'pointer'};

    width: 16px;
    height: 16px;
    margin-left: 0.5rem;

    > svg {
      fill: var(--color-primary-text);
      transition: transform 0.5s var(--ease-5);
    }

    :hover {
      box-shadow: ${({ disabled }) => !disabled && 'var(--inner-shadow-2)'};
    }
    :hover > svg {
      fill: ${({ disabled }) => !disabled && 'var(--brand-primary)'};
    }
  }
`;

export const SelectionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0.5rem;
  padding: 1rem;

  border-top: 1px solid var(--color-primary-text);
`;

export const DivInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  :has(input:disabled) {
    > svg {
      cursor: auto;
      pointer-events: none;
    }
  }
`;

export const MultiContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--surface-third);
  border-radius: var(--radius-3);
  background-color: var(--surface-first);
`;

export const SVG = styled.svg.attrs(() => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
}))`
  position: absolute;
  top: calc(var(--paragraph) * 2 / 0.8);
  right: 1%;
  width: calc(var(--icons-size) * 0.8);
  height: calc(var(--icons-size) * 0.8);
  stroke: var(--color-primary-text);
  stroke-width: 3px;
  fill: none;
  margin-right: 0.3em;
  transform: rotate(0deg);
  transition: transform 0.5s var(--ease-5);
  cursor: pointer;
  pointer-events: none;

  :not([role='button']) {
    stroke: var(--brand-secondary);
    transform: rotate(180deg);
    transition: all 0.5s var(--ease-5);
  }

  @media ${screenSizes.escritorio} {
    :hover {
      stroke: var(--brand-secondary);
    }
  }
`;

export const DeleteSVG = styled.svg.attrs(() => ({
  x: '0px',
  y: '0px',
  viewBox: '0 0 20 20',
  xmlns: 'http://www.w3.org/2000/svg',
}))`
  width: calc(var(--icons-size) * 0.8);
  height: calc(var(--icons-size) * 0.8);
  stroke-width: 3px;
  margin-left: 0.3em;
  cursor: pointer;

  :hover {
    fill: var(--brand-primary);
  }
`;
