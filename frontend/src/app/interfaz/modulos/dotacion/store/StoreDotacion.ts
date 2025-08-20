import { toast } from 'sonner';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import type { DotacionType, InfoEntregaType } from '../types/Types';

import { useTrabajadorEppStore } from '../../epp/store/StoreEpp';
import { DOTACION_INICIAL, ELEMENTOS } from '../constantes/ConstGenerales';

export const useDotacion = create(
  devtools<DotacionType>(() => ({ ...DOTACION_INICIAL }), {
    enabled: DEV_MODE,
    name: 'Entrega Epp Store',
  })
);

export const guardarDatos = (
  campo: keyof typeof DOTACION_INICIAL,
  valor: string
) => useDotacion.setState({ [campo]: valor });

export const guardarDatosEntrega = (
  campo: keyof InfoEntregaType,
  valor: string | number
) =>
  useDotacion.setState(({ infoEntrega }) => ({
    infoEntrega: {
      ...infoEntrega,
      [campo]: valor,
    },
  }));

export const agregarElemento = (elemento: string) => {
  const elementosSeleccionados = useDotacion.getState().elementosSeleccionados;

  const elementoVacio = elementosSeleccionados?.filter(
    (sel) => sel.elemento.trim() !== ''
  );
  const elementoRepetido = elementosSeleccionados.find(
    (el) => el.elemento === elemento
  );
  if (elementoRepetido) return toast.info('El elemento ya fue seleccionado');

  const copiaElemento = {
    ...ELEMENTOS[0],
    elemento,
  };

  return useDotacion.setState({
    elementosSeleccionados: [...elementoVacio, copiaElemento],
  });
};

export const editarElemento = (
  index: number,
  campo: keyof (typeof ELEMENTOS)[0],
  valor: string | number
) => {
  const detalles = useDotacion.getState().elementosSeleccionados;
  detalles[index] = { ...detalles[index], [campo]: valor };
  useDotacion.setState({ elementosSeleccionados: detalles });
};

export const eliminarElemento = (index: number) => {
  useDotacion.setState(({ elementosSeleccionados }) => ({
    elementosSeleccionados: elementosSeleccionados.filter(
      (_, i) => i !== index
    ),
  }));
};

export const prepararDatos = (categoria: string) => {
  const { cedula, nombre } = useTrabajadorEppStore.getState();
  const elementosSeleccionados = useDotacion.getState().elementosSeleccionados;

  return {
    cedula,
    nombre,
    elemento: elementosSeleccionados.map((el) => el.elemento).join(', '),
    categoria,
    cantidad: elementosSeleccionados.reduce((sum, el) => sum + el.cantidad, 0),
    talla: elementosSeleccionados.map((el) => el.talla).join(', '),
    motivo: elementosSeleccionados.map((el) => el.motivo).join(', '),
    observaciones: elementosSeleccionados
      .map((el) => el.observaciones)
      .join(' | '),
  };
};

export const reiniciarDotacion = () =>
  useDotacion.setState({ ...DOTACION_INICIAL });
