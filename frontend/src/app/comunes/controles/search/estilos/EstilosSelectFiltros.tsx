import styled, { css, keyframes } from 'styled-components';

import { ContenedorProps, OpcionProps, SvgAlgoliaProps } from '../types/SearchTypes';
import { tipoCampo } from '../funciones/Funciones';

export const verLista = keyframes`
   0% {
    -webkit-transform: scaleY(0.2);
    transform: scaleY(0.2);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }

  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
 `;

export const ocultar = keyframes`
  0% {
      -webkit-transform: scaleY(1);
      transform: scaleY(1);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
  }

  100% {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
    }
 `;

export const entrada = keyframes`
   0% {
    -webkit-transform: translateX(-200px);
            transform: translateX(-200px);
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
 `;

export const salida = keyframes`
0% {
 -webkit-transform: translateX(0px);
         transform: translateX(0px);
}
100% {
 -webkit-transform: translateX(-100px);
         transform: translateX(-100px);
}
`;

export const Contenedor = styled.div<ContenedorProps>`
	position: relative;
	height: 1em;
	min-height: 2em;
	margin-top: 0.313em;
	border: ${({ obligatorio, bloqueado }) => tipoCampo({ obligatorio, bloqueado })};
	border-radius: var(--radius-1);
	padding: 0.3em 0.3em;
	box-sizing: border-box;
	width: 100%;
	background-color: var(--surface-first);
`;

export const Input = styled.input.attrs<ContenedorProps>(({ obligatorio, bloqueado }) => ({
	type: 'text',
	required: obligatorio,
	disabled: bloqueado,
}))<ContenedorProps>`
	width: 100%;
	/* padding: 0.3em; */
	height: 1em;
	background-color: var(--surface-first);
	border: none;
	outline: none;
	font-family: var(--font-family-primary);
	font-size: var(--avisos);
	color: var(--color-primary-text);
	transition: all 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);

	:focus {
		border-radius: var(--radius-1);
	}
`;

export const Opcion = styled.div<OpcionProps>`
	font-size: var(--etiqueta);
	opacity: 0;
	padding: 0.5em;
	color: var(--color-primary-text);

	:last-child {
		border-bottom: none;
	}

	${(ver) =>
		ver
			? css`
					opacity: 1;
					animation: ${entrada} 0.2s 0.1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
				`
			: css`
					animation: ${salida} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
				`};

	-webkit-tap-highlight-color: transparent;

	:hover {
		border-radius: var(--radius-1);
		background-color: var(--surface-second);
	}
`;

export const Opciones = styled.div<OpcionProps>`
	font-family: var(--font-family-primary);
	background-color: var(--surface-first);
	border-radius: var(--radius-1);
	box-shadow: var(--shadows);
	box-sizing: border-box;
	justify-content: space-between;
	overflow: auto;
	opacity: 0;
	padding: 0.5em;
	position: absolute;
	scroll-behavior: smooth;
	top: 45px;
	left: 0;
	transition:
		visibility 0.2s ease-in,
		opacity 0.2s ease-out;
	visibility: hidden;
	width: 100%;
	z-index: 1;
	${(props) =>
		props.ver
			? css`
					visibility: visible;
					opacity: 1;
					animation: ${verLista} 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
				`
			: css`
					animation: ${ocultar} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
				`};

	::-webkit-scrollbar {
		width: 10px;
	}
	::-webkit-scrollbar-track {
		border-radius: var(--radius-1);
		background: var(--gris);
	}
	::-webkit-scrollbar-thumb {
		background: var(--surface-fourth);
		border-radius: var(--radius-1);
	}
	::-webkit-scrollbar-thumb:hover {
		border-radius: var(--radius-1);
		background: var(--brand-primary);
	}
`;

export const SVG = styled.svg.attrs<SvgAlgoliaProps>(({ bloqueado }) => ({
	viewBox: '0 0 24 24',
	x: '0px',
	y: '0px',
	xmlns: 'http://www.w3.org/2000/svg',
	disabled: bloqueado,
}))<SvgAlgoliaProps>`
	transform: ${({ ver }) => (ver ? 'rotate(45deg)' : 'rotate(0deg)')};
	transition: all 0.22s ease-in-out;
	fill: ${({ ver }) => (ver ? 'var(--brand-secondary)' : 'var(--brand-primary)')};
	cursor: pointer;
	margin-left: 0.3em;
`;

export const Acciones = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;
