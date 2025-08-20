import { AnimacionBotonTypes, IconoFiltrosTypes, InitialStateType } from '../types/FiltrosTypes';
import { controles, navegacion } from '../../../recursos/Iconografia';

export const ViewBox: AnimacionBotonTypes = {
	close: '0 0 24 24',
	apply: '0 0 24 24',
	delete: '0 0 18 18',
	dates: '-2 -2 24 24',
	next: '0 0 24 24',
	before: '0 0 24 24',
};
export const IconoBoton: IconoFiltrosTypes = {
	close: controles.cerrar.path,
	apply: controles.filtro.path,
	delete: controles.quitar.path,
	dates: controles.calendario.path,
	next: navegacion.rightArrow.path,
	before: navegacion.leftArrow.path,
};
export const TooltipBotonLabel: AnimacionBotonTypes = {
	close: 'Cerrar',
	apply: 'Aplicar',
	delete: 'Limpiar',
	dates: 'Fechas',
	next: 'Siguiente',
	before: 'Anterior',
};

export const AnimacionBoton: AnimacionBotonTypes = {
	close: 'stroke: var(--brand-primary);	rotate: 90deg;',
	apply: 'fill: var(--brand-primary); stroke: var(--brand-primary); scale:80%;',
	delete: 'stroke: var(--brand-primary); rotate: 180deg; fill: var(--brand-primary);',
	dates: 'fill: var(--toast-success-color); stroke: var(--toast-success-color); scale:80%;',
	next: 'stroke: var(--brand-primary); animation-duration: 1s; animation-iteration-count: infinite; animation-direction: alternate;',
	before:
		'stroke: var(--brand-primary); animation-duration: 1s; animation-iteration-count: infinite; animation-direction: alternate;',
};

export const EstadoInicial: InitialStateType = {
	pagina: 0,
	nPages: 1,
	pageFecha: 0,
};
