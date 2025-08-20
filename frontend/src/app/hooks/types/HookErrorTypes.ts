import { ApolloError } from '@apollo/client';

export interface ErrorHookType {
  error: ApolloError | Error;
}
