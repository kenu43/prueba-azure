import { useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { Etiqueta } from 'comunes/estilos/EstComunes';

import {
  SelectStringProps,
  StateSelectStringType,
  keyBoardType,
} from '../types/SelectTypes';
import { expandOrHideOptions, navigateOnArrow } from '../funciones/Funciones';

import {
  Container,
  DeleteSVG,
  DivInput,
  Input,
  MultiContainer,
  Opcion,
  Opciones,
  SVG,
} from '../estilos/SelectEst';

const SelectString = ({
  label,
  name,
  style,
  value = '',
  onChange,
  optionsArray,
  disabled,
  required,
}: SelectStringProps) => {
  const [optionList, setOptionList] = useState<StateSelectStringType>({
    options: [],
    searchOption: '',
  });
  const styleSVG = !label ? { top: 'calc(var(--paragraph) * 1 / 0.8)' } : {};

  useMemo(
    () =>
      setOptionList({
        options: optionsArray.slice(0, 24),
        searchOption: typeof value !== 'string' ? '' : value,
      }),
    [optionsArray, value]
  );

  const search = (word: string) => {
    const newList = optionsArray.filter((op) => {
      const optionNormal = op
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      const wordNormal = word
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      return optionNormal.includes(wordNormal);
    });

    setOptionList((prev) => ({
      ...prev,
      options: newList,
      searchOption: word,
    }));
  };

  const selectedOption = (option: number) => {
    const optSelected = optionList?.options[option];
    onChange(optSelected);
    expandOrHideOptions(false, name);

    setOptionList((prev) => ({
      ...prev,
      searchOption: optSelected,
    }));
  };

  const selectByKyboard = (e: keyBoardType, option?: number) => {
    if (e.code === 'Enter') selectedOption(option!);

    if (e.code === 'Escape') {
      const input = document.getElementById('select-input');
      expandOrHideOptions(false, name);
      input?.blur();
    }

    navigateOnArrow(e);
  };

  const erase = () => {
    if (!disabled) {
      onChange('');
      expandOrHideOptions(false, name);

      setOptionList((prev) => ({
        ...prev,
        searchOption: '',
      }));
    }
  };

  return (
    <Container style={style}>
      <Etiqueta>{label}</Etiqueta>
      <MultiContainer>
        <DivInput>
          <DeleteSVG fill='var(--color-primary-text)' onClick={erase}>
            <path d='M14.3413 0.661169C13.4682 -0.229432 12.0372 -0.23988 11.1511 0.637875L1.55274 10.1464C0.661333 11.0295 0.664476 12.4711 1.55972 13.3502L6.65877 18.3577C7.12571 18.8163 7.74205 19.0298 8.34815 18.9995H14.6145C14.933 20.0138 15.8806 20.7495 17 20.7495C18.3807 20.7495 19.5 19.6303 19.5 18.2495C19.5 16.8688 18.3807 15.7495 17 15.7495C15.8806 15.7495 14.933 16.4853 14.6145 17.4995H10.6614L19.2439 8.82729C20.1087 7.95347 20.112 6.54731 19.2514 5.66943L14.3413 0.661169ZM8.25 17.4995V17.5022C8.05542 17.506 7.85955 17.4346 7.70978 17.2875L2.61073 12.28C2.31231 11.9869 2.31126 11.5064 2.6084 11.2121L4.13726 9.69752L10.2363 15.7966L8.76836 17.2799C8.63822 17.4114 8.47142 17.4847 8.30042 17.4995H8.25ZM12.2068 1.70351C12.5022 1.41093 12.9791 1.41441 13.2702 1.71128L18.1802 6.71954C18.4671 7.01216 18.466 7.48088 18.1778 7.77216L11.2915 14.7304L5.20291 8.64184L12.2068 1.70351Z' />
          </DeleteSVG>
          <Input
            autoComplete='off'
            id='select-options'
            required={required}
            disabled={disabled}
            onChange={(e) => search(e.target.value)}
            value={optionList.searchOption}
            onKeyDown={(e) => selectByKyboard(e)}
            onFocus={() => expandOrHideOptions(true, name)}
          />
          <SVG name={name} role='button' style={styleSVG}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            />
          </SVG>
        </DivInput>
        <Opciones id={name} role='combobox'>
          {optionList.options.map((op, x) => (
            <Opcion
              id={`${x}`}
              key={nanoid(6)}
              role='presentation'
              onKeyDown={(e) => selectByKyboard(e, x)}
              tabIndex={0}
              onClick={() => {
                selectedOption(x);
              }}
            >
              {op}
            </Opcion>
          ))}
        </Opciones>
      </MultiContainer>
    </Container>
  );
};

export default SelectString;
