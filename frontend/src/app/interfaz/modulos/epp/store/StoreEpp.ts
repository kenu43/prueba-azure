import { toast } from 'sonner';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import type {
  EPPType,
  EvidenciasType,
  InfoEntregaType,
  TrabajadorRegistroType,
  TrabajadorType,
} from '../types/Types';

import {
  ELEMENTOS,
  STORE_INICIAL,
  TRABAJADOR,
} from '../constantes/ConstGenerales';

export const useEppStore = create(
  devtools<EPPType>(
    () => ({
      ...STORE_INICIAL,
    }),
    { enabled: DEV_MODE, name: 'Epp Store' }
  )
);

export const useTrabajadorEppStore = create(
  devtools<TrabajadorType>(
    () => ({
      ...TRABAJADOR,
    }),
    { enabled: DEV_MODE, name: 'Trabajador Epp Store' }
  )
);

export const guardarTrabajador = (trabajador: TrabajadorType) =>
  useTrabajadorEppStore.setState({ ...trabajador });

export const guardarDatosEntrega = (
  campo: keyof InfoEntregaType,
  valor: string | number
) =>
  useEppStore.setState(({ infoEntrega }) => ({
    infoEntrega: {
      ...infoEntrega,
      [campo]: valor,
    },
  }));

export const agregarElemento = (elemento: string, nombre: string) => {
  const elementosSeleccionados = useEppStore.getState().elementosSeleccionados;

  const elementoVacio = elementosSeleccionados?.filter(
    (sel) => sel.elemento.trim() !== ''
  );
  const elementoRepetido = elementosSeleccionados.find(
    (el) => el.elemento === elemento
  );
  if (elementoRepetido) return toast.info('El elemento ya fue seleccionado');

  toast.success(`Elemento: ${nombre}, agregado con éxito`);

  const copiaElemento = {
    ...ELEMENTOS[0],
    elemento,
  };

  return useEppStore.setState({
    elementosSeleccionados: [...elementoVacio, copiaElemento],
  });
};

export const editarElemento = (
  index: number,
  campo: keyof (typeof ELEMENTOS)[0],
  valor: string | number | EvidenciasType[]
) => {
  const detalles = useEppStore.getState().elementosSeleccionados;
  detalles[index] = { ...detalles[index], [campo]: valor };
  useEppStore.setState({ elementosSeleccionados: detalles });
};

export const prepararDatosAprobar = (
  trabajador: TrabajadorRegistroType,
  datos: EPPType
) => {
  const { SAP, cargo, cedula, ciudad, nombre } = trabajador;
  useTrabajadorEppStore.setState((state) => ({
    ...state,
    cedula,
    ciudad,
    sap: SAP,
    nombre,
    historiaOcupacional: {
      ...state.historiaOcupacional,
      cargo,
    },
  }));
  useEppStore.setState({ ...datos });
};

export const reiniciarEPP = () => useEppStore.setState({ ...STORE_INICIAL });
