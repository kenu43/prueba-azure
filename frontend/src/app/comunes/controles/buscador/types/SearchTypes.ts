type DataProps = {
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

export type SearchProps = {
  algoliaIndex: string;
  title: string;
  returnAlgoliaValue: (data: DataProps) => void;
  closeModal: () => void;
};

export type DataSearchStore = {
  cedulaNit: string;
  id: string;
  nombre?: string;
  objectID: string;
  servicio: string;
  setItem: (itemSelected: DataProps) => void;
};
