import { SearchAlgoliaInfoType } from './types/SearchTypes';

import {
  ContInfoPersonas,
  EtiquetaLabel,
  EtiquetaValue,
} from './estilos/EstInfoPersonaAlgolia';

const AgruparInfoAlgolia = ({ label, value, style }: SearchAlgoliaInfoType) => (
  <ContInfoPersonas style={style}>
    <EtiquetaLabel>{label}</EtiquetaLabel>
    <EtiquetaValue>{value}</EtiquetaValue>
  </ContInfoPersonas>
);

export default AgruparInfoAlgolia;
