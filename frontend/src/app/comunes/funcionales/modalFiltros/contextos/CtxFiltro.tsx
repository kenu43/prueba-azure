import { createContext, useMemo, useReducer } from 'react';
import { EstadoInicial } from '../constantes/Constantes';
import { ActionType, ContextParamType, InitialStateType, ProviderType, StateType } from '../types/FiltrosTypes';

export const CtxFiltros = createContext<ContextParamType>([{ ...EstadoInicial }, async () => {}]);
let dashReducer = (state: StateType, action: ActionType): InitialStateType => {
	switch (action.type) {
		case 'INICIALIZAR':
			return { ...state, ...action.payload };
		case 'GENERALES':
			return { ...state, [action.name]: action.payload };
		default:
			return state;
	}
};

const FiltrosProvider = ({ children }: ProviderType) => {
	const [state, dispatch]: ContextParamType = useReducer(dashReducer, EstadoInicial);
	const ctxParams = useMemo<ContextParamType>(() => [state, dispatch], [state]);

	return <CtxFiltros.Provider value={ctxParams}>{children}</CtxFiltros.Provider>;
};

export default FiltrosProvider;
