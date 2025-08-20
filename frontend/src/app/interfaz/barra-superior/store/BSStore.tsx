import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BarraSuperiorState } from '../constantes/ConstGenerales';
import { IBSState } from '../types/StoreTypes';

export const useBSStore = create(
  persist<IBSState>(() => BarraSuperiorState, {
    name: 'profile',
  })
);
