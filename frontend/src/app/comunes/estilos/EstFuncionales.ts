import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CargandoAnimation, FadeIn, Rotate } from './Animaciones';

export const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0.8em;
  border-radius: var(--radius-1);
  box-shadow: var(--shadow-6);
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  background-color: var(--background-modals);
  width: 100vw;
  height: 100vh;
  z-index: var(--layer-2);
  transition: background-color 1s var(--ease-5);
`;

export const AnimationContainer = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: clamp(200px, 36vmax, 350px);
  background-color: var(--base);
  -webkit-box-reflect: below 0 linear-gradient(transparent, transparent, #0005);
`;

export const Loader = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  animation: ${Rotate} 2s linear infinite;
  background-color: transparent;

  :nth-child(1)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to top, transparent, var(--brand-1) 80%);
    background-size: 100px 180px;
    background-repeat: no-repeat;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
  }

  :nth-child(2)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to top, transparent, var(--brand-1) 80%);
    background-size: 100px 180px;
    background-repeat: no-repeat;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
  }

  :nth-child(2) {
    animation-delay: -1s;
    filter: hue-rotate(90deg);
  }

  :nth-child(4) {
    animation-delay: -1s;
    filter: hue-rotate(90deg);
  }

  i {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background-color: var(--brand-1);
    border-radius: 50%;
    z-index: 2;
    box-shadow: 0 0 10px var(--brand-1), 0 0 20px var(--brand-secondary-1),
      0 0 30px var(--brand-1), 0 0 40px var(--brand-1), 0 0 50px var(--brand-1),
      0 0 60px var(--brand-1), 0 0 70px var(--brand-1), 0 0 80px var(--brand-1),
      0 0 90px var(--brand-1), 0 0 100px var(--brand-1);
  }

  span {
    position: absolute;
    inset: 20px;
    background-color: var(--surface-first);
    border-radius: 50%;
    z-index: 2;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  animation: ${FadeIn} 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

export const TituloAnimaciones = styled.h3`
  font-size: calc(var(--titulo) * 1.3);
  font-family: var(--font-family-secondary);
  margin: 0.5em;
  color: var(--color-secondary-text);
  max-width: 50vmax;
  text-align: center;
`;

export const Vinculos = styled(Link)`
  background-color: var(--brand-secondary);
  border-radius: var(--radius-6);
  padding: 0.5em 1em;
  color: var(--color-white);
  text-decoration: none;
`;

export const ContainerAnimacion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 2em;
  animation: ${CargandoAnimation} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const BotonSlack = styled.a`
  border: none;
  cursor: pointer;
  border-radius: var(--radius-6);
  text-align: center;
  font-family: var(--font-family-primary);
  font-weight: bold;
  letter-spacing: 0.8px;
  font-size: var(--subtitle);
  text-decoration: none;
  padding: 0.5em 1em;
  background-color: #611f69;
  box-shadow: var(--shadows);
  color: var(--color-white);
`;

export const BotonBarraSuperior = styled.a`
  border: none;
  cursor: pointer;
  border-radius: var(--radius-6);
  text-align: center;
  font-family: var(--font-family-primary), sans-serif;
  font-size: var(--subtitulo);
  font-weight: bold;
  text-decoration: none;
  padding: 0.5em 1em;
  background-color: var(--brand-primary);
  box-shadow: var(--shadows-1);
  color: var(--color-white);
`;
