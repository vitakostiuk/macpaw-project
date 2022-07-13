import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation';
import { ReactComponent as LogoIcon } from 'images/logo.svg';
import s from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={s.Wrapper}>
      <header className={s.Sidebar}>
        <NavLink to="/">
          <LogoIcon width="106" height="24" />
        </NavLink>
        <h1 className={s.Title}>Hi intern!</h1>
        <p className={s.SubTitle}>Welcome to MI 2022 Front-end test</p>
        <Navigation />
      </header>
    </div>
  );
};

export default Sidebar;
