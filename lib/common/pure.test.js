/* global it, expect, describe */
import React, { PureComponent } from 'react';
import Pure from './pure';

describe('Pure', () => {
  it('is a function', () => {
    expect(Pure).toBeInstanceOf(Function);
  });

  it('will wrap a function in a PureComponent', () => {
    // eslint-disable-next-line react/prop-types
    const functionalComponent = ({ title }) => <div>{title}</div>;
    const MyPureComponent = Pure(functionalComponent);
    const myPureInstance = new MyPureComponent();
    expect(myPureInstance).toBeInstanceOf(PureComponent);
  });

  it('will render the exact content', () => {
    // eslint-disable-next-line react/prop-types
    const functionalComponent = ({ title }) => <div>{title}</div>;
    const MyPureComponent = Pure(functionalComponent);
    const myPureInstance = new MyPureComponent();
    myPureInstance.props = { title: 'test' };
    expect(myPureInstance.render().type).toBe('div');
    expect(myPureInstance.render().props.children).toBe('test');
  });

  it('will setup a displayName', () => {
    // eslint-disable-next-line react/prop-types
    const functionalComponent = ({ title }) => <div>{title}</div>;
    const MyPureComponent = Pure(functionalComponent);
    expect(MyPureComponent.displayName).toBe('Pure(functionalComponent)');
  });

  it('will setup a displayName, and use displayName if specified', () => {
    // eslint-disable-next-line react/prop-types
    const functionalComponent = ({ title }) => <div>{title}</div>;
    functionalComponent.displayName = 'MyDisplayName';
    const MyPureComponent = Pure(functionalComponent);
    expect(MyPureComponent.displayName).toBe('Pure(MyDisplayName)');
  });
});
