import React from 'react';

const GlobalStyleContainer = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
    {children}
  </div>
);

export default story => (
  <GlobalStyleContainer>
    {story()}
  </GlobalStyleContainer>
);
