import { ModalFilterProps } from './types/FiltrosTypes';
import GeneralFiltro from './secciones/GeneralFiltro';
import FiltrosProvider from './contextos/CtxFiltro';

const ModalFiltro = (props: ModalFilterProps) => (
	<FiltrosProvider>
		<GeneralFiltro {...props} />
	</FiltrosProvider>
);
export default ModalFiltro;
