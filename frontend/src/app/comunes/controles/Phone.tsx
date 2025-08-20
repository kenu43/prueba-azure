import styled from 'styled-components';
import { useState } from 'react';
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
  background-color: ${({ color }) => color || 'var(--surface-first)'};
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
    background-color: ${({ color }) =>
      color || 'var(----system-disabled-color)'};
    border: 1.2px solid var(--surface-third);
    color: var(--color-black);
  }

  :required {
    border: 1.5px solid var(--system-warning-color);
  }

  :read-only {
    border: 1.2px solid var(--surface-third);
  }
`;

const Phone = ({
  id,
  value,
  onChange,
  disabled,
  required,
  style,
  placeholder,
  label,
  readOnly,
  color,
}: InputProps) => {
  const [editando, setEditando] = useState<boolean>(false);

  const determinarValor = () => {
    if (typeof value === 'boolean') return '';
    if (editando) return value;
    if (typeof value === 'string') {
      if (value?.length === 10)
        return `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(
          6,
          10
        )}`;
    }
    if (value) return value;
    return '';
  };

  return (
    <Container style={style}>
      <Etiqueta>{label}</Etiqueta>
      <TextStyle
        type='tel'
        id={id}
        style={style}
        title='El teléfono debe tener 10 números, si es teléfono fijo anteponga el indicativo 60 + indicativo de la ciudad'
        color={color}
        pattern={'[0-9]{3} [0-9]{3} [0-9]{4}'}
        onChange={onChange}
        onBlur={(e) => {
          e.preventDefault();
          setEditando(false);
        }}
        onFocus={(e) => {
          e.preventDefault();
          setEditando(true);
        }}
        disabled={disabled}
        required={required}
        value={determinarValor()}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </Container>
  );
};

export default Phone;
