import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import { zoomIn } from 'comunes/estilos/Animaciones';

export const BotonPrincipal = styled.div`
	position: absolute;
	right: 50px;
	width: 56px;
	height: 56px;
	top: 120px;
	background-color: var(--surface-third);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: 0.3s;
	z-index: 3;
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
	fill: var(--color-primary-text);
	cursor: pointer;
	:active {
		transform: scale(0.9);
	}
`;

export const ContVisualizarError = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1em;
	width: 100%;
	height: 100%;
`;

export const ContVideos = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1em;
	justify-content: center;
`;
export const FormCard = styled.div<any>`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border-radius: var(--radius-2);
	box-shadow: var(--shadow-3);
	animation: ${zoomIn} 0.3s var(--ease-5);
	width: 100%;
	max-height: 95vh;
	max-width: 95vw;
	background: var(--surface-first);

	@supports (max-height: 95dvh) {
		max-height: 95dvh;
	}

	@media ${screenSizes.escritorio} {
		max-width: 75vw;
		max-height: 90vh;

		@supports (max-height: 90dvh) {
			max-height: 90dvh;
		}
	}
`;

export const ContFlechas = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 1em 0em;
	width: auto;
	align-items: center;
`;

export const ContTituloFlecha = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 1em 0em;
	gap: 0.5em;
	align-items: center;
	flex: 1;
`;
