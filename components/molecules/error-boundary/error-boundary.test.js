/* eslint-disable import/first,react/no-multi-comp,no-unused-vars,no-undef,react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import ErrorBoundary from './index';

class BrokenComponent extends React.Component {
  render() {
    return <p>{Go.boom_it}</p>;
  }
}

class GoodComponent extends React.Component {
  render() {
    return <p>Ka-boom-it</p>;
  }
}

class CustomErrorComponent extends React.Component {
  render() {
    return (
      <p>
        <span>{this.props.message}</span>
      </p>
    );
  }
}

class ExampleUsageCustomError extends React.Component {
  onCustomError = (error, info) => {
    if (!this.props.fallback) {
      return <CustomErrorComponent message={error.message} info={info} />;
    }

    return null;
  };

  render() {
    return (
      <ErrorBoundary customError={this.onCustomError}>
        <BrokenComponent />
      </ErrorBoundary>
    );
  }
}

const EXAMPLE_ERROR_MESSAGE = 'This is a customized error message!';

class ExampleUsageErrorMessage extends React.Component {
  onCustomErrorMessage = (error, info) => {
    if (!this.props.fallback) {
      return EXAMPLE_ERROR_MESSAGE;
    }

    return null;
  };

  render() {
    return (
      <ErrorBoundary customErrorMessage={this.onCustomErrorMessage}>
        <BrokenComponent />
      </ErrorBoundary>
    );
  }
}

class CustomComponentAndCustomErrorMessageAreMutallyExclusive extends React.Component {
  onCustomErrorMessage = (error, info) => EXAMPLE_ERROR_MESSAGE;

  onCustomError = (error, info) => {
    if (!this.props.fallback) {
      return <CustomErrorComponent message={error.message} />;
    }

    return null;
  };

  render() {
    return (
      <ErrorBoundary
        customError={this.onCustomError}
        customErrorMessage={this.onCustomErrorMessage}
      >
        <BrokenComponent />
      </ErrorBoundary>
    );
  }
}

describe('ErrorBoundary', () => {
  it('will render the error boundary', () => {
    const component = mount(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );
    expect(component.find(ErrorBoundary).length).toBe(1);
    expect(component.find(BrokenComponent).length).toBe(0);
  });

  it('will render not render the error boundary when there are no errors', () => {
    const component = mount(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>,
    );
    expect(component.find(ErrorBoundary).length).toBe(1);
    expect(component.find(GoodComponent).length).toBe(1);
    expect(component.text()).not.toMatch('Error!');
  });

  describe('customError', () => {
    it('will render the error boundary with a custom error component', () => {
      const component = mount(<ExampleUsageCustomError />);
      expect(component.find(ErrorBoundary).length).toBe(1);
      expect(component.find(CustomErrorComponent).length).toBe(1);
      expect(component.find(BrokenComponent).length).toBe(0);
    });

    it('will fall through to the default error component, if .customError returns null', () => {
      const component = mount(<ExampleUsageCustomError fallback />);
      expect(component.find(ErrorBoundary).length).toBe(1);
      expect(component.find(CustomErrorComponent).length).toBe(0);
      expect(component.find(BrokenComponent).length).toBe(0);
    });

    it('will take precedence if .customErrorMessage is also set', () => {
      const component = mount(
        <CustomComponentAndCustomErrorMessageAreMutallyExclusive />,
      );
      expect(component.find(ErrorBoundary).length).toBe(1);
      expect(component.find(BrokenComponent).length).toBe(0);
      expect(component.find(CustomErrorComponent).length).toBe(1);
      expect(component.text()).not.toMatch(EXAMPLE_ERROR_MESSAGE);
    });
  });

  describe('customErrorMessage', () => {
    it('will render the error boundary with a custom error message', () => {
      const component = mount(<ExampleUsageErrorMessage />);
      expect(component.find(ErrorBoundary).length).toBe(1);
      expect(component.find(BrokenComponent).length).toBe(0);
      expect(component.text()).toMatch('Error!');
      expect(component.text()).toMatch(EXAMPLE_ERROR_MESSAGE);
    });

    it('will take render if .customError is set but returns null', () => {
      const component = mount(
        <CustomComponentAndCustomErrorMessageAreMutallyExclusive fallback />,
      );
      expect(component.find(ErrorBoundary).length).toBe(1);
      expect(component.find(BrokenComponent).length).toBe(0);
      expect(component.find(CustomErrorComponent).length).toBe(0);
      expect(component.text()).toMatch(EXAMPLE_ERROR_MESSAGE);
    });

    it('will fall through to the default error message, if .customErrorMessage returns null', () => {
      const component = mount(<ExampleUsageErrorMessage fallback />);
      expect(component.find(ErrorBoundary).length).toBe(1);
      expect(component.find(BrokenComponent).length).toBe(0);
      expect(component.text()).toMatch('Error!');
      expect(component.text()).not.toMatch(EXAMPLE_ERROR_MESSAGE);
    });
  });
});
