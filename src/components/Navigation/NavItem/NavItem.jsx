import PropTypes from 'prop-types';
import Button from '../../common/Button';
import s from './NavItem.module.css';

const NavItem = ({ name, image, backgroundColor }) => {
  return (
    <li className={s.ItemWrapper}>
      <div
        className={s.ImgWrapper}
        style={{ backgroundColor: backgroundColor }}
      >
        <img src={image} alt="navImg"></img>
      </div>
      <Button>
        <a href="/" className={s.BtnText}>
          {name}
        </a>
      </Button>
    </li>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default NavItem;
