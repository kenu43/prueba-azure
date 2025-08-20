import { useState, useEffect } from 'react';
import { useUserStore } from 'app/store/PrincipalStore';

import { TemDetail, TempContainer } from '../estilos/EstTemporizador';

const Temporizador = () => {
  const expirationTime = useUserStore(({ usuario }) => usuario?.expirationTime);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = Date.parse(expirationTime ?? '');

  const getTime = () => {
    const time = deadline - Date.now();

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    if (minutes === 0) {
      // Saca al usuario de sesión
    }
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TempContainer>
      <TemDetail>{`Tiempo: ${hours}:${minutes}:${seconds}`}</TemDetail>
    </TempContainer>
  );
};

export default Temporizador;
