export interface FormProps {
  children?: React.ReactNode;
  buttons?: React.ReactNode | React.ReactNode[];
  close?: any;
  style?: React.CSSProperties;
  tittle?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
}

export interface HeaderTypes {
  tittle: string;
  onClick: any;
}
export interface CardProps {
  estado?: boolean;
}
