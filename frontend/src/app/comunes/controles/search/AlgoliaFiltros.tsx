import { useState } from 'react';
import useAlgolia from 'hooks/Algolia';
import { Avisos, Etiqueta } from 'comunes/estilos/EstComunes';

import { IstateFiltro } from './types/SearchTypes';
import SelectAlgoliaFiltros from './SelectFiltrosAlgolia';
import { algoliaConst } from './constantes/ConstAlgolia';

import { EtiquetaLabel } from './estilos/EstInfoPersonaAlgolia';
import { BotonConsultar, ContBuscadorFiltros, ContFiltroAlgolia } from './estilos/EstBuscAlgolia';

import type { SearchAlgoliaFiltroType } from './types/SearchTypes';

const BuscardorAlgoliaFiltros = ({
	disabled,
	permisos,
	datosConsultados,
	obligatorio,
	valorActual,
}: SearchAlgoliaFiltroType) => {
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
		<ContFiltroAlgolia>
			<ContBuscadorFiltros style={{ gap: '0.5em' }}>
				<EtiquetaLabel style={{ color: 'var(--color-black)' }}>
					Formulario de consulta de contratista BIOD
				</EtiquetaLabel>
				<Etiqueta style={{ textAlign: 'justify', color: 'var(--color-black)' }}>
					{`Para consultar, ingrese el nombre de la empresa, cédula o NIT del contratista y haga clic en el botón "Consultar"`}
				</Etiqueta>

				<SelectAlgoliaFiltros
					valorActual={valorActual}
					bloqueado={permisoAlgolia}
					obligatorio={obligatorio}
					mostrarLista={estados.mostrarLista}
					valor={estados?.palabraClave ?? ''}
					opciones={datosAlgolia ?? []}
					evento={(e) => {
						setEstado({
							...estados,
							datos: [e.data ?? {}],
							palabraClave: e.palabraClave ?? '',
						});
						const eliminar = '_highlightResult';
						const datos = { ...e.data };
						delete datos?.[eliminar];

						datosConsultados(e.data ?? {});
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
				<Avisos>
					Nota: Diligencie el número de NIT con dígito de verificación, sin guiones, puntos ni
					comas.
				</Avisos>
			</ContBuscadorFiltros>

			<ContFiltroAlgolia>
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
			</ContFiltroAlgolia>
		</ContFiltroAlgolia>
	);
};

export default BuscardorAlgoliaFiltros;
