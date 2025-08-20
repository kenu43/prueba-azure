import { Subtitulo } from 'comunes/estilos/EstComunes';
import { descomponerNumero } from '../recursos/Funciones';
import { EnumProps } from '../types/EnumTypes';

const SubtitleEnum = ({ titulo, index, femenino, style }: EnumProps) => {
	if (index >= 200) {
		return (
			<Subtitulo style={style}>
				{titulo} {index}
			</Subtitulo>
		);
	}
	let enumrador = descomponerNumero(index);
	if (![1, 3].includes(index)) enumrador += femenino ? 'a' : 'o';

	return <Subtitulo style={style}>{`${enumrador} ${titulo}`}</Subtitulo>;
};

export default SubtitleEnum;
