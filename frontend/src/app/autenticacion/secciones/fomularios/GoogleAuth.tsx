import estilos from '../../estilos/Autenticador.module.css';
import EscanearQR from '../componentes/EscanearQR';
import VerificarOTP from '../componentes/VerificarOTP';

const GoogleAuth = () => {
  return (
    <main className={estilos.contenedor_autenticador}>
      <h1 className={estilos.titulo_mfa}>Doble factor de autenticación</h1>
      <EscanearQR />
      <VerificarOTP />
    </main>
  );
};

export default GoogleAuth;
