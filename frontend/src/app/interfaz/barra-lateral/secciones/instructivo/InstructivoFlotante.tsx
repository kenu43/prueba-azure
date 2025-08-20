import Condicional from 'comunes/funcionales/Condicional';
import { useState } from 'react';
import InstructivoVideo from './InstructivoVideos';
import { BotonPrincipal, Icon } from './estilos/EstInstructivoFlotante';
import { Iconografia } from './recursos/Iconografia';

const InstructivoFlotante = ({}) => {
  const [estados, setEstados] = useState({ modalInstructivo: false });
  return (
    <>
      <BotonPrincipal
        onClick={() => setEstados({ ...estados, modalInstructivo: true })}
      >
        <Icon>{Iconografia.video.path}</Icon>
      </BotonPrincipal>
      <Condicional condicion={estados.modalInstructivo}>
        <InstructivoVideo
          close={() => setEstados({ ...estados, modalInstructivo: false })}
        />
      </Condicional>
    </>
  );
};
export default InstructivoFlotante;
