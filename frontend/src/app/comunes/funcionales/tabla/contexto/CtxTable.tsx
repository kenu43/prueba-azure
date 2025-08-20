import { createContext, useMemo, useReducer } from 'react';
import { Resolvers, initialState } from '../constantes/Constantes';
import {
  ActionType,
  ContextType,
  ProviderType,
  StateType,
} from '../types/ContextType';

export const TableContext = createContext<ContextType>({});

const tableReducer = (state: StateType, action: ActionType) => {
  const accion = Resolvers[action.type];
  // @ts-ignore
  return accion(state, action.payload);
};

const CtxTable = ({ children }: ProviderType) => {
  const [state, dispatch] = useReducer(tableReducer, initialState);
  const ctxParams = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <TableContext.Provider value={ctxParams}>{children}</TableContext.Provider>
  );
};

export default CtxTable;
