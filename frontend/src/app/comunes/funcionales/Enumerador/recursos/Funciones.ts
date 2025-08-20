import enumerador from './Enumerador.json';

export const descomponerNumero = (number: number): string => {
	let outputEumn = '';
	let rest = number;
	const c = Math.trunc(number / 100);
	rest = rest % 100;
	const d = Math.trunc(rest / 10);
	const u = rest % 10;

	const listaAux: {
		[key: string]: string;
	} = { ...enumerador };

	if (c) outputEumn += `${listaAux[`${c * 100}`]}${rest ? 'o ' : ''}`;
	if (d) outputEumn += `${listaAux[`${d * 10}`]}${u ? 'o ' : ''}`;
	if (u) outputEumn += listaAux[`${u}`];

	return outputEumn;
};
