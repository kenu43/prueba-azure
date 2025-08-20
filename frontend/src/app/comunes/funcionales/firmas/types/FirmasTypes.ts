export interface IconProps {
	disabled?: boolean;
}
export interface CanvasProps {
	required?: boolean;
}
export interface MousPositionState {
	xBefore: number;
	yBefore: number;
	xAfter: number;
	yAfter: number;
}

export interface FirmasProps {
	readonly disabled?: boolean;
	readonly required?: boolean;
	style?: React.CSSProperties;
	permisos: string[];
	firma: string;
	path: string;
	label: string;
	onChange: (url: string) => void;
}
