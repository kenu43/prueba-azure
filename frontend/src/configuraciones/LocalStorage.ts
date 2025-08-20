import { localStateBrowserVars } from './types/ConfigTypes';

const appLocalVars: localStateBrowserVars = {
  year: new Date().getFullYear().toString(),
  configuracionesTabla: '{}',
  configuraciones: '{}',
  profile: '{}',
};

const appSessionVars: localStateBrowserVars = {
  permisos: '',
};

export const establecerVariables = (): void => {
  const faltantesLocal = Object.keys(appLocalVars).filter(
    (local) => !localStorage[local]
  );

  const faltantesSession = Object.keys(appSessionVars).filter(
    (session) => !sessionStorage[session]
  );

  if (faltantesLocal.length !== 0) {
    faltantesLocal.map((localVal) =>
      localStorage.setItem(localVal, appLocalVars[localVal])
    );
  }

  if (faltantesSession.length !== 0) {
    faltantesSession.map((sessionVal) =>
      sessionStorage.setItem(sessionVal, appSessionVars[sessionVal])
    );
  }
};
