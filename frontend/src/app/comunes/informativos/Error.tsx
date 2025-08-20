import { useNavigate } from 'react-router-dom';
import React from 'react';
import useErrorNotification from 'hooks/ErrorNotification';
import { ContFlexRow } from 'comunes/estilos/EstComunes';
import { ApolloError } from '@apollo/client';

import {
  ErrorButton,
  ErrorCodeContainer,
  ErrorContainer,
  ErrorDesContainer,
  ErrorDescription,
  ErrorTitle,
  SupportButton,
} from '../estilos/EstilosInfo';

const AppError = ({
  error,
  style,
}: {
  error: ApolloError;
  style?: React.CSSProperties;
}) => {
  useErrorNotification({ error });
  const navigate = useNavigate();

  return (
    <ErrorContainer style={style}>
      <div>
        <ErrorTitle>
          Lo sentimos, se presentó un problema en la aplicación; hemos
          comunicado al equipo de soporte los problemas generados.
        </ErrorTitle>
      </div>

      <ErrorDesContainer>
        <ErrorCodeContainer>
          <ContFlexRow style={{ marginBottom: '0.8em', gap: 'var(--gaps-5)' }}>
            <ErrorDescription>
              Los cambios que ha realizado con anterioridad se encuentran
              registrados, sin embargo si el error es permanente puede
              comunicarse a través del Chat de soporte que se encuentra en la
              herramienta o enviar un correo a
              <a href='mailto:correo@ejemplo.com'>
                soporte@pcsoluciones.com.co
              </a>
            </ErrorDescription>
            <ErrorButton onClick={() => navigate('/')}>
              Restaurar el servicio
            </ErrorButton>
            <SupportButton onClick={() => navigate('/soporte')}>
              Chat de soporte
            </SupportButton>
          </ContFlexRow>
        </ErrorCodeContainer>
      </ErrorDesContainer>
    </ErrorContainer>
  );
};

export default AppError;
