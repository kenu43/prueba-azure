import { Fragment } from 'react';

import { FormProps } from './types/FormTypes';

import { DetailBotones, SectionBtnStyle } from './estilos/Estilos';

const ButtonSection = ({ children }: FormProps) => {
  const array: any = children;
  return (
    <SectionBtnStyle>
      <DetailBotones>
        {array?.map((child: any, idChild: number) => (
          <Fragment key={idChild}>{child}</Fragment>
        ))}
      </DetailBotones>
    </SectionBtnStyle>
  );
};

export default ButtonSection;
