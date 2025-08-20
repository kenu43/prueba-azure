import React, { useState } from 'react';
import { toast } from 'sonner';

import { SelectObject } from 'app/comunes/controles/select';

import { OPCIONES_RECHAZO } from '../constantes/ConstGenerales';
import styles from '../estilos/EnviarCorreo.module.css';
import { obtenerLabelPorValue } from '../utilidades/Funciones';
import ModalCorreos from './modal_correos/ModalCorreos';

type EnviarCorreoProps = {
  cerrar: () => void;
  isOpen: boolean;
};

const EnviarCorreo = ({ cerrar, isOpen }: EnviarCorreoProps) => {
  const [respuesta, setRespuesta] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respuesta) {
      toast.error('Debes seleccionar un motivo de rechazo');
      return;
    }
    toast.success('El correo se envió con éxito');
    cerrar();
  };

  return (
    <ModalCorreos isOpen={isOpen} onClose={cerrar}>
      <div className={styles.contenedor}>
        <header className={styles.header}>
          <h2 className={styles.titulo}>Enviar respuesta de gestión</h2>
          <p className={styles.descripcion}>
            Selecciona el motivo de rechazo para confirmar la gestión.
          </p>
        </header>
        <form onSubmit={handleSubmit} className={styles.contenido_formulario}>
          <main className={styles.contenido}>
            <SelectObject
              label="Seleccione el motivo"
              optionsArray={OPCIONES_RECHAZO}
              value={obtenerLabelPorValue(respuesta, OPCIONES_RECHAZO)}
              onChange={e => setRespuesta(e.value)}
              target="label"
              name="motivo-rechazo"
            />
          </main>
          <footer className={styles.modal_footer}>
            <button
              key="cancelar"
              type="button"
              onClick={cerrar}
              className={styles.cancelar}
            >
              Cancelar
            </button>
            <button
              key="guardar"
              type="submit"
              disabled={!respuesta}
              className={styles.confirmar}
            >
              Confirmar
            </button>
          </footer>
        </form>
      </div>
    </ModalCorreos>
  );
};

export default EnviarCorreo;
