import { useRef, useState, useTransition } from 'react';

import {
  CargandoIcono,
  EntrarIcono,
  OcultarContrasenaIcono,
  RecuperarContrasenaIcono,
  VerContrasenaIcono,
} from 'app/autenticacion/recursos/Iconografia';
import { actualizarEstado } from 'app/autenticacion/store/AutenticacionStore';
import { autenticarUsuario } from 'app/autenticacion/utilidades/Autenticacion';
import Condicional from 'comunes/funcionales/Condicional';

import estilos from '../../estilos/UsuarioContrasena.module.css';
import { validarEmail, validarErrores } from '../../utilidades/Validaciones';

const FormLogin = () => {
  const [isPending, startTransition] = useTransition();
  const [ver, setVer] = useState(false);
  const correoRef = useRef<HTMLInputElement>(null);
  const contrasenaRef = useRef<HTMLInputElement>(null);

  const autenticar = () => {
    const esCorrectoCorreo = validarEmail(correoRef.current!.value);
    const correo = correoRef?.current?.value ?? '';
    const contrasena = contrasenaRef?.current?.value ?? '';

    if (!esCorrectoCorreo) {
      validarErrores('email/company-invalid');
      return;
    }

    autenticarUsuario(correo, contrasena);
  };

  return (
    <form
      className={estilos.contenedor_ppal}
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(() => autenticar());
      }}
    >
      <h1 className={estilos.titulo_aplicacion}>Claro APP</h1>

      <section className={estilos.separador}>
        <span>Diligencia las credenciales para iniciar sesión en la plataforma</span>
      </section>

      <section className={estilos.contenedor_controles}>
        <label className={estilos.etiquetas_controles} htmlFor="email">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          title="Debes ingresar un correo electrónico válido"
          className={estilos.controles}
          placeholder="Escribe el correo electrónico"
          required
          ref={correoRef}
        />
      </section>

      <section className={estilos.contenedor_controles}>
        <label className={estilos.etiquetas_controles} htmlFor="pass-id">
          Contraseña
        </label>

        <div className={estilos.controles_password}>
          <input
            id="pass-id"
            type={ver ? 'text' : 'password'}
            className={estilos.controles}
            title="Debes ingresar una constraseña válida"
            placeholder="Escribe la contraseña"
            ref={contrasenaRef}
            required
          />
          {ver
            ? (
                <VerContrasenaIcono role="button" onClick={() => setVer(false)} />
              )
            : (
                <OcultarContrasenaIcono
                  role="button"
                  onClick={() => setVer(true)}
                />
              )}
        </div>
      </section>

      <Condicional condicion={isPending}>
        <button type="submit" className={estilos.boton_entrar}>
          <span>Autenticando</span>
          <CargandoIcono />
        </button>
      </Condicional>

      <Condicional condicion={!isPending}>
        <button type="submit" className={estilos.boton_entrar}>
          <span>Entrar a la plataforma</span>
          <EntrarIcono />
        </button>
      </Condicional>

      <section className={estilos.separador}>
        <div />
        <span>¿Olvidaste la contraseña?</span>
        <div />
      </section>

      <button
        type="button"
        className={estilos.boton_restaurar}
        onClick={() => actualizarEstado('restaurar')}
      >
        <RecuperarContrasenaIcono />
        <span>Recuperar contraseña</span>
      </button>
    </form>
  );
};

export default FormLogin;
