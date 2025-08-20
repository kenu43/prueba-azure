import { Actions, ConfigDataType } from '../types/ContextType';

export const initialState: ConfigDataType = {
  tableData: [],
  tableColumns: [
    {
      key: '',
      label: '',
      styleConfig: { columnWidth: 1 },
    },
  ],
  Tableconfig: {},
  pagination: {
    first: 0,
    last: 10,
    actual: 1,
  },
};

export const Resolvers: Actions = {
  configurations: (state, payload) => {
    return { ...state, ...payload };
  },
  reboot: () => initialState,
  pagination: (state, payload) => {
    return {
      ...state,
      pagination: {
        first: payload.first,
        last: payload.last,
        actual: payload.actual,
      },
    };
  },
};
