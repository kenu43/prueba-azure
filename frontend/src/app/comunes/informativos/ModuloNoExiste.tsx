import {
  ContFlexColumn,
  TituloGradiente,
  VinculosSoporte,
} from 'comunes/estilos/EstComunes';

const ModuloNoSeEncuentra = () => (
  <ContFlexColumn
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2em',
      height: '100%',
    }}
  >
    <TituloGradiente>
      El módulo que busca no se encuentra disponible
    </TituloGradiente>
    <VinculosSoporte to="/">Volver al menú principal</VinculosSoporte>
  </ContFlexColumn>
);

export default ModuloNoSeEncuentra;
