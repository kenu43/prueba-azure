type styles = React.CSSProperties | undefined;
type disabled = boolean | undefined;

export interface sizesType {
  small: string;
  normal: string;
  large: string;
  big: string;
}

export interface colorsType {
  primary: string[];
  secondary: string[];
  cancel: string[];
  download: string[];
  filter: string[];
  update: string[];
  import: string[];
  removeFilter: string[];
  pendings: string[];
  massive: string[];
  add: string[];
  pdf: string[];
  delete: string[];
  email: string[];
  table: string[];
  token: string[];
}

export interface iconsType {
  import: string;
  new: string;
  filter: string;
  cancel: string;
  download: string;
  update: string;
  removeFilter: string;
  pendings: string;
  massive: string;
  add: string;
  pdf: string;
  delete: string;
  edit: string;
  duplicate: string;
  email: string;
  table: string;
  token: string;
  none?: string;
}

export interface StyleProps {
  size: keyof sizesType;
  typeBtn: keyof colorsType;
}

export interface StylePropsLink {
  size: keyof sizesType;
  readonly goback?: boolean;
}
export interface StyleIconLink {
  readonly goback?: boolean;
}

export interface ButtonProps {
  id?: string;
  name: string;
  type: 'button' | 'submit';
  style?: styles;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  loading?: boolean;
  sizeBtn: keyof sizesType;
  typeBtn: keyof colorsType;
  icon: keyof iconsType;
  readonly disabled?: disabled;
  permisos: string[];
  permiso?: string;
}

export interface LoginButtonProps {
  name: string;
  type: 'button' | 'submit';
  style?: styles;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  loading?: boolean;
  sizeBtn: keyof sizesType;
  typeBtn: keyof colorsType;
  icon: keyof iconsType;
  id?: string | undefined;
}

export interface LinkButtonProps {
  id?: string;
  name: string;
  to: string;
  style?: styles;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  sizeBtn: keyof sizesType;
  icon?: keyof iconsType;
  readonly disabled?: disabled;
  state?: { data: any };
  readonly goback?: boolean;
}
