import { type ChangeEventHandler } from 'react';

export interface EstConsultarType {
	disabled?: boolean;
}

interface SearchAlgoliaFiltroTypeBase {
	readonly obligatorio?: boolean;
	readonly bloqueado?: boolean;
	valorActual: string;
}

export interface SearchAlgoliaInfoType {
	label: string;
	value: any;
	style?: React.CSSProperties;
}
export interface ContenedorProps {
	obligatorio?: boolean;
	readonly bloqueado?: boolean;
}
export interface SvgAlgoliaProps {
	readonly bloqueado?: boolean;
	ver?: any;
}
export interface OpcionProps {
	ver: boolean | undefined;
}
interface IopcionAlgolia {
	cedulaNit: string;
	nombreContratista: string;
	id: string;
	objectID: string;
	otroServicio: string;
	_highlightResult: unknown;
}
interface IEventAlgoliaSearchHandler {
	palabraClave: string;
	data: Partial<IopcionAlgolia>;
}
export interface SelectFiltroProps {
	valor: string;
	opciones: IopcionAlgolia[];
	obligatorio?: boolean;
	readonly bloqueado?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	evento?: (props: IEventAlgoliaSearchHandler) => void;
	alto?: string;
	readonly mostrarLista?: boolean;
	style?: React.CSSProperties;
	valorActual: string;
}

export interface IstateFiltro {
	mostrarLista: boolean;
	palabraClave: string;
	datos: IEventAlgoliaSearchHandler['data'][];
}
export interface SearchAlgoliaFiltroType extends SearchAlgoliaFiltroTypeBase {
	readonly disabled?: boolean;
	readonly permisos?: string[];
	readonly obligatorio?: boolean;
	datosConsultados: (props: IEventAlgoliaSearchHandler['data']) => void;
}
export interface SearchAlgoliaType {
	disabled?: boolean;
	permisos: string[];
	datosConsultados: (props: IEventAlgoliaSearchHandler['data']) => void;
	obligatorio?: boolean;
	style?: React.CSSProperties;
	valorActual: string;
}
