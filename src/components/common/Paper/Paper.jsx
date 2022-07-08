import PropTypes from 'prop-types';

const Paper = ({ children }) => {
  return <div>{children}</div>;
};

Paper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Paper;
