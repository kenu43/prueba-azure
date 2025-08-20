import type { PointerEvent } from 'react';

import { useRef, useState } from 'react';

/**
 * Hook personalizado para gestionar el arrastre táctil para cerrar un componente.
 * Permite cerrar un componente arrastrando hacia abajo cuando se supera un umbral.
 *
 * @param activo - Indica si el comportamiento de arrastre está activado
 * @param cerrar - Función que se ejecutará cuando se complete el gesto de arrastre
 * @returns {object} Un objeto con el desplazamiento actual y las funciones para manejar los eventos táctiles
 * @property {number} desplazamiento - La cantidad de píxeles que se ha arrastrado hacia abajo
 * @property {Function} bajar - Función para manejar el evento de inicio del arrastre
 * @property {Function} mover - Función para manejar el evento de movimiento durante el arrastre
 * @property {Function} subir - Función para manejar el evento de finalización del arrastre
 */
export default function useArrastreCerrar(
  activo: boolean,
  cerrar: () => void,
) {
  const inicioY = useRef<number | null>(null);
  const [desplazamiento, setDesplazamiento] = useState(0);

  const bajar = (e: PointerEvent) => {
    if (activo)
      inicioY.current = e.clientY;
  };

  const mover = (e: PointerEvent) => {
    if (!activo || inicioY.current === null)
      return;
    const dy = e.clientY - inicioY.current;
    if (dy > 0)
      setDesplazamiento(dy);
  };

  const subir = () => {
    if (!activo)
      return;
    if (desplazamiento > 100)
      cerrar();
    setDesplazamiento(0);
    inicioY.current = null;
  };

  return { desplazamiento, bajar, mover, subir };
}
