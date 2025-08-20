import styled from 'styled-components';
import { Etiqueta } from 'comunes/estilos/EstComunes';

import { TextProps } from '../types/ControlesTypes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.textarea`
  outline: none;
  border: 1.2px solid var(--surface-third);
  border-radius: var(--radius-3);
  padding: var(--space-fluid-3);
  color: var(--color-primary-text);
  height: 6em;
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
    background-color: var(--surface-fourth);
    border: 1.2px solid var(--surface-third);
    color: var(--color-black);
    cursor: not-allowed;
  }

  :required {
    border: 1.5px solid var(--system-warning-color);
  }

  :read-only {
    border: 1.5px solid var(--surface-third);
  }
`;

const TextArea = ({
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
}: TextProps) => (
  <Container>
    <Etiqueta>{label}</Etiqueta>
    <Text
      id={id}
      style={style}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      required={required}
      value={typeof value !== 'string' ? '' : value}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </Container>
);

export default TextArea;
