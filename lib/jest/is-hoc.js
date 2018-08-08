import { mount } from 'enzyme';
import chalk from 'chalk';

// A custom matcher to assert some common properties about our HOCs
// such as displayName format, the structure and whether it renders
// the passed child
export default () => ({
  compare(Component) {
    // test that it is a Function
    if (typeof Component !== 'function') {
      return {
        pass: false,
        message: `Expected Component to be a function:
  ${chalk.green('function')}
Received:
  ${chalk.red(typeof Component)}`,
      };
    }

    const component = () => <div>test</div>;
    const Wrapped = Component(component);

    // test HOC adds ComposedComponent as a static property
    if (Wrapped.ComposedComponent !== component) {
      return {
        pass: false,
        message:
          'Expected wrapped component to equal Wrapped.ComposedComponent. Compared with !==',
      };
    }

    // it will set a displayName
    if (!Component.displayName) {
      return {
        pass: false,
        message: 'Expected HOC Component to set a displayName',
      };
    }

    // the display name will be in the right format
    if (Wrapped.displayName !== `${Component.displayName}(component)`) {
      return {
        pass: false,
        message: `Expected Wrapped Component displayName to be:
  ${chalk.green(`${Component.displayName}(component)`)}
Received:
  ${chalk.red(Wrapped.displayName)}`,
      };
    }

    // it will render the child
    const el = mount(<Wrapped />);
    if (!el.exists()) {
      return {
        pass: false,
        message: `Expected HOC to render:
  ${chalk.green('<div>test</div>')}
Received:
  ${chalk.red(el.html())}`,
      };
    }

    return {
      pass: true,
    };
  },
});
