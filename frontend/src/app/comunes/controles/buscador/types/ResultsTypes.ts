export type DataProps = {
  objectID: string;
  cedula: string;
  documento?: string;
  nombre: string;
  genero: string;
  fechaNacimiento: string;
  historiaOcupacional: {
    fechaIngresoCargo: string;
    cargo: string;
    area: string;
    horarioLaboral: string;
    rotacionesLaborales: string;
    tipoCargo: string;
  };
};

export type ResultProps = {
  data: DataProps[];
  searchWord: string;
  loading: boolean;
  callback: (data: DataProps) => void;
};
