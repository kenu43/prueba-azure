import QRCode from 'react-qr-code';
import { useState } from 'react';
import Condicional from 'comunes/funcionales/Condicional';
import { QRType } from 'app/autenticacion/types/LoginTypes';
import { GET_URI } from 'app/autenticacion/peticiones/Queries';
import { useSuspenseQuery } from '@apollo/client';

import estilos from '../../estilos/Autenticador.module.css';

const EscanearQR = () => {
  const { data } = useSuspenseQuery<QRType>(GET_URI);
  const [abrirQr, setAbrirQr] = useState(false);
  const otp = localStorage.getItem('otp');
  const estiloTitulo = otp ? 'titulo_sincronizado' : 'titulo_sincronizacion';

  return (
    <>
      <h3 className={estilos[estiloTitulo]}>
        {`${otp ? 'Cuenta sincronizada' : 'Sincroniza la cuenta'}`}
      </h3>

      <Condicional condicion={abrirQr}>
        <section className={estilos.contenedor_codigoqr}>
          <div className={estilos.contenedor_ayuda_escaneo}>
            <QRCode
              size={60}
              style={{ height: 'auto', maxWidth: '200', width: '200' }}
              value={otp ?? ''}
              viewBox={'0 0 200 200'}
            />
          </div>
        </section>
      </Condicional>

      <Condicional condicion={!otp}>
        <button
          className={estilos.boton_verificar}
          onClick={() => {
            localStorage.setItem('otp', data.generarURIOTP);
            setAbrirQr(!abrirQr);
          }}
        >
          Da clic para escanear el código QR
        </button>
      </Condicional>
    </>
  );
};

export default EscanearQR;
