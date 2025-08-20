import Toast from 'comunes/informativos/Notificaciones';

import { Button } from 'comunes/controles/Buttons';
import { Parrafo } from 'comunes/estilos/EstComunes';
import Cargando from 'comunes/informativos/Cargando';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useRef, useState } from 'react';
import {
  ContHeader,
  ContImagen,
  ContImagenUrl,
  ContInfo,
  ContInfoPersonal,
  ContNombreUsuario,
} from '../estilos/EstPerfil';
import { capitalizarPrimeraLetra } from '../funciones/FunPerfil';
import imagenUsuario from '../recursos/usuario.png';
import { FileUploaderPropsType } from '../types/CargarFoto';

const storage = getStorage();
const storageRef: any = ref(storage, 'perfiles');

const FileUploader = ({ accept, onChange }: FileUploaderPropsType) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    const fileStatus = event.target.files?.length !== 0;
    onChange({ file: fileUploaded, status: fileStatus });
  };

  return (
    <>
      <input
        accept={accept}
        type='file'
        ref={hiddenFileInput}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <Button
        icon='import'
        name='Cargar imagen'
        permisos={['importar']}
        sizeBtn='normal'
        type='button'
        typeBtn='import'
        onClick={handleClick}
      />
    </>
  );
};
const CargarFoto = ({ usuario }: any) => {
  const [url, setUrl] = useState(imagenUsuario);
  const [cargando, setCargando] = useState<number>(0);

  const subirArchivo = async (tipoArchivo: any) => {
    const nombreArchivo = `${usuario?.user_id}`;

    const metaData: any = {
      customMetadata: {
        name: usuario?.name ?? '',
        organizacion: usuario?.organizacion ?? '',
      },
    };

    const bucketRef = ref(storageRef, nombreArchivo);

    const uploadTask = uploadBytesResumable(bucketRef, tipoArchivo, metaData);

    const objeto: any = { url: '', nombre: nombreArchivo };
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCargando(progress);
      },
      (error) => Toast(error.message, 'error'),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          objeto.url = downloadURL;
        });
      }
    );
  };

  const validarExistenciaImagen = () => {
    const storagePerfil: any = ref(storageRef, usuario.user_id);
    getDownloadURL(storagePerfil).then((vinculo) => {
      setUrl(vinculo);
      return vinculo;
    });
    return url;
  };

  return (
    <ContHeader>
      {cargando !== 0 && cargando !== 100 ? (
        <Cargando mensaje='Cargando imagen' />
      ) : (
        <ContImagen>
          <ContImagenUrl
            urlImg={validarExistenciaImagen() ?? ''}
            src={validarExistenciaImagen() ?? ''}
            alt='Imagen usuario'
          />
        </ContImagen>
      )}
      <ContInfoPersonal>
        <ContInfo>
          <ContNombreUsuario>{usuario?.name ?? ''}</ContNombreUsuario>
        </ContInfo>
        <ContInfo>
          <Parrafo style={{ color: 'var(--gray-11)' }}>
            {usuario?.email ?? ''}
          </Parrafo>
        </ContInfo>
        <ContInfo>
          <Parrafo style={{ color: 'var(--gray-11)' }}>
            {capitalizarPrimeraLetra(usuario?.rol) ?? ''}
          </Parrafo>
        </ContInfo>
        <ContInfo>
          <FileUploader
            onChange={({ file, status }) => {
              if (status && file) subirArchivo(file);
            }}
          />
        </ContInfo>
      </ContInfoPersonal>
    </ContHeader>
  );
};
export default CargarFoto;
