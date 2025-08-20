import { useEffect } from 'react';
import { toast } from 'sonner';

import { guardarDatos } from '../store/StoreTrabajadores';
import { validarMenorEdad } from './Funciones';

export const useValidarFechasOcupacional = (
  fechaNacimiento: string,
  fechaIngresoCargo: string,
  fechaRetiro: string,
) => {
  useEffect(() => {
    const hoy = new Date();

    if (fechaIngresoCargo) {
      const ingreso = new Date(fechaIngresoCargo);
      const diezAniosDespues = new Date(hoy);
      diezAniosDespues.setFullYear(hoy.getFullYear() + 10);

      if (ingreso > diezAniosDespues) {
        toast.warning(
          'La fecha de ingreso no puede superar los 10 años a partir de hoy',
        );
        guardarDatos('fechaIngresoCargo', '');
        return;
      }

      if (!validarMenorEdad(fechaNacimiento, fechaIngresoCargo)) {
        toast.warning(
          'El trabajador no pudo haber ingresado a la empresa siendo menor de 16 años',
        );
        guardarDatos('fechaIngresoCargo', '');
        return;
      }
    }

    if (fechaRetiro) {
      const retiro = new Date(fechaRetiro);
      const ochentaAniosDespues = new Date(hoy);
      ochentaAniosDespues.setFullYear(hoy.getFullYear() + 80);

      if (retiro > ochentaAniosDespues) {
        toast.warning(
          'La fecha de retiro no puede superar los 70 años a partir de hoy',
        );
        guardarDatos('fechaRetiro', '');
      }
    }
  }, [fechaNacimiento, fechaIngresoCargo, fechaRetiro]);
};
