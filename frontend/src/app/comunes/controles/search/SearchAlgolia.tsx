import { memo, useState } from 'react';
import useAlgolia from 'hooks/Algolia';
import { Avisos, Parrafo } from 'comunes/estilos/EstComunes';

import { IstateFiltro, SearchAlgoliaType } from './types/SearchTypes';
import SelectAlgoliaFiltros from './SelectFiltrosAlgolia';
import { algoliaConst } from './constantes/ConstAlgolia';

import {
	BotonConsultar,
	ContenedorAlgolia,
	ContenedorSearch,
	EtiquetaAlgolia,
} from './estilos/EstBuscAlgolia';

const SearchAlgolia = ({
	disabled,
	permisos,
	obligatorio,
	style,
	valorActual,
	datosConsultados,
}: SearchAlgoliaType) => {
	const [estados, setEstado] = useState<IstateFiltro>({
		mostrarLista: false,
		palabraClave: '',
		datos: [],
	});

	const { datos: datosAlgolia, consulta } = useAlgolia({
		indexName: algoliaConst.contratista,
	});
	const permisoAlgolia = disabled || !permisos?.includes('crear');

	return (
		<ContenedorSearch style={style}>
			<EtiquetaAlgolia style={{ color: 'var(--color-primary-text)' }}>
				Consultar por nombre de la empresa, cédula o NIT del contratista
			</EtiquetaAlgolia>
			<Parrafo style={{ textAlign: 'justify', color: 'var(--color-primary-text)' }}>
				{`Para consultar, ingrese el nombre de la empresa, cédula o NIT del contratista y haga clic en el botón "Consultar"`}
			</Parrafo>
			<Avisos style={{ padding: '1em 0em', color: 'var(--color-primary-text)' }}>
				Nota: Diligencie el número de NIT con dígito de verificación, sin guiones, puntos ni comas.
			</Avisos>
			<ContenedorAlgolia>
				<SelectAlgoliaFiltros
					style={{ flex: '2' }}
					bloqueado={permisoAlgolia}
					obligatorio={obligatorio}
					mostrarLista={estados.mostrarLista}
					valor={estados?.palabraClave ?? ''}
					valorActual={valorActual}
					opciones={datosAlgolia ?? []}
					evento={(e) => {
						setEstado({
							...estados,
							datos: [e.data ?? {}],
							palabraClave: e.palabraClave ?? '',
						});
						const eliminar = '_highlightResult';
						const datos = e.data;
						delete datos?.[eliminar];

						datosConsultados(e.data ?? '');
					}}
					onChange={(e) => {
						setEstado({
							...estados,
							palabraClave: e.target.value ?? '',
						});
						if (e.target.value === '') {
							setEstado({
								...estados,
								datos: [],
							});
						}
					}}
				/>

				<BotonConsultar
					disabled={permisoAlgolia}
					onClick={() => {
						consulta(estados?.palabraClave);
						setEstado({
							...estados,
							mostrarLista: true,
						});
					}}
				>
					Consultar
				</BotonConsultar>
			</ContenedorAlgolia>
		</ContenedorSearch>
	);
};
export default memo(SearchAlgolia);
