import type { Config, DriveStep } from 'driver.js';

import { driver } from 'driver.js';
import { useCallback } from 'react';

import styles from '../comunes/estilos/EstilosTourTooltip.module.css';
/**
 * Hook que prepara un tour y devuelve un callback para iniciarlo.
 * @param pasos    Pasos del tour.
 * @param opciones  Config global de driver.js (overlayColor, showProgress…).
 * @returns        Función iniciarTour() que lanza el tour.
 */
export const useTourGuiado = (
  pasos: DriveStep[],
  opciones?: Omit<Config, 'steps'>,
) => {
  const iniciarTour = useCallback(() => {
    driver({
      steps: pasos,
      prevBtnText: 'Anterior',
      nextBtnText: 'Siguiente',
      doneBtnText: 'Cerrar',
      progressText: '{{current}} de {{total}}',
      allowClose: true,
      showProgress: true,
      showButtons: ['previous', 'next'],
      popoverClass: styles.popCustom,
      ...opciones,
    }).drive();
  }, [pasos, opciones]);
  return iniciarTour;
};
