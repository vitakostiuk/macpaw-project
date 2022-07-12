import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick, children }) => {
  return (
    <button type="button" className={s.Btn} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => null,
  children: null,
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
