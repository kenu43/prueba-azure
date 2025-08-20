import React from 'react';
import {
  AnimationContainer,
  Container,
  Loader,
} from 'comunes/estilos/EstFuncionales';

import { TituloGradiente } from '../estilos/EstComunes';

const Cargando = ({
  mensaje,
  style,
}: {
  mensaje: string;
  style?: React.CSSProperties;
}) => (
  <Container style={style}>
    <AnimationContainer>
      <Loader>
        <span />
      </Loader>
      <Loader>
        <span />
      </Loader>
      <Loader>
        <i />
      </Loader>
      <Loader>
        <i />
      </Loader>
    </AnimationContainer>

    <TituloGradiente>{mensaje}</TituloGradiente>
  </Container>
);

export default Cargando;
