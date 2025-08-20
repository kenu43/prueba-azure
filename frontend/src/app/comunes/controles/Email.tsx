import { Avisos, Etiqueta } from 'comunes/estilos/EstComunes';
import Condicional from 'comunes/funcionales/Condicional';
import styled from 'styled-components';

import { InputEmail } from '../types/ControlesTypes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextStyle = styled.input`
  outline: none;
  border: 1.2px solid transparent;
  border-radius: var(--radius-3);
  padding: var(--space-fluid-2);
  color: var(--color-primary-text);
  min-height: 2em;
  font-size: var(--paragraph);
  background-color: var(--surface-first);
  border: 1px solid var(--surface-third);
  /* width: 100%; */
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
    border: 1.5px solid transparent;
    color: var(--color-black);
  }

  :required {
    border: 1.5px solid var(--system-warning-color);
  }

  :read-only {
    border: 1.5px solid transparent;
  }

  :invalid {
    border: 1.5px solid var(--system-warning-color);
  }
`;

const Email = ({
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
  domains,
  multiple,
}: InputEmail) => {
  const domainRegex = new RegExp(
    '^[-\\w.%+]{1,64}@(?:' + (domains?.join('|') ?? '') + ')\\.[A-Z]{0,63}$',
    'iu'
  );

  const validDomain: boolean = domains?.length
    ? domainRegex.test(typeof value !== 'string' ? '' : value)
    : true;

  let pattern = undefined;
  if (domains?.length) {
    const patternAux = domainRegex.toString().split('@');
    pattern = '.+@' + patternAux[1].replace('/iu', '').replace('(?:', '');
  }

  return (
    <Container style={style}>
      <Etiqueta>{label}</Etiqueta>
      <Condicional condicion={!validDomain}>
        <Avisos fontColor='error'>
          El dominio del correo no pertenece a la lista permitida
        </Avisos>
      </Condicional>
      <TextStyle
        type='email'
        id={id}
        pattern={pattern}
        style={style}
        multiple={multiple}
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
};

export default Email;
