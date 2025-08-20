/* eslint-disable no-unused-expressions */
/* eslint-disable no-async-promise-executor */
import { TipoToast, ToastType } from 'comunes/types/ComunesTypes';

import Errores from '../recursos/Errores.json';

const tiposDeToast: ToastType = {
  advertencia: 'Advertencia',
  error: 'Error',
  informacion: 'Información',
  exitoso: 'Proceso exitoso',
  notificacion: 'Notificación',
};

const init = () => {
  const node = document.createElement('section');
  node.classList.add('gui-toast-group');

  document.firstElementChild!.insertBefore(node, document.body);
  return node;
};

const Toaster = init();
const flipToast = (toast: HTMLOutputElement) => {
  // FIRST
  const first = Toaster.offsetHeight;

  // add new child to change container size
  Toaster.appendChild(toast);

  // LAST
  const last = Toaster.offsetHeight;

  // INVERT
  const invert = last - first;

  // PLAY
  const animation = Toaster.animate(
    [{ transform: `translateY(${invert}px)` }, { transform: 'translateY(0)' }],
    {
      duration: 150,
      easing: 'cubic-bezier(.35,.51,.25,1.14)',
    }
  );

  animation.startTime = document.timeline.currentTime;
};

const createToast = (text: string, tipo: TipoToast) => {
  const node = document.createElement('output');
  const titulo = document.createElement('span');
  const mensaje = document.createElement('p');

  const textoValidado = Errores.find((err) => err.codigo === text);
  const tipoValidado = Errores.find((err) => err.codigo === text);

  titulo.innerText = tipoValidado?.tipo ?? tiposDeToast[tipo];
  mensaje.innerText = textoValidado?.mensaje ?? text;

  node.classList.add(tipo);
  node.setAttribute('role', 'status');
  node.setAttribute('aria-live', 'polite');

  node.appendChild(titulo);
  node.appendChild(mensaje);

  return node;
};

const addToast = (toast: HTMLOutputElement) => {
  const { matches: motionOK } = window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  );

  Toaster.children.length > 0 && motionOK
    ? flipToast(toast)
    : Toaster.appendChild(toast);
};

const Toast = (text: string, tipo: TipoToast) => {
  const toast = createToast(text, tipo);
  addToast(toast);

  return new Promise<void>(async (resolve) => {
    await Promise.allSettled(
      toast.getAnimations().map((animation) => animation.finished)
    );
    Toaster.removeChild(toast);
    resolve();
  });
};

export default Toast;
