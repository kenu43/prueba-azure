import { keyframes } from 'styled-components';

export const BackgroudColor = keyframes`
    0% {
        background-position: 0%;
    }
    100% {
        background-position: 300%;
    }
`;

export const BtnAIconAnimation = keyframes`
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
