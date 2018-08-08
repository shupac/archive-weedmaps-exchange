import { PureComponent } from 'react';

/**
 * A HOC for creating Pure functional components using React PureComponents
 * Note, PureComponent doesn't do a deep comparision on props. If a deep comparision
 * is needed, then the component should implement shouldComponentUpdate itself
 * @param fncComponent
 * @returns {Pure}
 */
export default fncComponent => {
  class Pure extends PureComponent {
    render() {
      return fncComponent(this.props);
    }
  }
  const displayName =
    fncComponent.displayName || fncComponent.name || 'Component';
  Pure.displayName = `Pure(${displayName})`;
  Pure.ComposedComponent = fncComponent;
  return Pure;
};
