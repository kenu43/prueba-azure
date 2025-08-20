import { useContext } from 'react';
import { IconoBoton, TooltipBotonLabel, ViewBox } from '../constantes/Constantes';
import { CtxFiltros } from '../contextos/CtxFiltro';
import { BotonFiltro, ContenedorBotones, FiltroSVG, TooltipBoton } from '../estilos/EstilosFiltro';
import { FuncionesBotones, ModalButtonsFilterProps } from '../types/FiltrosTypes';

const Botones = ({ functions }: ModalButtonsFilterProps) => {
	const [{ pagina, nPages, pageFecha }, dispatch] = useContext(CtxFiltros);

	const funciones: FuncionesBotones = {
		...functions,
		dates: () => dispatch({ type: 'GENERALES', name: 'pagina', payload: pageFecha }),
		next: () => dispatch({ type: 'GENERALES', name: 'pagina', payload: pagina + 1 }),
		before: () => dispatch({ type: 'GENERALES', name: 'pagina', payload: pagina - 1 }),
	};

	return (
		<ContenedorBotones>
			{Object.keys(IconoBoton).map((item) => {
				const func = item as keyof FuncionesBotones;
				const icono = IconoBoton[func];
				const viewBox = ViewBox[func];
				const tooltipo = TooltipBotonLabel[func];
				if (func === 'next' && pagina + 1 === nPages) return null;
				if (func === 'before' && pagina === 0) return null;
				if (func === 'dates' && !pageFecha) return null;
				return (
					<BotonFiltro key={func} func={func} onClick={() => funciones[func]()}>
						<TooltipBoton>{tooltipo}</TooltipBoton>
						<FiltroSVG stroke={'var(--color-primary-text)'} fill={'var(--color-primary-text)'} viewBox={viewBox}>
							{icono}
						</FiltroSVG>
					</BotonFiltro>
				);
			})}
		</ContenedorBotones>
	);
};

export default Botones;
