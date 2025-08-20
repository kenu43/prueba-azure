import React from 'react';
type styles = React.CSSProperties | undefined;

interface SelectProps {
	label: string;
	style?: styles;
	value?: string | number | boolean;
	name: string;
	onClick?: React.MouseEventHandler<HTMLOptionElement> | undefined;
	placeholder?: string;
	readonly disabled?: boolean | undefined;
	readonly required?: boolean | undefined;
}

export type keyBoardType = React.KeyboardEvent<HTMLParagraphElement>;
export type OptionObject = Record<string, any>;
export type TargetKey = keyof OptionObject;

export interface selectChild {
	children: React.ReactNode | React.ReactNode[];
}

export interface StateSelectType {
	options: OptionObject[];
	searchOption: string;
}

export interface StateSelectStringType {
	options: string[];
	searchOption: string;
}

export interface SelectObjectProps extends SelectProps {
	target: TargetKey;
	onChange: (v: OptionObject) => typeof v | void;
	optionsArray: Array<OptionObject>;
}

export interface SelectStringProps extends SelectProps {
	onChange: (v: string) => void;
	optionsArray: Array<string>;
}
