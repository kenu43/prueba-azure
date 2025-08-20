import { Button } from 'comunes/controles/Buttons';
import Toast from 'comunes/informativos/Notificaciones';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  UploadMetadata,
  uploadString,
} from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';

import { getLocalDate } from 'utilidades/FuncionesGenerales';
import { Etiqueta } from '../../estilos/EstComunes';
import {
  CanvasBox,
  ContenedorFirmas,
  ContLabelIcono,
  Icono,
  IconosFirma,
} from './estilos/EstFirmas';
import { iconografia } from './recursos/Iconografia';
import { FirmasProps, MousPositionState } from './types/FirmasTypes';

const storage = getStorage();

const SignDesktop = ({
  label,
  permisos,
  disabled,
  required,
  style,
  path,
  firma,
  onChange,
}: FirmasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [mousePosition, setPosition] = useState<MousPositionState>({
    xBefore: 0,
    yBefore: 0,
    xAfter: 0,
    yAfter: 0,
  });

  const context = canvasRef.current?.getContext('2d');

  const realX = (x: number) =>
    x - (canvasRef.current?.getBoundingClientRect()?.left ?? 0);
  const realY = (y: number) =>
    y - (canvasRef.current?.getBoundingClientRect()?.top ?? 0);

  // Escritorio
  const starDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (disabled) return;

    const xBefore = mousePosition.xAfter;
    const yBefore = mousePosition.yAfter;
    const xAfter = realX(event.clientX);
    const yAfter = realY(event.clientY);

    context!.beginPath();
    context!.fillStyle = 'var(--color-primary-text)';
    context!.fillRect(xAfter, yAfter, 1, 1);
    context!.closePath();

    setPosition({ xBefore, yBefore, xAfter, yAfter });
    setIsDrawing(true);
  };
  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing || disabled) return;

    const xBefore = mousePosition.xAfter;
    const yBefore = mousePosition.yAfter;
    const xAfter = realX(event.clientX);
    const yAfter = realY(event.clientY);

    context!.beginPath();
    context!.moveTo(xBefore, yBefore);
    context!.lineTo(xAfter, yAfter);
    context!.strokeStyle = 'var(--color-primary-text)';
    context!.lineWidth = 1;
    context!.stroke();
    context!.closePath();

    setPosition({ xBefore, yBefore, xAfter, yAfter });
  };
  const finishDrawing = () => setIsDrawing(false);

  // movil

  //Funciones
  const clearDraw = async () => {
    if (!firma) {
      context!.clearRect(
        0,
        0,
        canvasRef.current?.width!,
        canvasRef.current?.height!
      );
    } else {
      const imagenRef = ref(storage, `${path}/firma.png`);
      await deleteObject(imagenRef)
        .then(() => {
          onChange('');
          Toast('Se eliminó la firma', 'informacion');
        })
        .catch(() =>
          Toast('Ha ocurrido un error al eliminar la firma', 'error')
        );
    }
  };
  const loadSign = async () => {
    const { fecha, hora } = getLocalDate();

    const imagenRef = ref(storage, `${path}/firma.png`);
    const metaData: UploadMetadata = {
      customMetadata: { fecha, hora, contentType: 'image/png' },
    };

    const canvas = canvasRef.current!;
    const img = canvas.toDataURL('image/png').split(',');

    await uploadString(imagenRef, img[1], 'base64', metaData).then(async () => {
      await getDownloadURL(imagenRef)
        .then((vinculo) => {
          onChange(vinculo);
          Toast('Se ha cargado la firma exitosamente', 'exitoso');
        })
        .catch(() =>
          Toast('No se pudo cargar la firma vuelva a intentarlo', 'error')
        );
    });
  };

  useEffect(() => {
    const imagenRef = ref(storage, `${path}/firma.png`);
    getDownloadURL(imagenRef)
      .then((vinculo) => onChange(vinculo))
      .catch(() => onChange(''));
  }, [path]);

  return (
    <ContenedorFirmas style={style} ref={content}>
      <ContLabelIcono>
        <Etiqueta>{label}</Etiqueta>
        <IconosFirma>
          <Button
            icon="import"
            name="Cargar firma"
            sizeBtn="small"
            type="button"
            typeBtn="import"
            onClick={() => loadSign()}
            permisos={permisos}
            disabled={disabled || !!firma}
          />
          <Icono role="button" disabled={disabled} onClick={clearDraw}>
            {iconografia.limpiar.path}
          </Icono>
        </IconosFirma>
      </ContLabelIcono>

      {firma ? (
        <img
          src={firma}
          alt="Firma"
          width={canvasRef.current?.width!}
          height={canvasRef.current?.height!}
        />
      ) : (
        <CanvasBox
          required={required}
          onMouseUp={finishDrawing}
          onMouseOut={finishDrawing}
          onMouseDown={starDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={content.current?.clientWidth! * 0.9}
        />
      )}
    </ContenedorFirmas>
  );
};

export default SignDesktop;
