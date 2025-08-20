import styled from 'styled-components';

import { CanvasProps, IconProps } from '../types/FirmasTypes';

export const CanvasBox = styled.canvas<CanvasProps>`
	background-color: var(--gray-4);
	border: 1.5px solid ${({ required }) => (required ? 'var(--system-warning-color)' : 'transparent')};
	border-radius: var(--radius-3);
`;

export const ContenedorFirmas = styled.div`
	display: grid;
	place-items: center;
	box-sizing: border-box;
	overflow: hidden;
	height: fit-content;
	width: 90%;
`;

export const ContLabelIcono = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0.7em 0.5em 0.3em;
`;

export const IconosFirma = styled.div`
	display: flex;
	column-gap: 0.5em;
	align-items: center;
`;

export const Icono = styled.svg.attrs(() => ({
	viewBox: '0 0 24 24',
	x: '0px',
	y: '0px',
	xmlns: 'http://www.w3.org/2000/svg',
}))<IconProps>`
	cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
	transition: all 0.25s ease-in-out;
	transform: scale(0.8);
	fill: var(${({ disabled }) => (disabled ? '--gray-1' : '--color-primary-text')});
	width: var(--icons-size);
	height: var(--icons-size);

	:hover {
		fill: var(${({ disabled }) => (disabled ? '--color-primary-text' : '--brand-primary')});
	}
`;
