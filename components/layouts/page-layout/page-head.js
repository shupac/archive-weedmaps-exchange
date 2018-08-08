import PropTypes from 'prop-types';

export const PageHead = ({ children }) => (
  <header role="banner">{children}</header>
);

PageHead.propTypes = {
  children: PropTypes.any,
};

export default PageHead;
