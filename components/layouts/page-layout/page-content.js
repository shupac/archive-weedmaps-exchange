import React from 'react';
import PropTypes from 'prop-types';

export const PageContent = ({ className = '', ...props }) => (
  <main
    style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
    role="main"
    className={`page__content ${className}`}
    {...props}
  />
);

PageContent.propTypes = {
  className: PropTypes.string,
};

export default PageContent;
