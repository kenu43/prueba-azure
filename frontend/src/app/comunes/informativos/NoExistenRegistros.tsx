import styled from 'styled-components';

export const ContFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const TituloAnimaciones = styled.h3`
  font-size: calc(var(--titulo) * 1.3);
  font-family: var(--font-family-secondary);
  margin: 0.5em;
  color: var(--color-secondary-text);
  max-width: 50vmax;
  text-align: center;
`;

const NoExistenRegistros = () => (
  <ContFlexColumn
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}
  >
    <TituloAnimaciones>No se encontraron registros</TituloAnimaciones>
  </ContFlexColumn>
);

export default NoExistenRegistros;
