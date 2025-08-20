import EnterpriseLogo from 'assets/logo.webp';

import { Logo, MenuContainer } from '../estilos/EstMenu';

const Menu = () => (
  <MenuContainer>
    <Logo src={EnterpriseLogo} alt='Logo empresa' />
  </MenuContainer>
);

export default Menu;
