import type { FormEvent, InvalidEvent } from 'react';

type styles = React.CSSProperties | undefined;
type disabled = boolean | undefined;
type required = boolean | undefined;

export type TextProps = {
  id?: string;
  label: string;
  style?: styles;
  value?: string | number | boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  onBlur?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  placeholder?: string;
  readOnly?: boolean;
  readonly disabled?: disabled;
  readonly required?: required;
};

export type InputProps = {
  id?: string;
  label: string;
  name?: string;
  style?: styles;
  color?: string;
  value?: string | number | boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  readOnly?: boolean;
  validacionTexto?: (e: InvalidEvent<HTMLInputElement>) => void;
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
  readonly disabled?: disabled;
  readonly required?: required;
  readonly checked?: boolean | undefined;
  readonly horizontal?: boolean | undefined;
};
export type InputEmail = {
  domains?: string[];
  readonly multiple?: boolean;
} & InputProps;
export type InputLabelRadioProps = {
  readonly required?: required;
};
export type InputRadioProps = {
  id?: string;
  label: string;
  name?: string;
  style?: styles;
  color?: string;
  value?: string | number | boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  width?: boolean | undefined;
  readOnly?: boolean;
  readonly disabled?: disabled;
  readonly required?: required;
  readonly checked?: boolean | undefined;
  options: (string | number)[];
  orientation?: 'vertical';
  labelOrientation?: string;
  styleFont?: styles;
  styleContenedor?: styles;
};

export type SvgProps = {
  position: 'up' | 'down';
};
export type ContainerProps = {
  orientation?: 'vertical';
};
export type ContainerGeneralProps = {
  labelOrientation?: string;
  orientation?: 'vertical';
  width?: boolean | undefined;
};

export type CanvasType = React.MouseEvent<HTMLCanvasElement, MouseEvent>;
export type CanvasMovileType = React.TouchEvent<HTMLCanvasElement>;
