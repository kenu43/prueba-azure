import { Titulo } from 'comunes/estilos/EstComunes';
import Cargando from 'comunes/informativos/Cargando';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useState } from 'react';
import InstructivoFlotante from './InstructivoFlotante';
import { ContVisualizarError } from './estilos/EstInstructivo';
const storage = getStorage();
const storageRef: any = ref(storage, 'instructivoHerramientaPerenco');

const InstructivosHerramientas = () => {
  const [url, setUrl] = useState('');

  const instructivoStorage = () => {
    const storageInstructivo: any = ref(
      storageRef,
      '/pdf/InstructivoHerramienta.pdf'
    );

    getDownloadURL(storageInstructivo).then((vinculo) => {
      setUrl(vinculo);
      return vinculo;
    });
    return url;
  };
  if (url === '') {
    instructivoStorage();
  }
  return (
    <>
      <InstructivoFlotante />
      {url === '' ? (
        <Cargando mensaje='Cargando instructivo' />
      ) : (
        <object data={url ?? ''} width='100%' height='100%'>
          <ContVisualizarError>
            <Titulo>
              {`El archivo ${'este'}, no se puede visualizar, se debe descargar.`}
            </Titulo>
            <Titulo>
              <a href={url ?? ''}>Descargar archivo</a>
            </Titulo>
          </ContVisualizarError>
        </object>
      )}
    </>
  );
};
export default InstructivosHerramientas;
