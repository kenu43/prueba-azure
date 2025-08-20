import { type ContenedorProps } from '../types/SearchTypes';

export const otorgarPermiso = (permiso: string[], tipoPermiso: string) => {
	const resultado = permiso?.find((imp) => imp === tipoPermiso);

	return resultado === undefined;
};
export const tipoCampo = ({ obligatorio, bloqueado }: ContenedorProps): string => {
	if (bloqueado && obligatorio) return 'none';
	if (obligatorio) return '0.031em solid var(--color-add-2)';
	if (bloqueado) return 'none';

	return '1px solid var(--brand-primary)';
};
