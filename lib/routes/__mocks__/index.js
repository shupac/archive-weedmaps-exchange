const Routes = {
  match: jest.fn(),
  findByName: jest.fn(),
  Link: props => (
    <a {...props} href="">
      link
    </a>
  ),
  Router: {
    pushRoute: jest.fn(),
  },
};

module.exports = Routes;
