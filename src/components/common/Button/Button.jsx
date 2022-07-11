import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ children }) => {
  return (
    <button type="button" className={s.Btn}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
