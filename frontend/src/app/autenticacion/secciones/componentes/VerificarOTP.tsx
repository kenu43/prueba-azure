import { useLazyQuery } from '@apollo/client';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

import { GET_VERIFICAR_OTP } from 'app/autenticacion/peticiones/Queries';
import {
  CargandoIcono,
  VerifcarQRIcono,
} from 'app/autenticacion/recursos/Iconografia';
import useAutenticacionStore, {
  actualizarCodigo,
} from 'app/autenticacion/store/AutenticacionStore';
import { validarCodigo } from 'app/autenticacion/utilidades/Validaciones';
import Condicional from 'comunes/funcionales/Condicional';
import { auth } from 'configuraciones/Firebase';

import estilos from '../../estilos/Autenticador.module.css';
import OTP from './OTP';

const VerificarOTP = () => {
  const { codigo } = useAutenticacionStore(
    useShallow(({ codigo }) => ({ codigo })),
  );
  const [verificarOTP, { loading }] = useLazyQuery(GET_VERIFICAR_OTP, {
    onCompleted: ({ verificarOTP }) => {
      if (verificarOTP === 'authorized') {
        // TODO: Colocar la logica para las aplicaciones genericas
      }
      else {
        actualizarCodigo(Array.from({ length: 6 }).fill('') as string[]);
        toast.error('No se encuentra autorizado');
      }
    },
    onError: () => {
      actualizarCodigo(Array.from({ length: 6 }).fill('') as string[]);
      toast.error('No se pudo verificar el código de autenticación');
    },
  });

  const verificarCodigoDigitado = () => {
    const esCorrectoCodigo = validarCodigo();

    if (esCorrectoCodigo) {
      verificarOTP({
        variables: { codigo: codigo.join('') },
      });
      return;
    }

    actualizarCodigo(Array.from({ length: 6 }).fill('') as string[]);
    toast.error('El código es incorrecto o ya expiró');
  };

  return (
    <section className={estilos.contenedor_verificar}>
      <h3 style={{ color: 'var(--color-primary-text)', textAlign: 'center' }}>
        Verifica código de autorización
      </h3>
      <p className={estilos.textos}>
        Digita el código de 6 dígitos que encuentras en la aplicación de Google
        Authenticator
      </p>

      <OTP />

      <section className={estilos.contenedor_botones}>
        <button
          className={estilos.boton_cancelar}
          type="button"
          onClick={() => {
            signOut(auth).then(() => {
              window.location.reload();
            });
          }}
        >
          <span>Cancelar</span>
        </button>

        <Condicional condicion={loading}>
          <button
            className={estilos.boton_verificar}
            type="button"
            disabled={loading}
          >
            <CargandoIcono />
            <span>Verificando</span>
          </button>
        </Condicional>

        <Condicional condicion={!loading}>
          <button
            className={estilos.boton_verificar}
            type="button"
            onClick={() => verificarCodigoDigitado()}
          >
            <VerifcarQRIcono />
            <span>Enviar solicitud</span>
          </button>
        </Condicional>
      </section>
    </section>
  );
};

export default VerificarOTP;
