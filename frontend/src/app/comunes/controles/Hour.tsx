import { Etiqueta } from 'comunes/estilos/EstComunes';
import styled from 'styled-components';

import { InputProps } from '../types/ControlesTypes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextStyle = styled.input`
  outline: none;
  border: 1.2px solid transparent;
  border-radius: var(--radius-3);
  padding: var(--space-fluid-3);
  color: var(--color-primary-text);
  min-height: 3em;
  font-size: var(--paragraph);
  background-color: var(--surface-third);
  width: 100%;
  transition: all 0.3s var(--ease-out-2);

  ::placeholder {
    font-weight: 500;
  }

  :focus {
    border: 1.5px solid var(--brand-secondary);
    box-shadow: var(--shadow-2);
    transition: all 0.3s var(--ease-out-2);
    background-color: var(--surface-second);
  }

  :disabled {
    background-color: var(--surface-fourth);
    border: 1.5px solid transparent;
    color: var(--color-black);
  }

  :required {
    border: 1.5px solid var(--system-warning-color);
  }

  :read-only {
    border: 1.5px solid transparent;
  }
`;

const Hour = ({
  id,
  value,
  onChange,
  disabled,
  required,
  style,
  placeholder,
  label,
  readOnly,
}: InputProps) => (
  <Container>
    <Etiqueta>{label}</Etiqueta>
    <TextStyle
      type="time"
      id={id}
      style={style}
      onChange={onChange}
      disabled={disabled}
      required={required}
      value={typeof value == 'boolean' ? '' : value}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </Container>
);

export default Hour;
