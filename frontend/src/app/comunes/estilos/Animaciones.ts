import { keyframes } from 'styled-components';

export const CargandoAnimation = keyframes`
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    opacity: 1;
  }
`;

export const Rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const CardEntrance = keyframes`
  0% {
    -webkit-transform: translateX(200px);
            transform: translateX(200px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
`;

export const CardExit = keyframes`
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(200px);
            transform: translateX(200px);
    opacity: 0;
  }
`;

export const FadeIn = keyframes`
  0% {
    -webkit-transform: translateZ(-80px);
            transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
`;

export const SpinnerQtyZ = keyframes`
    0% {
      r: 0;
    }
    25% {
      r: 3px;
      cx: 4px;
    }
    50% {
      r: 3px;
      cx: 12px;
    }
    75% {
      r: 3px;
      cx: 20px;
    }
    100% {
      r: 0;
      cx: 20px;
    }
`;

export const zoomIn = keyframes`
from {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
      opacity: 0.5;
    }
  100% {
      opacity: 1;
    }
`;

export const verLista = keyframes`
   0% {
    -webkit-transform: scaleY(0.2);
    transform: scaleY(0.2);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
 `;

export const ocultar = keyframes`
  0% {
      -webkit-transform: scaleY(1);
      transform: scaleY(1);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
  }
  100% {
      -webkit-transform: scaleY(0);
      transform: scaleY(0);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
    }
 `;

export const entrada = keyframes`
   0% {
    -webkit-transform: translateX(-50px);
            transform: translateX(-50px);
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
 `;

export const salida = keyframes`
0% {
 -webkit-transform: translateX(0px);
         transform: translateX(0px);
}
100% {
 -webkit-transform: translateX(-100px);
         transform: translateX(-100px);
}
`;

export const slideLeftReturn = keyframes`
  0% {
    transform-origin: 0 0;
    transform: translateX(-100%);
  }
  100% {
    transform-origin: 0 0;
    transform: translateX(0%);
  }
`;

export const slideRightReturn = keyframes`
  0% {
    transform-origin: 0 0;
    transform: translateX(100%);
  }
  100% {
    transform-origin: 0 0;
    transform: translateX(0%);
    }
`;

export const heartbeat = keyframes`
 0%,
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    -webkit-transform: translateX(-3px);
            transform: translateX(-3px);
  }
  20%,
  40%,
  60% {
    -webkit-transform: translateX(3px);
            transform: translateX(3px);
  }
  80% {
    -webkit-transform: translateX(5px);
            transform: translateX(5px);
  }
  90% {
    -webkit-transform: translateX(-8px);
            transform: translateX(-8px);
  }
`;

export const aniHerramientas = keyframes`
0% {
    opacity: 0;
    -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
  }
  100% {
    opacity: 1;
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
  }
`;

export const entradaLetras = keyframes`
0% {
    -webkit-transform: translateY(-20px);
            transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
`;

export const rotate = keyframes`
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
`;

export const izquierda = keyframes`
  0% {
    width: 2%;
  }
  100% {
    width: 100%;
  }
  `;

export const derecha = keyframes`
  0% {
    width: 14.37em;
  }
  100% {
    width: 50px
  }
`;

export const traerDelFondo = keyframes`
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
`;

export const entradaFiltro = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;

export const salidaFiltro = keyframes`
from {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
  }
`;

export const SlideCenter = keyframes`
  0% {
    -webkit-transform: scaleY(0.4);
            transform: scaleY(0.4);
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
  }
`;

export const Colores = keyframes`
  0% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  25%{
    right:3%;
    top:-20%;
    transform: rotate(25deg);
    width: 10%;
  }
  50%{
    transform: rotate(0deg);
    right:-3%;
    top:-20%;
    width: 20%;
    height: 11px;
  }
  75%{
    transform: rotate(0deg);
    right:-3%;
    top:-18%;
    width: 100%;
    height: 11px;
  }
  100% {
    right:0px;
    transform: rotate(0deg);
    top:0%;
    width: 100%;
    height: 20%;
    border-radius: var(--radius-1); 
  }
  `;

export const shaking = keyframes`
 0%,
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
  }
  10% {
    -webkit-transform: rotate(8deg);
            transform: rotate(8deg);
  }
  20%,
  40%,
  60% {
    -webkit-transform: rotate(-10deg);
            transform: rotate(-10deg);
  }
  30%,
  50%,
  70% {
    -webkit-transform: rotate(10deg);
            transform: rotate(10deg);
  }
  80% {
    -webkit-transform: rotate(-8deg);
            transform: rotate(-8deg);
  }
  90% {
    -webkit-transform: rotate(8deg);
            transform: rotate(8deg);
  }
`;

export const rotation = keyframes`
 from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const paint = keyframes`
  0% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-2px);
    transform: translateY(-2px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
`;

export const izquierdaOpciones = keyframes`
  0% {
    -webkit-transform: translateX(85%);
    transform: translateX(85%);
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    -webkit-transform: translateX(-150%);
    transform: translateX(-150%);
    opacity: 1;
  }
`;

export const derechaOpciones = keyframes`
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  70% {
    opacity: 0.7;
  }
  100% {
    -webkit-transform: translateX(clamp(230px, 13vmax, 15vmax));
    transform: translateX(clamp(230px, 13vmax, 15vmax));
    opacity: 1;
  }
`;

export const modales = keyframes`
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

export const despHaciaAbajo = keyframes`
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }
`;

export const Latido = keyframes`
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.1);
            transform: scale(1.1);
            fill: var(--brand-primary);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
`;

export const Rebote = keyframes`
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
            transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
`;

export const AniCalendario = keyframes`
  0% {
    -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
            transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
`;

export const AniTituloModulos = keyframes`
  0% {
    letter-spacing: -0.5em;
    -webkit-transform: translateZ(-700px);
            transform: translateZ(-700px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
`;

export const LatidoRouter = keyframes`
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.1);
            transform: scale(1.1);
            background-color: var(--brand-primary);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
`;
