import { ConfigDataType } from './ContextType';

export interface StylePropsType {
  aligment?: 'flex-start' | 'flex-end' | 'center';
  columnWidth?: ConfigDataType['tableColumns'] | undefined;
}

export interface ArgColumnsType {
  configColumns: ConfigDataType['tableColumns'] | undefined;
}
