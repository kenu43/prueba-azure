import { Link } from 'react-router-dom';
import styled from 'styled-components';

import type {
  StyleIconLink,
  StyleProps,
  StylePropsLink,
} from '../types/ButtonTypes';

import { screenSizes } from '../../../../../configuraciones/VariablesEstaticasGlobales';
import { colors, sizes } from '../constantes/ButtonConst';
import { BackgroudColor, BtnAIconAnimation } from './Animations';

export const ButtonLoading = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--gaps-1);
  padding: ${({ size }) => sizes[size] ?? sizes.normal};
  border-radius: var(--radius-2);
  background: linear-gradient(
    90deg,
    ${({ typeBtn }) => colors[typeBtn]?.[0] ?? colors.primary[0]},
    ${({ typeBtn }) => colors[typeBtn]?.[1] ?? colors.primary[0]}
  );
  background-size: 300%;
  box-sizing: border-box;
  width: fit-content;
  animation: ${BackgroudColor} 3s linear infinite;

  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
`;

export const ButtonStyle = styled.button<StyleProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--gaps-1);
  cursor: pointer;
  padding: ${({ size }) => sizes[size] ?? sizes.normal};
  border-radius: var(--radius-2);
  background: linear-gradient(
    90deg,
    ${({ typeBtn }) => colors[typeBtn]?.[0] ?? colors.primary[0]},
    ${({ typeBtn }) => colors[typeBtn]?.[1] ?? colors.primary[0]}
  );
  background-size: 300%;
  box-sizing: border-box;
  font-size: var(--paragraph);
  font-weight: ${({ typeBtn }) =>
    ['removeFilter', 'correo', 'pdf'].includes(typeBtn)
      ? 'var(--font-regular)'
      : 'var(--font-bold)'};
  color: ${({ typeBtn }) =>
    ['removeFilter', 'correo', 'pdf', 'primary', 'new', 'delete'].includes(
      typeBtn,
    )
      ? 'var(--gray-0)'
      : 'currentColor'};
  outline: none;
  border: none;
  max-height: 2em;
  transition: all 0.4s var(--ease-5);

  :active {
    transform: scale(0.95);
  }

  :disabled {
    background: var(--gray-3);
    color: var(--gray-7);
    pointer-events: none;
  }

  @media ${screenSizes.escritorio} {
    :hover {
      svg {
        animation-delay: 0.3s;
        animation: ${BtnAIconAnimation} 1s linear infinite;
      }

      box-shadow: var(--shadow-3);
      transition: box-shadow 0.3s var(--ease-5);
    }
  }

  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const LinkContainer = styled(Link)<StylePropsLink>`
  position: relative;
  display: flex;
  ${({ goback }) => (goback ? 'flex-direction:row-reverse;' : '')}
  justify-content: center;
  align-items: center;
  gap: var(--gaps-2);
  padding: ${({ size }) => sizes[size] ?? sizes.normal};
  box-sizing: border-box;
  width: fit-content;
  font-size: var(--paragraph);
  outline: none;
  text-decoration: none;

  :active {
    transform: scale(0.95);
  }

  @media ${screenSizes.escritorio} {
    :hover {
      span,
      svg {
        font-weight: var(--font-semibold);
        color: var(--color-primary-text);
        transition: all 0.4s ease-in;
      }

      ::before {
        background-color: var(--surface-first);
        transition: all 0.4s ease-in;
      }

      i::before {
        width: 1.5em;
        height: 0.15em;
        left: 1%;
      }

      i::after {
        width: 1.5em;
        left: 65%;
        height: 0.15em;
      }
    }
  }

  ::before {
    position: absolute;
    content: '';
    inset: 2px;
    border-radius: var(--radius-2);
    border: 1.5px solid var(--brand-primary);
    background-color: var(--brand-primary);
    transition: background 0.4s ease-in;
  }

  span,
  svg {
    position: relative;
    color: var(--color-white);
    transition: all 0.4s ease-in;
  }

  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
`;

export const IStyle = styled.i`
  position: absolute;
  inset: 0;
  display: block;

  ::before {
    content: '';
    position: absolute;
    top: 0.05em;
    left: 70%;
    width: 1em;
    height: 0.2em;
    background-color: var(--surface-first);
    transform: translateX(50%) skewX(325deg);
    transition: all 0.5s var(--ease-in-out-5);
  }

  :after {
    content: '';
    position: absolute;
    bottom: 0.125em;
    left: 8%;
    width: 1em;
    height: 0.2em;
    background-color: var(--surface-first);
    transform: translateX(20%) skewX(325deg);
    transition: all 0.5s var(--ease-in-out-5);
  }
`;

export const Icon = styled.svg.attrs(() => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
}))<StyleIconLink>`
  width: 1em;
  height: 1em;
  fill: currentColor;
  ${({ goback }) => (goback ? 'transform: rotate(180deg);' : '')}
`;
