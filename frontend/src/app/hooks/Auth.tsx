import type { User } from 'firebase/auth';

import { useEffect } from 'react';
import { toast } from 'sonner';

import type { UsuarioType } from 'app/store/types/ContextoTypes';

import { guardarUsuario, useUserStore } from 'app/store/PrincipalStore';
import { auth } from 'configuraciones/Firebase';

export const useAutenticacion = () => {
  useEffect(() => {
    const procesarTokenUsuario = async (user: User) => {
      const currentTokenInStore = useUserStore.getState().token;

      try {
        const userToken = await user.getIdTokenResult();
        const newToken = userToken.token;
        const { claims } = userToken;

        const usuario = {
          uid: claims?.user_id ?? '',
          email: claims?.email ?? '',
          emailVerified: claims?.email_verified ?? false,
          authTime: claims.auth_time ?? '',
          claims: {
            name: claims?.name ?? '',
            rol: claims?.rol ?? '',
            organizacion: claims?.organizacion ?? '',
            permisos: claims?.permisos ?? '',
            grupo: claims?.grupo ?? '',
            firma: claims?.firma ?? '',
            auth_provider: '',
            auth_second_factor: '',
          },
        } as UsuarioType;

        // Actualiza el store solo si hay un nuevo token y es diferente al actual
        if (newToken && newToken !== currentTokenInStore) {
          guardarUsuario(usuario, newToken);
        }
        else if (!newToken) {
          console.warn('No se pudo obtener un nuevo token para el usuario.');
        }
      }
      catch (error) {
        // TODO: Implementar la gestión de errores con logs en Graphana
        console.warn(error);
        toast.error('Error al procesar la sesión del usuario.');
      }
    };

    // Establece el listener de Firebase para cambios de autenticación/token.
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user === null) {
        toast.info('No tienes iniciada la sesión en la aplicación.');
      }
      else {
        procesarTokenUsuario(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []); // Dependencia: La acción del store (generalmente estable)
};
