import { sendPasswordResetEmail } from 'firebase/auth';
import { useRef } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

import { RecuperarContrasenaIcono } from 'app/autenticacion/recursos/Iconografia';
import { actualizarEstado } from 'app/autenticacion/store/AutenticacionStore';
import { auth } from 'configuraciones/Firebase';

import estilos from '../../estilos/UsuarioContrasena.module.css';
import { validarEmail, validarErrores } from '../../utilidades/Validaciones';

const RestaurarConstrasena = () => {
  const correo = useRef<HTMLInputElement>(null);

  const restablecerContrasena = () => {
    const esCorrectoEmail = validarEmail(correo.current!.value);

    if (esCorrectoEmail) {
      sendPasswordResetEmail(auth, correo.current!.value)
        .then(() => {
          toast.info('Le hemos enviado un enlace al correo diligenciado');
        })
        .catch((err) => {
          validarErrores(err.code);
        });
    }
    else {
      validarErrores('email/company-invalid');
    }
  };

  return (
    <form
      className={estilos.contenedor_ppal}
      onSubmit={(e) => {
        e.preventDefault();
        restablecerContrasena();
      }}
    >
      <h1 className={estilos.titulo_aplicacion}>Claro APP</h1>
      <h6 className={estilos.subtitulo_aplicacion}>Restaurar contraseña</h6>

      <small className={estilos.informacion}>
        {`Diligencia las credenciales para iniciar sesión en la plataforma, recuerda
        que debe ser el corporativo, la herramienta no envía la solicitud a otro proveedor
        de correo, por ejemplo, Gmail, Hotmail, Outlook, etc.`}
      </small>

      <section className={estilos.contenedor_controles}>
        <label className={estilos.etiquetas_controles} htmlFor="email-rest">
          Correo electrónico
        </label>
        <input
          id="email-rest"
          type="email"
          className={estilos.controles}
          placeholder="Escribe el correo electrónico"
          ref={correo}
        />
      </section>

      <section className={estilos.contenedor_botones}>
        <button
          className={estilos.boton_cancelar}
          type="button"
          onClick={() => actualizarEstado('login')}
        >
          <span>Cancelar</span>
        </button>

        <button className={estilos.boton_entrar} type="submit">
          <RecuperarContrasenaIcono />
          <span>Enviar solicitud</span>
        </button>
      </section>
    </form>
  );
};

export default RestaurarConstrasena;
