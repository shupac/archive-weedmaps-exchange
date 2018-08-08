/* global jest */
const Link = jest.genMockFromModule('next/link');
Link.mockImplementation(props => <a {...props} />);

module.exports = Link;
