import PropTypes from 'prop-types';

const Section = ({ children }) => {
  return <section className="section">{children}</section>;
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Section;
