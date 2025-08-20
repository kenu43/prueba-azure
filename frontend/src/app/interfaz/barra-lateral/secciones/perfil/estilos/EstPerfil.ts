import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';

export const ContPrincipal = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: var(--surface-first);
	height: -webkit-fill-available;
	width: 100%;
	align-items: center;
	border-radius: var(--radius-3);
	height: fit-content;
`;

export const ContPerfil = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1em;
	gap: 1em;
	margin: 2em 3em;
	background: white;
	border-radius: var(--radius-3);
`;

export const ContInfoPersonal = styled.div`
	display: flex;
	flex-direction: column;
	flex: 3;
	gap: 1em;

	@media ${screenSizes.escritorio} {
		padding: 0em 1em;
	}
`;

export const ContInfo = styled.div`
	display: flex;
	flex-direction: row;
`;

export const ContImagen = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	position: relative;
	justify-content: center;
`;

export const ContImagenUrl = styled.img<any>`
	border-radius: 50%;
	height: auto;
	max-width: 200px;
	min-width: 70px;

	@media ${screenSizes.escritorio} {
		position: absolute;

		top: -63px;
	}
	border: 8px solid var(--surface-first);
	display: inline-block;
	width: 200px;
	height: 200px;
	object-fit: cover;
`;

export const ContHeader = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	gap: 1em;
	flex-wrap: wrap;
	@media ${screenSizes.escritorio} {
		padding: 1em 0.5em;
	}
`;

export const ContModPermisos = styled.div`
	display: flex;
	flex-direction: column;
	text-align: justify;
	gap: 1em;
	padding: 1em;
	border-radius: var(--radius-3);
	background-color: var(--surface-second);
`;

export const ContPermisos = styled.div`
	display: flex;
	flex-direction: row;
	text-align: justify;
	gap: 1em;
	flex-wrap: wrap;
`;
export const ContTituloMod = styled.div`
	display: flex;
	flex-direction: row;
	font-size: calc(var(--paragraph) * 1.1);
	color: var(--color-primary-text);
	font-family: var(--font-family-secondary);
	font-weight: var(--font-semibold);
	padding-bottom: 0.3em;
`;

export const ContNombreUsuario = styled.div`
	display: flex;
	flex-direction: row;
	font-size: calc(var(--subtitle) * 1.1);
	color: var(--gray-11);
	font-family: var(--font-family-secondary);
	font-weight: var(--font-semibold);
	padding-bottom: 0.3em;
`;

export const ContMensajeria = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1em;
	gap: 1em;
	background-color: var(--surface-second);
	border-radius: var(--radius-3);
`;

export const ContActivarMensajeria = styled.div`
	display: flex;
	flex-direction: row;
	text-align: justify;
	gap: 1em;
	justify-content: space-between;
`;

export const ContTituloMensMod = styled.div`
	display: flex;
	flex-direction: row;
	font-size: calc(var(--paragraph) * 1.2);
	color: var(--color-primary-text);
	font-family: var(--font-family-secondary);
	font-weight: var(--font-semibold);
	padding-bottom: 0.3em;
`;
