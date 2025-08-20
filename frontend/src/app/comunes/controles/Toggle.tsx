import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import { InputProps } from 'comunes/types/ControlesTypes';
import { Etiqueta } from 'comunes/estilos/EstComunes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const Label = styled.label`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--brand-2);
  border-radius: var(--radius-round);
  color: var(--color-primary-text);
  max-width: 2.5rem;
  width: 100%;
  height: 12px;

  @media ${screenSizes.escritorio} {
    :hover {
      cursor: pointer;
    }
  }
`;

const ToggleStyle = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  :checked {
    & + span {
      background-color: var(--brand-secondary);
      transform: translateX(105%);
      transition: all 0.6s var(--ease-out-4);
    }
  }
`;

const Boxchecked = styled.span`
  display: grid;
  place-items: center;
  background-color: var(--surface-fourth);
  border-radius: var(--radius-round);
  width: 20px;
  height: 20px;
  /* margin-right: 0.8rem; */
  transform: translateX(0);
  transition: all 0.6s var(--ease-out-4);
`;

const Toggle = ({
  label,
  value,
  onChange,
  disabled,
  required,
  style,
  checked,
  name,
  id,
  horizontal,
}: InputProps) => (
  <Container style={{ flexDirection: horizontal ? 'row' : 'column' }}>
    {label !== '' && <Etiqueta>{label}</Etiqueta>}
    <Label htmlFor={id}>
      <ToggleStyle
        name={name}
        id={id}
        type='checkbox'
        style={style}
        onChange={onChange}
        value={typeof value === 'boolean' ? '' : value}
        checked={checked}
        required={required}
        disabled={disabled}
      />
      <Boxchecked />
    </Label>
  </Container>
);

export default Toggle;
