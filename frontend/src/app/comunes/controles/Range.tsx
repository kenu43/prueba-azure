import styled from 'styled-components';

import { Etiqueta } from 'comunes/estilos/EstComunes';
import { InputProps } from 'comunes/types/ControlesTypes';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ControlDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  align-items: center;
  border-radius: var(--radius-2);
  background-color: var(--surface-third);
  padding: var(--space-fluid-2);

  @media ${screenSizes.escritorio} {
    :hover {
      background-color: var(--surface-second);
    }
  }
`;

const Input = styled.input`
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  box-sizing: border-box;
  background-color: var(--surface-first);
  border: 1.5px solid transparent;
  border-radius: var(--radius-round);
  height: 0.5em;
  width: 100%;
  -webkit-transition: 0.3s var(--ease-out-2);
  transition: all 0.3s var(--ease-out-2);

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border-radius: var(--radius-round);
    width: calc(var(--label) * 1.4);
    height: var(--label);
    background: var(--brand-secondary);
  }

  ::-moz-range-thumb {
    width: 100%;
    height: var(--title);
    background: var(--brand-secondary);
  }
  ::-ms-thumb {
    width: 100%;
  }

  :focus {
    background: var(--surface-fourth);

    ::-webkit-slider-thumb {
      background: var(--brand-primary);
    }
  }

  @media ${screenSizes.escritorio} {
    :hover {
      cursor: pointer;
    }
  }

  :disabled {
    background: var(--gray-9);
    border: 1.5px solid transparent;
  }

  :required {
    border: 1.5px solid var(--system-warning-color);
  }
`;

const Span = styled.span`
  font-size: var(--label);
  color: var(--color-primary-text);
`;

const Range = ({
  style,
  onChange,
  value,
  disabled,
  required,
  label,
  min,
  max,
  color,
}: InputProps) => {
  return (
    <Container style={style}>
      <Etiqueta>{label}</Etiqueta>
      <ControlDiv>
        <Input
          color={color}
          type="range"
          onChange={onChange}
          value={typeof value === 'boolean' ? '' : value}
          min={min}
          max={max}
          disabled={disabled}
          required={required}
        />
        <Span>{value}</Span>
      </ControlDiv>
    </Container>
  );
};

export default Range;
