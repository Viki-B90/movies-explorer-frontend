import { Link } from 'react-router-dom';
import './MainHeader.css';

function MainHeader() {
  return (
    <nav className="header__button">
      <Link to="/signup"><button className="header__button_signup">Регистрация</button></Link>
      <Link to="/signin"><button className="header__button_signin">Войти</button></Link>
    </nav>
  );
}

export default MainHeader;
