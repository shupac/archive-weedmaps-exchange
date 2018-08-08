import React from 'react';
import PropTypes from 'prop-types';

export const PageContent = ({ className = '', ...props }) => (
  <main role="main" className={`page__content ${className}`} {...props} />
);

PageContent.propTypes = {
  className: PropTypes.string,
};

export default PageContent;
