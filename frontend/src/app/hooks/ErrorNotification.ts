import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import type { ErrorHookType } from './types/HookErrorTypes';

const useErrorNotification = ({ error }: ErrorHookType) => {
  const { pathname } = useLocation();
  const tipoError = error.message === 'access/denied' ? 'Acceso denegado' : error.name;

  useEffect(() => {
    if (!import.meta.env.DEV) {
      fetch(import.meta.env.VITE_SLACK_SUPPORT, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          text: JSON.stringify({
            herramienta: import.meta.env.VITE_WEBSITE_NAME,
            modulo: pathname,
            ...error,
          }),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }, [pathname, error]);

  return {
    mensaje: tipoError,
  };
};

export default useErrorNotification;
