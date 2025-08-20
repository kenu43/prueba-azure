import styled from 'styled-components';
import { Etiqueta } from 'comunes/estilos/EstComunes';

import { InputProps } from '../types/ControlesTypes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextStyle = styled.input`
  outline: none;
  border: 1px solid var(--surface-third);
  border-radius: var(--radius-3);
  padding: var(--space-fluid-2);
  color: var(--color-primary-text);
  min-height: 2em;
  font-size: var(--paragraph);
  background-color: var(--surface-first);
  transition: all 0.3s var(--ease-out-2);

  ::placeholder {
    font-weight: 500;
  }

  :focus {
    border: 1.5px solid var(--brand-secondary);
    box-shadow: var(--shadow-2);
    transition: all 0.3s var(--ease-out-2);
    background-color: var(--base);
  }

  :disabled {
    background-color: var(--system-disable-color);
    border: 1.2px solid var(--surface-third);
    color: #fff;
    cursor: not-allowed;
  }

  :required {
    border: 1.5px solid var(--system-warning-color);
  }

  :read-only {
    border: 1.2px solid var(--surface-third);
  }
`;

const Text = ({
  id,
  value,
  onChange,
  onBlur,
  disabled,
  required,
  style,
  placeholder,
  label,
  readOnly,
}: InputProps) => (
  <Container style={style}>
    <Etiqueta>{label}</Etiqueta>
    <TextStyle
      type='text'
      id={id}
      style={style}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      required={required}
      value={typeof value === 'boolean' ? '' : value}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </Container>
);

export default Text;
