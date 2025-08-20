import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import { Etiqueta } from 'comunes/estilos/EstComunes';

import {
  ContainerGeneralProps,
  ContainerProps,
  InputLabelRadioProps,
  InputRadioProps,
} from '../../comunes/types/ControlesTypes';

const ContainerGeneral = styled.div<ContainerGeneralProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ labelOrientation, width }) =>
    labelOrientation === 'max-content' || width ? '100%' : 'fit-content'};
  gap: 0.5em;
  flex-direction: ${({ labelOrientation }) =>
    labelOrientation === 'horizontal' ? 'row' : 'column'};
`;

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: ${({ orientation }) =>
    orientation === 'vertical' ? 'flex-start' : 'center'};
  justify-content: center;
  gap: 0.5em;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-direction: ${({ orientation }) =>
    orientation === 'vertical' ? 'column' : 'row'};
`;

const Label = styled.label<InputLabelRadioProps>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: var(--radius-2);
  font-size: var(--paragraph);
  padding: var(--space-fluid-2);
  color: var(--color-primary-text);
  width: fit-content;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border: ${({ required }) =>
    required && '1px solid var(--system-warning-color)'};

  @media ${screenSizes.escritorio} {
    :hover {
      background-color: var(--surface-first);
    }
  }

  @media ${screenSizes.movil} {
    background-color: var(--surface-first);
  }

  @media ${screenSizes.tablet} {
    background-color: var(--surface-first);
  }

  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */

  :has(input:required) {
    border: 1px solid var(--color-add-orange-2);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-add-orange-7);
    }
  }
`;

const CheckBoxStyle = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;

  :active {
    & + span {
      border-radius: var(--radius-round);
      border: none;
    }
  }

  :checked {
    & + span {
      background-color: var(--surface-second);
      border-radius: var(--radius-round);
      transition: all 1s ease-in-out;
    }

    & + span > div {
      opacity: 1;
      transform: translateX(0);
      transition: transform 0.5s 0.1s var(--ease-squish-5),
        opacity 0.5s var(--ease-in-1);
    }
  }
`;

const Boxchecked = styled.span`
  display: grid;
  place-items: center;
  background-color: var(--surface-second);
  border-radius: var(--radius-round);
  width: 20px;
  height: 20px;
  margin-right: 0.5em;

  @media ${screenSizes.movil} {
    background-color: var(--surface-second);
  }

  @media ${screenSizes.tablet} {
    background-color: var(--surface-second);
  }
`;

const Light = styled.div`
  position: absolute;
  background-color: var(--brand-secondary);
  border-radius: var(--radius-round);
  width: var(--paragraph);
  height: var(--paragraph);
  opacity: 0;
  transform: translateX(300%);
  transition: transform 0.5s 0.1s var(--ease-squish-5),
    opacity 0.5s var(--ease-in-1);
`;

const Radio = ({
  id,
  label,
  orientation,
  value,
  onChange,
  disabled,
  required,
  style,
  styleContenedor,
  readOnly,
  options,
  width,
  labelOrientation,
  styleFont,
}: InputRadioProps) => {
  const controlRadio = options?.map((option) => {
    const llave = `${id}${option}`.replace(' ', '');
    return (
      <Label htmlFor={llave} key={option} style={styleFont} required={required}>
        <CheckBoxStyle
          id={llave}
          type='radio'
          style={style}
          onChange={onChange}
          value={option}
          name={id}
          checked={value === option}
          readOnly={readOnly}
          required={required}
          disabled={disabled}
        />
        <Boxchecked>
          <Light className='light' />
        </Boxchecked>
        {option}
      </Label>
    );
  });

  return (
    <ContainerGeneral
      labelOrientation={labelOrientation}
      width={width}
      orientation={orientation}
      style={styleFont}
    >
      {label !== '' && <Etiqueta style={styleFont}>{label}</Etiqueta>}
      <Container style={styleContenedor} orientation={orientation}>
        {controlRadio}
      </Container>
    </ContainerGeneral>
  );
};
export default Radio;
