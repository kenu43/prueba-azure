import { Colores } from 'comunes/types/ComunesTypes';

// Constantes para los estilos comunes
const colores: Colores = {
  primario: 'var(--brand-primary)',
  secundario: 'var(--brand-secondary)',
  advertencia: 'var(--system-warning-color)',
  error: 'var(--system-error-color)',
  informacion: 'var(--system-info-color)',
  exitoso: 'var(--system-success-color)',
  desactivado: 'var(--system-disabled-color)',
};

export const seleccionarColor = (color: keyof Colores | undefined): string => {
  if (color) {
    return colores[color];
  }

  return 'var(--color-primary-text)';
};
