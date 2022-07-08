import PropTypes from 'prop-types';

const NavItem = ({ name, image }) => {
  return (
    <div className="navWrapper">
      <div className="imgWrapper">
        <img src={image} alt="navImg"></img>
      </div>
      <a href="/">{name}</a>
    </div>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default NavItem;
