export interface BarraPropsType {
	value: number;
	max?: number;
	width?: string;
	style?: React.CSSProperties;
}

export interface ContainerBarraPropsType {
	width?: string;
	color?: string;
}
export type ColorPropType = (color?: string) => string;
