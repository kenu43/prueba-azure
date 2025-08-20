import { nanoid } from 'nanoid';
import { useRef } from 'react';

import useAutenticacionStore, {
  actualizarCodigo,
} from 'app/autenticacion/store/AutenticacionStore';

import estilos from '../../estilos/Autenticador.module.css';

const OTP = ({ longitud = 6 }: { longitud?: number }) => {
  const { codigo } = useAutenticacionStore(({ codigo }) => ({ codigo }));
  const referencia = useRef<HTMLInputElement[]>([]);

  const editarCodigo = (i: number, num: string) => {
    if (Number.isNaN(Number(num)))
      return;
    const nuevoCodigo = [...codigo];
    nuevoCodigo[i] = num.substring(num.length - 1);
    actualizarCodigo(nuevoCodigo);

    if (num && i < longitud - 1)
      referencia.current[i + 1]?.focus();
  };

  const pegarCodigo = (portapapeles: DataTransfer) => {
    const codigoPegado = portapapeles?.getData('text').trim();

    if (Number.isNaN(Number(codigoPegado)))
      return;

    const numeros = codigoPegado?.split('').slice(0, longitud);
    const nuevoCodigo = [...codigo];
    numeros?.forEach((num, i) => (nuevoCodigo[i] = num));
    actualizarCodigo(nuevoCodigo);
  };

  return (
    <main className={estilos.contenedor}>
      <div className={estilos.contenedor_codigo}>
        {codigo.map((num, i) => (
          <input
            className={estilos.caja_codigo}
            ref={(num) => {
              if (num)
                referencia.current[i] = num;
            }}
            key={nanoid(10)}
            value={num}
            onChange={num => editarCodigo(i, num.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !codigo[i] && i > 0)
                referencia.current[i - 1]?.focus();
            }}
            onPaste={(e) => {
              e.preventDefault();
              pegarCodigo(e.clipboardData);
            }}
          />
        ))}
      </div>
    </main>
  );
};

export default OTP;
