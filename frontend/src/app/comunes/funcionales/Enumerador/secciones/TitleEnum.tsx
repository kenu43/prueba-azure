import { Titulo } from 'comunes/estilos/EstComunes';
import { descomponerNumero } from '../recursos/Funciones';
import { EnumProps } from '../types/EnumTypes';

const TitleEnum = ({ titulo, index, femenino, style }: EnumProps) => {
	if (index >= 200) {
		return (
			<Titulo style={style}>
				{titulo} {index}
			</Titulo>
		);
	}
	let enumrador = descomponerNumero(index);
	if (![1, 3].includes(index)) enumrador += femenino ? 'a' : 'o';

	return <Titulo style={style}>{`${enumrador} ${titulo}`}</Titulo>;
};

export default TitleEnum;
