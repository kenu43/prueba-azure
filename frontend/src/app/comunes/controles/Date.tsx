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
  border: 1.2px solid var(--surface-third);
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
    background-color: var(--system-disabled-color);
    color: var(--color-black);
  }

  :required {
    border: 1.5px solid var(--system-warning-color);
  }

  :read-only {
    border: 1.2px solid var(--surface-third);
  }
`;

const Date = ({
  id,
  value,
  onChange,
  disabled,
  required,
  style,
  placeholder,
  label,
  readOnly,
  min,
  max,
}: InputProps) => (
  <Container>
    <Etiqueta>{label}</Etiqueta>
    <TextStyle
      type='date'
      id={id}
      style={style}
      onChange={onChange}
      disabled={disabled}
      required={required}
      value={typeof value === 'boolean' ? '' : value}
      min={min}
      max={max}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </Container>
);

export default Date;
