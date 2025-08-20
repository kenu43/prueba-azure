export type DataProps = {
  objectID: string;
  cedula: string;
  documento?: string;
  sap?: string;
  nombre: string;
  genero: string;
  fechaNacimiento: string;
  telefono?: string;
  historiaOcupacional: {
    gerencia: string;
    fechaIngresoCargo: string;
    cargo: string;
    area: string;
    region?: string;
    horarioLaboral: string;
    rotacionesLaborales: string;
    tipoCargo: string;
    correo?: string;
    nombreJefe?: string;
  };
};

export type ResultProps = {
  data: DataProps[];
  searchWord: string;
  loading: boolean;
  callback: (data: DataProps) => void;
};
