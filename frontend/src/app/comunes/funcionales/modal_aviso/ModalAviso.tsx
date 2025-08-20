import type { JSX } from 'react';

import { useEffect, useRef, useState } from 'react';

import type { PropsModalAviso, TipoAviso } from 'comunes/types/ComunesTypes';

import {
  AdvertenciaAvisoIcono,
  ConfirmarAvisoIcono,
  EliminarAvisoIcono,
} from 'comunes/recursos/Iconografia';

import estilos from '../../estilos/EstilosModalAviso.module.css';

const ModalAviso = ({
  abrir,
  tipo = 'advertencia',
  titulo = '',
  mensaje = '¿Estás seguro de continuar?',
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  onConfirmar,
  onCancelar,
  colorBotonConfirmar,
}: PropsModalAviso) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [cerrando, setCerrando] = useState(false);

  useEffect(() => {
    const modal_aviso = ref.current;
    if (!modal_aviso) return;

    if (abrir && !modal_aviso.open) modal_aviso.showModal();
    if (!abrir && modal_aviso.open && !cerrando) setCerrando(true);
  }, [abrir, cerrando]);

  const handleAnimEnd = () => {
    if (!cerrando) return;
    ref.current?.close();
    setCerrando(false);
    onCancelar();
  };

  const cerrar = () => setCerrando(true);
  const confirmar = () => {
    onConfirmar();
    cerrar();
  };

  const iconosAviso: Record<
    TipoAviso,
    (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  > = {
    advertencia: AdvertenciaAvisoIcono,
    eliminar: EliminarAvisoIcono,
    exito: ConfirmarAvisoIcono,
  };
  const IconoAviso = iconosAviso[tipo];
  const clasesModal = `
    ${estilos.modal_aviso}
    ${estilos[tipo]}
    ${cerrando ? estilos.cerrando : estilos.abriendo}
  `;

  const estiloConfirmar = colorBotonConfirmar
    ? ({ '--color-confirmar': colorBotonConfirmar } as React.CSSProperties)
    : undefined;

  return (
    <dialog
      ref={ref}
      className={clasesModal.trim()}
      onCancel={cerrar}
      onClose={onCancelar}
      onAnimationEnd={handleAnimEnd}
    >
      <div className={estilos.modal_contenido}>
        <IconoAviso className={estilos.icono} aria-hidden />

        {titulo && <h2 className={estilos.titulo}>{titulo}</h2>}
        <p className={estilos.mensaje}>{mensaje}</p>

        <div className={estilos.grupo_botones}>
          <button
            type='button'
            className={estilos.boton_cancelar}
            onClick={cerrar}
          >
            {textoCancelar}
          </button>

          <button
            type='button'
            style={estiloConfirmar}
            className={estilos.boton_confirmar}
            onClick={confirmar}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalAviso;
