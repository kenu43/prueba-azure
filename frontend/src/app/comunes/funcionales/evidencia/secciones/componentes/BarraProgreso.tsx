import styled from 'styled-components';
import { BarraPropsType, ColorPropType, ContainerBarraPropsType } from '../../types/BarraProgresoType';

const colorProgreso: ColorPropType = (prop) => {
	const color = Number(prop ?? '0');

	if (color >= 0 && color < 60) return 'var(--color-add-1)';
	if (color >= 60 && color < 85) return 'var(--color-add-3)';
	if (color >= 85 && color <= 100) return 'var(--color-add-2)';
	return 'var(--color-primary-text)';
};

const Container = styled.div<ContainerBarraPropsType>`
	display: grid;
	grid-template-columns: 90% 5%;
	justify-content: space-between;
	align-items: center;
	width: ${({ width }) => width || '100%'};
	padding: 0.5rem;

	progress[value] {
		width: 100%;

		::-webkit-progress-bar {
			height: 10px;
			border-radius: var(--radius-2);
			background-color: var(--color-gray);
		}
		::-webkit-progress-value {
			height: 10px;
			border-radius: var(--radius-2);
			background-color: var(--color-add-11);
		}
	}
`;

const Value = styled.span<ContainerBarraPropsType>`
	color: ${({ color }) => colorProgreso(color)};
	font-size: var(--etiqueta);
`;

const BarraProgreso = ({ value, max = 100, width, style }: BarraPropsType) => {
	const porcentaje = (value / max) * 100;
	return (
		<Container style={style} width={width}>
			<progress value={value} max={max} />
			<Value color={porcentaje.toFixed(1)}>{value ? porcentaje.toFixed(1) : '0'}%</Value>
		</Container>
	);
};

export default BarraProgreso;
