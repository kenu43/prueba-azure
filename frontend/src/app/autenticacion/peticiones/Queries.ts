import { gql } from '@apollo/client';

export const GET_URI = gql`
  query Query {
    generarURIOTP
  }
`;

export const GET_VERIFICAR_OTP = gql`
  query VerificarOTP($codigo: String!) {
    verificarOTP(codigo: $codigo)
  }
`;
