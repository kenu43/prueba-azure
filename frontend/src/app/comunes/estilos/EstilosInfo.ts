import styled from 'styled-components';

import { FadeIn } from './Animaciones';

export const ErrorContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: var(--space-fluid-1);
  background-color: var(--surface-first);
  animation: ${FadeIn} 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

export const ErrorDesContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 100%;
`;

export const ErrorTitle = styled.h1`
  font-size: calc(var(--title) * 2);
  font-weight: var(--font-bold);
  font-family: var(--font-family-secondary);
  color: var(--brand-primary);
  text-align: center;
`;

export const ErrorDescription = styled.p`
  font-size: calc(var(--subtitle) * 1.2);
  font-weight: var(--font-normal);
  color: var(--color-primary-text);
  text-align: center;
`;

export const ErrorCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--space-fluid-3);
  border-radius: var(--radius-3);
  background-color: var(--brand-7);
  box-shadow: var(--shadow-2);
`;

export const ErrorMessage = styled.p`
  font-size: var(--subtitle);
  font-weight: var(--font-normal);
  text-align: center;
`;

export const Hour = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--subtitle);
  color: var(--brand-primary);
  width: fit-content;
`;

export const ErrorButton = styled.button`
  border-radius: var(--radius-2);
  padding: var(--space-fluid-2);
  font-size: var(--label);
  background: var(--brand-primary);
  color: var(--color-white);
  border: none;
  width: fit-content;

  :active {
    transform: scale(0.95);
  }
`;

export const SupportButton = styled.button`
  border-radius: var(--radius-2);
  padding: var(--space-fluid-2);
  font-size: var(--label);
  background: var(--brand-secondary);
  color: var(--color-white);
  border: none;
  width: fit-content;

  :active {
    transform: scale(0.95);
  }
`;
