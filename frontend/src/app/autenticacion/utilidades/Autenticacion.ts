import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from 'configuraciones/Firebase';
import { actualizarToken } from 'store/PrincipalStore';

import { actualizarEstado } from '../store/AutenticacionStore';
import { validarErrores } from './Validaciones';

export const autenticarUsuario = async (correo: string, contrasena: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, correo, contrasena);
    const token = await user.getIdToken();
    actualizarToken(token);
    actualizarEstado('mfa');
  }
  catch (error: any) {
    validarErrores(error.code ?? 'auth/unknown-error');
  }
};
