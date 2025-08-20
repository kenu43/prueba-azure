import { OptionObject } from './SelectTypes';

interface SelectProps {
	label: string;
	style?: React.CSSProperties;
	name: string;
	readonly disabled?: boolean;
	readonly required?: boolean;
	limite?: number;
	widthLabel?: string;
}

export interface SelectMultiStringProps extends SelectProps {
	onChange: (v: string[]) => void;
	optionsArray: Array<string>;
	value: string[];
}
export interface SelectMultiObjectProps extends SelectProps {
	onChange: (v: OptionObject[]) => void;
	optionsArray: Array<OptionObject>;
	value: OptionObject[];
	tarjet: keyof OptionObject;
}
export interface SelectionProps {
	readonly widthLabel?: string;
	readonly disabled?: boolean;
}
