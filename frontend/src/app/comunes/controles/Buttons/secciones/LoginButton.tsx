import Points from 'comunes/informativos/svg/Points';
import { ButtonLoading, ButtonStyle, Icon } from '../estilos/Estilos';
import { iconografia } from '../recursos/Iconografia';

import { LoginButtonProps } from '../types/ButtonTypes';

const LoginButton = ({ icon, type, onClick, style, name, sizeBtn, typeBtn, loading, id }: LoginButtonProps) => {
	if (loading)
		return (
			<ButtonLoading size={sizeBtn} typeBtn={typeBtn}>
				<Points />
			</ButtonLoading>
		);

	return (
		<ButtonStyle id={id} type={type} style={style} size={sizeBtn} typeBtn={typeBtn} onClick={onClick}>
			<Icon>
				{iconografia[icon]?.path ?? (
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
					/>
				)}
			</Icon>
			{name}
		</ButtonStyle>
	);
};

export default LoginButton;
