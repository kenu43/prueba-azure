type PropsLazyComponents = {
  trabajadores: React.LazyExoticComponent<() => React.ReactElement>;
  informes: React.LazyExoticComponent<() => React.ReactElement>;
};

type keyComp = keyof PropsLazyComponents;

declare interface IIconografia {
  [key: string]: {
    path: JSX.Element[];
  };
}

declare interface IIAM {
  version: string;
  acciones: {
    [key: string]: string[];
  };
  modulos: {
    [key: number]: {
      descripcion: string;
      titulo: string;
      url: string;
      subGrupo: string;
      responsable: string;
      imagen: string;
      estaActivo: boolean;
      llaveModulo: keyComp;
    };
  };
}

declare type ListadoType = {
  [key: string]: Record<string, string>;
};
