import {
  ContFlexColumn,
  TituloGradiente,
  VinculosSoporte,
} from '../estilos/EstComunes';

const Denegado = () => (
  <ContFlexColumn
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2em',
      height: '100%',
    }}
  >
    <TituloGradiente>
      No tiene los permisos necesarios para ingresar al módulo, comuníquese con
      el administrador por medio del soporte
    </TituloGradiente>
    <VinculosSoporte to="/soporte">Ir a soporte</VinculosSoporte>
  </ContFlexColumn>
);

export default Denegado;
