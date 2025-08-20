import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--gaps-3);
  padding: var(--space-fluid-2);
  background-color: var(--surface-first);
  border-radius: var(--radius-2);
`;

export const StepNav = styled(NavLink)`
  font-size: var(--messages);
  color: var(--color-primary-text);
  text-decoration: none;
  margin: 0 0.25em;

  :last-child {
    text-decoration: var(--brand-10) underline 2px;
    font-weight: var(--font-semibold);
  }

  @media ${screenSizes.escritorio} {
    :hover {
      font-weight: var(--font-semibold);
    }
  }
`;

export const RoutesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: auto;

  .active {
    color: var(--color-secondary-text);
  }
`;

export const NavArrows = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  ::before {
    content: 'Regresar';
    position: absolute;
    top: 130%;
    left: -100%;
    border-radius: var(--radius-1);
    background-color: var(--surface-second);
    color: var(--color-primary-text);
    padding: var(--space-fluid-2);
    pointer-events: none;
    opacity: 0;
    z-index: 1;
    font-size: var(--messages);
  }
`;

export const Arrow = styled.svg.attrs((props) => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
  style: props.style,
  fill: 'none',
}))`
  width: var(--icons-size);
  height: var(--icons-size);
  fill: var(--gray-6);

  cursor: pointer;

  :active {
    transform: scale(0.9);
  }

  @media ${screenSizes.escritorio} {
    :hover {
      fill: var(--brand-primary);
    }
  }
`;
