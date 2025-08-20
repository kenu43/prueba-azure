import { toast } from 'sonner';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { RecomendacionesMedicas } from '../constantes/ConstGenerales';

import { STORE_RECOMENDACIONES } from '../constantes/ConstGenerales';

type Seccion = keyof RecomendacionesMedicas;

type ElementoDe<T extends Seccion>
  = RecomendacionesMedicas[T] extends Array<infer U>
    ? U
    : RecomendacionesMedicas[T];

type Campo<T extends Seccion> = keyof ElementoDe<T>;

export const useRecomendacionesMedicasStore = create(
  devtools<RecomendacionesMedicas>(
    () => ({
      ...STORE_RECOMENDACIONES,
    }),
    {
      enabled: import.meta.env.DEV,
      name: 'RecomendacionesMedicas Store',
    },
  ),
);

export const actualizarCampoRecomendaciones = <T extends Seccion>(
  seccion: T,
  campo: Campo<T>,
  valor: ElementoDe<T>[Campo<T>],
) =>
  useRecomendacionesMedicasStore.setState(state => ({

    ...state,
    [seccion]: {
      ...state[seccion],
      [campo]: valor,
    },
  }));
export const agregarRecomendacion = <T extends Seccion>(
  seccion: T,
  recomendacion: RecomendacionesMedicas[T] extends Array<infer U> ? U : never,
) =>
  useRecomendacionesMedicasStore.setState((state) => {
    const recomendacionesActuales = Array.isArray(state[seccion]) ? state[seccion] : [];

    if (recomendacionesActuales.length >= 4) {
      toast.warning(
        `No se pueden agregar más de 4 recomendaciones`,
      );
      return state;
    }

    return {
      ...state,
      [seccion]: Array.isArray(state[seccion]) ? [...state[seccion], recomendacion] : [recomendacion],
    };
  });

export const editarRecomendacionArreglo = <
  T extends Seccion,
  K extends Campo<T>,
>(
  formulario: T,
  index: number,
  campo: K,
  valor: ElementoDe<T>[K],
) => {
  const recomendaciones = useRecomendacionesMedicasStore.getState()[formulario];
  if (!Array.isArray(recomendaciones)) {
    console.error(`El formulario ${formulario} no es un arreglo`);
    return;
  }

  const copia = recomendaciones.map((item, i) =>
    i === index
      ? { ...item, [campo]: valor }
      : item,
  );

  useRecomendacionesMedicasStore.setState(state => ({
    ...state,
    [formulario]: copia,
  }));
};

export const eliminarRecomendacionArreglo = <T extends Seccion>(
  formulario: T,
  index: number,
) => {
  const recomendaciones = useRecomendacionesMedicasStore.getState()[formulario];
  if (!Array.isArray(recomendaciones)) {
    console.error(`El formulario ${formulario} no es un arreglo`);
    return;
  }
  const copia = recomendaciones.filter((_, i) => i !== index);
  useRecomendacionesMedicasStore.setState(state => ({
    ...state,
    [formulario]: copia,
  }));
};

export const restablecerRecomendaciones = () =>
  useRecomendacionesMedicasStore.setState(() => ({
    ...STORE_RECOMENDACIONES,
  }));
