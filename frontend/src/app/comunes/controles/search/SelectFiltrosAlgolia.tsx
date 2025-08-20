import { useEffect, useState } from 'react';

import { type SelectFiltroProps } from './types/SearchTypes';
import { iconografia } from './recursos/Iconografia';

import { Acciones, Contenedor, Input, Opcion, Opciones, SVG } from './estilos/EstilosSelectFiltros';
import { ContFlex } from './estilos/EstBuscAlgolia';

const SelectAlgoliaFiltros = ({
	valor,
	opciones = [],
	obligatorio,
	bloqueado,
	onChange,
	evento,
	alto,
	mostrarLista,
	style,
	valorActual,
}: SelectFiltroProps) => {
	const [listado, setListado] = useState<Pick<SelectFiltroProps, 'opciones' | 'valor'>>({
		opciones: opciones ?? [],
		valor,
	});

	const [mostrar, setMostrar] = useState<boolean>(mostrarLista ?? false);
	const [inputMostrar, setInput] = useState<string>(valorActual);

	useEffect(() => {
		setListado({ ...listado, valor, opciones });
		setInput('');
	}, [valor, mostrarLista, opciones, valorActual]);

	const opcionSeleccionada = (opcion: number) => {
		if (!evento) return;
		evento({
			palabraClave: listado.opciones[opcion].cedulaNit,
			data: listado.opciones[opcion],
		});

		setListado({
			...listado,
			valor: listado.opciones[opcion].cedulaNit,
		});
		setInput(listado.opciones[opcion].cedulaNit);
		setMostrar(false);
	};

	const limpiar = () => {
		if (!evento) return;
		if (!bloqueado) {
			evento({ palabraClave: '', data: {} });
			setInput('');
			setListado({
				opciones: opciones.slice(0, 24),
				valor: '',
			});
		}
		setMostrar(false);
	};

	return (
		<Contenedor obligatorio={obligatorio ?? false} bloqueado={bloqueado ?? false} style={style}>
			<ContFlex style={{ justifyContent: 'space-between', alignItems: 'center' }}>
				<SVG
					onClick={limpiar}
					width='18px'
					height='18px'
					fill='var(--brand-primary)'
					style={{ marginRight: '0.3em' }}
					bloqueado={bloqueado}
				>
					{iconografia[1]}
				</SVG>
				<Input
					bloqueado={bloqueado}
					obligatorio={obligatorio}
					value={valor || inputMostrar}
					placeholder={mostrar ? 'Escriba para filtrar' : 'Clic + para seleccionar'}
					onChange={onChange}
					onClick={() => {
						setListado({
							...listado,
							opciones: opciones.slice(0, 24),
						});
						if (listado.opciones.length > 0) setMostrar(true);
					}}
				/>
				<Acciones>
					<SVG
						ver={mostrar}
						onClick={() => {
							if (!bloqueado) {
								setListado({
									...listado,
									opciones: opciones.slice(0, 24),
								});
								if (listado.opciones.length > 0) setMostrar(!mostrar);
							}
						}}
						width='18px'
						height='18px'
					>
						{iconografia[0]}
					</SVG>
				</Acciones>
			</ContFlex>
			{opciones.length > 0 && (
				<Opciones ver={mostrar} style={{ maxHeight: alto || '150px' }}>
					{listado.opciones.map((opcion, x) => {
						const llave = `opcion${x}`;
						return (
							<Opcion key={llave} ver={mostrar} onClick={() => opcionSeleccionada(x)}>
								{`${opcion?.cedulaNit} ${opcion?.nombreContratista}`}
							</Opcion>
						);
					})}
				</Opciones>
			)}
		</Contenedor>
	);
};

export default SelectAlgoliaFiltros;
