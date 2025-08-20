/* eslint-disable react/no-children-prop */
import Modal from '../Modal';
import { FormProps } from './types/FormTypes';
import Header from './Header';
import ButtonSection from './ButtonSection';

import { ChildrenContainer, FormCard, FormContainer } from './estilos/Estilos';

const FormModal = ({
  children,
  buttons,
  close,
  style,
  tittle = '',
  onSubmit,
}: FormProps) => {
  return (
    <Modal>
      <FormCard onSubmit={onSubmit}>
        <Header tittle={tittle} onClick={close} />
        <FormContainer>
          <ChildrenContainer style={style}>{children}</ChildrenContainer>
        </FormContainer>
        <ButtonSection children={buttons} />
      </FormCard>
    </Modal>
  );
};

export default FormModal;
