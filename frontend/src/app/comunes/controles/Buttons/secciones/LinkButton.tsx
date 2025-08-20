import { Icon, IStyle, LinkContainer } from '../estilos/Estilos';
import { iconografia } from '../recursos/Iconografia';
import { LinkButtonProps } from '../types/ButtonTypes';

const LinkButton = ({
  id,
  onClick,
  to,
  style,
  name,
  sizeBtn,
  icon,
  state,
  goback,
}: LinkButtonProps) => {
  return (
    <LinkContainer
      to={to}
      id={id}
      style={style}
      size={sizeBtn}
      onClick={onClick}
      state={state}
      goback={goback}
    >
      <IStyle />
      <span>{name}</span>
      <Icon goback={goback}>
        {iconografia[icon!]?.path ?? iconografia.arrow.path}
      </Icon>
    </LinkContainer>
  );
};

export default LinkButton;
