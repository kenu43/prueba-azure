import styled from 'styled-components';

import type { InputProps } from 'comunes/types/ControlesTypes';

import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';

const Label = styled.label`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: var(--radius-2);
  font-size: var(--paragraph);
  padding: var(--space-fluid-2);
  color: var(--color-primary-text);
  width: fit-content;

  @media ${screenSizes.escritorio} {
    :hover {
      background-color: var(--surface-second);
    }
  }

  @media ${screenSizes.movil} {
    background-color: var(--surface-fourth);
  }

  @media ${screenSizes.tablet} {
    background-color: var(--surface-fourth);
  }

  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
`;

const Boxchecked = styled.span`
  position: relative;               
  display: grid;
  place-items: center;
  width: var(--paragraph);
  height: var(--paragraph);
  margin-right: 0.5em;

  border: 2px solid var(--brand-primary);
  border-radius: var(--radius-round);
  background-color: transparent;   
  transition: background-color .25s var(--ease-in-out-2);
`;

const Light = styled.div`
  width: 60%;                       
  height: 60%;
  border-radius: var(--radius-round);
  background-color: var(--brand-secondary);
  opacity: 0;
  transform: scale(0);              
  transition:
    transform .25s var(--ease-squish-5),
    opacity   .25s var(--ease-in-1);
`;

const CheckBoxStyle = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  position: absolute;              
  inset: 0;                        

  &:checked + ${Boxchecked} {
    background-color: var(--brand-secondary);
    border-color: var(--brand-secondary);
  }

  &:checked + ${Boxchecked} > ${Light} {
    opacity: 1;
    transform: scale(1);
  }
`;

const CheckBox = ({
  id,
  value,
  onChange,
  disabled,
  required,
  style,
  label,
  readOnly,
  checked,
}: InputProps) => (
  <Label htmlFor={id}>
    <CheckBoxStyle
      id={id}
      type="checkbox"
      style={style}
      onChange={onChange}
      value={typeof value == 'boolean' ? '' : value}
      checked={checked}
      readOnly={readOnly}
      required={required}
      disabled={disabled}
    />
    <Boxchecked>
      <Light className="light" />
    </Boxchecked>
    {label}
  </Label>
);

export default CheckBox;
