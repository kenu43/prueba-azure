import { gql } from '@apollo/client';

export const SAVE_TOKEN = gql`
  mutation SaveToken($token: String) {
    saveToken(token: $token)
  }
`;

export const SALIR_SESION = gql`
  mutation SaveToken {
    saveToken
  }
`;
