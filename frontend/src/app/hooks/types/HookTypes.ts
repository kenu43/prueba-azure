export type SessionType = {
  [key: string]: string | null;
};

export type ListasType<T> = Record<string, T>;

export type ListadosType = {
  listas: {
    [key: string]: ListasType<Record<string, string>>;
  };
};
