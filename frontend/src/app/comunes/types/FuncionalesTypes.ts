import React from 'react';

export interface IfProps {
  children: React.ReactNode;
  condicion: boolean | undefined;
}

export interface ModalProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
}
