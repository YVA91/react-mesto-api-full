import logo from '../images/logo.svg';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import {useState} from 'react';


function Header({ userEmail, onReoveToken}) {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const openInfo = (`header__burger__line ${isOpenInfo ? 'header__burger__line_open-info' : ''}`);
  const menu = (`header__menu ${isOpenInfo ? '' : 'header__menu_inactive'}`);

  function openInfoMenu() {
    if (isOpenInfo) {
    setIsOpenInfo(false)
    }
    else { setIsOpenInfo(true) }
  }

  return (
    <>
    <Route exact path="/">
      <div className={menu}>
        <p className='header__userinfo header__userinfo_menu'>{userEmail}</p>
        <Link to="/sign-in" className="header__nav header__nav_colorexit" onClick={onReoveToken}>
          Выйти
        </Link>
      </div>
    </Route>
      
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__nav">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__nav">
            Войти
          </Link>
        </Route>
    
        <Route exact path="/">
          <div className="header__burger" onClick={openInfoMenu}> 
            {/* несколько span применено для создания анимации превращения бургера в крестик. 
            с применением псевдоэлементов такого не получилось создать*/}
            <span className={openInfo}></span>
            <span className={openInfo}></span>
            <span className={openInfo}></span>
          </div>
          <div className='header__container'>
            <p className='header__userinfo'>{userEmail}</p>
            <Link to="/sign-in" className="header__nav header__nav_colorexit" onClick={onReoveToken}>
              Выйти
            </Link>
          </div>
        </Route>
    </header>
    </>
  );
} 

export default Header;