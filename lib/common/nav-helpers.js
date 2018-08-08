export const NavLinkFence = ({ children, currentRoute }) => {
  if (currentRoute !== '/taxes') {
    return children;
  }
  return null;
};

export const TaxLinkFence = ({ children, currentRoute }) => {
  if (currentRoute === '/taxes') {
    return children;
  }
  return null;
};
