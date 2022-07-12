import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../../common/Button';
import s from './NavItem.module.css';

const NavItem = ({ name, image, backgroundColor, path }) => {
  return (
    <li className={s.ItemWrapper}>
      <div
        className={s.ImgWrapper}
        style={{ backgroundColor: backgroundColor }}
      >
        <img src={image} alt="navImg"></img>
      </div>
      <Button>
        <NavLink
          to={path}
          // className={s.BtnText}
          // activeClassName={s.BtnTextActive}
          className={({ isActive }) => (isActive ? s.BtnTextActive : s.BtnText)}
        >
          {name}
        </NavLink>
      </Button>
    </li>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavItem;
