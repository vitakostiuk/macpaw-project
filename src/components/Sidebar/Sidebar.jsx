import Navigation from '../Navigation';
import { ReactComponent as LogoIcon } from 'images/logo.svg';
import s from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <header className={s.Sidebar}>
      <LogoIcon width="106" height="24" />
      <h1 className={s.Title}>Hi intern!</h1>
      <p className={s.SubTitle}>Welcome to MI 2022 Front-end test</p>
      <Navigation />
    </header>
  );
};

export default Sidebar;
