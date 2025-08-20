import { IfProps } from '../types/FuncionalesTypes';

const Condicional = ({ children, condicion }: IfProps) => {
	if (!condicion) return null;

	return <>{children}</>;
};

export default Condicional;
