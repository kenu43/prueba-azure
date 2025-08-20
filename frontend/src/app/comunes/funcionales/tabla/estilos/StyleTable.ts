import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';

export const ContainerTable = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--surface-first);
  width: 100%;
`;

export const TooltipIcon = styled.span`
  visibility: hidden;
  padding: var(--space-fluid-2);
  border-radius: var(--radius-2);
  background-color: var(--surface-toast);

  color: var(--color-secondary-text);
  text-align: center;
  font-size: var(--label);
  /* overflow-x: hidden;
	overflow-y: visible;
	white-space: nowrap;
	text-overflow: ellipsis; */

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;

  /* height: fit-content; */
  width: fit-content;
  bottom: 150%;
  left: 50%;
  margin-left: -150%; /* Use half of the width (120/2 = 60), to center the tooltip */

  ::after {
    content: ' ';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--surface-toast) transparent transparent transparent;
  }
`;
export const Icon = styled.svg.attrs((props) => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
  style: props.style,
  fill: 'transparent',
}))`
  width: var(--icons-size);
  height: var(--icons-size);
  stroke: var(--color-primary-text);
  cursor: pointer;
  :active {
    transform: scale(0.9);
  }
`;

export const IconContainer = styled.div`
  position: relative;
  display: inline-block;

  @media ${screenSizes.escritorio} {
    :hover ${Icon} {
      stroke: var(--brand-1);
    }
    :hover ${TooltipIcon} {
      visibility: visible;
    }
  }
`;
