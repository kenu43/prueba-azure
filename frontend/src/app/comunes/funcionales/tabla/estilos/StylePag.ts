import styled from 'styled-components';

export const PagContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: var(--space-fluid-2);
  background-color: var(--surface-third);
  border-radius: var(--radius-2);
`;

export const PagContent = styled.p`
  font-size: var(--messages);
  color: var(--color-primary-text);
  user-select: none;
`;

export const ControlPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--surface-first);
  border-radius: var(--radius-round);
  padding: var(--space-fluid-2);
`;

export const NumPage = styled.input`
  outline: none;
  border: none;
  border-radius: var(--radius-round);
  padding: var(--space-fluid-2);
  color: var(--color-primary-text);
  font-size: var(--messages);
  background-color: var(--surface-second);
  text-align: center;
  margin-right: 0.5em;

  -moz-appearance: textfield;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    opacity: 0;
  }
`;
