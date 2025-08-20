import { Etiqueta } from 'comunes/estilos/EstComunes';
import { InputProps, SvgProps } from 'comunes/types/ControlesTypes';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  :focus-within {
    svg {
      stroke: var(--brand-secondary);
    }

    div {
      background-color: var(--surface-third);
    }
    transition: all 0.3s var(--ease-out-2);
  }
`;

const InputNumeric = styled.input`
  outline: none;
  border: 1.5px solid transparent;
  border-radius: var(--radius-3);
  padding: var(--space-fluid-3);
  padding-right: 0;
  color: var(--color-primary-text);
  min-height: 3em;
  font-size: var(--paragraph);
  background-color: var(--surface-third);
  width: 100%;
  transition: all 0.3s var(--ease-out-2);

  ::-webkit-inner-spin-button {
    padding: 20px 1px;
    opacity: 0;
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

  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
`;

const ControlContainer = styled.div<SvgProps>`
  position: absolute;
  top: ${({ position }) => position === 'up' && '15%'};
  bottom: ${({ position }) => position === 'down' && '6%'};
  right: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--surface-fourth);
  border-radius: var(--radius-2);
  padding: 0.1em;
  pointer-events: none;
`;

const ControlIconUp = styled.svg`
  width: calc(var(--icons-size) * 0.6);
  height: calc(var(--icons-size) * 0.6);
  stroke: var(--color-primary-text);
  stroke-width: 0.125em;
  fill: none;
`;

const ControlIconDown = styled.svg`
  width: calc(var(--icons-size) * 0.6);
  height: calc(var(--icons-size) * 0.6);
  stroke: var(--color-primary-text);
  stroke-width: 2px;
  fill: none;
`;

const Currency = ({
  id,
  min,
  max,
  label,
  style,
  onChange,
  value,
  disabled,
  placeholder,
  required,
  step,
  readOnly,
}: InputProps) => {
  const [editando, setEditando] = useState<boolean>(false);
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  const determinarValor = () => {
    if (typeof value === 'boolean') return '';
    if (editando) return value;
    if (value) return formatter.format(Number(value));

    return '';
  };

  return (
    <Container style={style}>
      <Etiqueta>{label}</Etiqueta>

      <Container style={style}>
        <InputNumeric
          id={id}
          type={editando ? 'number' : 'text'}
          style={style}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          value={determinarValor()}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          placeholder={placeholder}
          onBlur={(e) => {
            e.preventDefault();
            setEditando(false);
          }}
          onFocus={(e) => {
            e.preventDefault();
            setEditando(true);
          }}
        />
        <ControlContainer position="up">
          <ControlIconUp
            id="svg"
            viewBox="0 0 24 24"
            x="0px"
            y="0px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
            />
          </ControlIconUp>
        </ControlContainer>

        <ControlContainer position="down">
          <ControlIconDown
            viewBox="0 0 24 24"
            x="0px"
            y="0px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
            />
          </ControlIconDown>
        </ControlContainer>
      </Container>
    </Container>
  );
};

export default Currency;
