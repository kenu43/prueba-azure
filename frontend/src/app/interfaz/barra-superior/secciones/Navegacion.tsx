import { useNavigate, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import Condicional from 'comunes/funcionales/Condicional';
import { TYPE_OF_DEVICE } from 'app/store/constantes/Configuraciones';

import Rutas from '../recursos/Rutas.json';
import { iconografia } from '../recursos/Iconografia';

import {
  Arrow,
  NavArrows,
  NavContainer,
  RoutesContainer,
  StepNav,
} from '../estilos/EstNavegacion';

const Navegacion = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const rutas = pathname.split('/');
  const isDevice = TYPE_OF_DEVICE.test(navigator.userAgent);

  const changePath = (path: string) => {
    const currentPath = window.location.pathname;
    const pathAux = currentPath.split(path)[0] + path;

    return pathAux;
  };

  return (
    <NavContainer>
      <Condicional condicion={!isDevice}>
        <NavArrows>
          <Arrow onClick={() => navigate(-1)}>
            {iconografia.leftArror.path}
          </Arrow>
          <Arrow onClick={() => navigate(1)}>
            {iconografia.rightArrow.path}
          </Arrow>
        </NavArrows>
      </Condicional>

      <RoutesContainer>
        <>
          <StepNav to='/'>Menú principal</StepNav>
          {rutas.map((ruta) => (
            <StepNav key={nanoid(6)} to={changePath(ruta)}>
              {Rutas?.[ruta as keyof typeof Rutas] ?? ruta}
            </StepNav>
          ))}
        </>
      </RoutesContainer>
      <Arrow>{iconografia.search.path}</Arrow>
    </NavContainer>
  );
};

export default Navegacion;
