import { Titulo } from 'comunes/estilos/EstComunes';
import Condicional from 'comunes/funcionales/Condicional';
import FormModal from 'comunes/funcionales/forms/Form';
import { useState } from 'react';
import {
  ContFlechas,
  ContTituloFlecha,
  ContVideos,
  ContVisualizarError,
  Icon,
} from './estilos/EstInstructivoFlotante';
import { Iconografia } from './recursos/Iconografia';

const videos: any = [
  {
    titulo: 'Video instructivo de ingreso a la herramienta',
    url: 'https://firebasestorage.googleapis.com/v0/b/perenco-apps.appspot.com/o/instructivoHerramientaPerenco%2Fvideos%2FPerencoInterventoresParte1.mp4?alt=media&token=66cb8e59-f9ce-407a-9153-9da8a497abd7',
  },
  {
    titulo:
      'Video instructivo del módulo de documentos de contratación y requisitos',
    url: 'https://firebasestorage.googleapis.com/v0/b/perenco-apps.appspot.com/o/instructivoHerramientaPerenco%2Fvideos%2FPerencoInterventoresParte2.mp4?alt=media&token=8c1ecc6a-f842-4144-985f-ca2cfd28b488',
  },
  {
    titulo: 'Video instructivo del módulo de requisitos',
    url: 'https://firebasestorage.googleapis.com/v0/b/perenco-apps.appspot.com/o/instructivoHerramientaPerenco%2Fvideos%2FPerencoInterventoresParte3.mp4?alt=media&token=2adb6c50-693b-4b3c-925b-2f3363261c10',
  },
];
const InstructivoVideo = ({ close }: any) => {
  const [estados, setEstados] = useState({ pagina: 1 });

  return (
    <FormModal tittle='Video instructivo' close={() => close()}>
      <ContVideos>
        <ContFlechas
          style={{
            justifyContent: estados.pagina > 0 ? 'space-between' : 'flex-end',
          }}
        >
          <ContTituloFlecha>
            <Condicional condicion={estados.pagina > 0}>
              <Icon
                onClick={() =>
                  setEstados({ ...estados, pagina: estados.pagina - 1 })
                }
              >
                {Iconografia.flechaIzquierda.path}
              </Icon>
            </Condicional>
          </ContTituloFlecha>
          <ContTituloFlecha>
            <Titulo>{videos?.[estados.pagina]?.titulo}</Titulo>
          </ContTituloFlecha>
          <ContTituloFlecha>
            <Condicional condicion={estados.pagina + 1 <= videos.length - 1}>
              <Icon
                onClick={() =>
                  setEstados({ ...estados, pagina: estados.pagina + 1 })
                }
              >
                {Iconografia.flechaDerecha.path}
              </Icon>
            </Condicional>
          </ContTituloFlecha>
        </ContFlechas>
        {videos?.map((_: any, idx: number) => (
          <Condicional condicion={estados.pagina === idx}>
            <video controls width='100%' height='100%'>
              <source
                src={videos?.[estados.pagina]?.url ?? ''}
                type='video/mp4'
              />
              <ContVisualizarError>
                <Titulo>
                  {`El archivo ${
                    videos?.[estados.pagina]?.titulo ?? ''
                  }, no se puede visualizar, se debe descargar.`}
                </Titulo>
                <Titulo>
                  <a href={videos?.[estados.pagina]?.url ?? ''}>
                    Descargar archivo
                  </a>
                </Titulo>
              </ContVisualizarError>
            </video>
          </Condicional>
        ))}
      </ContVideos>
    </FormModal>
  );
};
export default InstructivoVideo;
