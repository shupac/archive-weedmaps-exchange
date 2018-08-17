import React from 'react';
import { shallow } from 'enzyme';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  Bell,
  Brands,
  Chart,
  Dashboard,
  Flag,
  Help,
  KeyLock,
  Listings,
  Mail,
  Menu,
  Papers,
  Region,
  Settings,
  Spinner,
  Tag,
  Toolbox,
  WmLogoMini,
  Wm404,
  Plus,
} from './';

describe('Icons', () => {
  it('ArrowDown', () => {
    const tree = shallow(<ArrowDown />);
    expect(tree.exists()).toEqual(true);
  });

  it('ArrowLeft', () => {
    const tree = shallow(<ArrowLeft />);
    expect(tree.exists()).toEqual(true);
  });

  it('ArrowUp', () => {
    const tree = shallow(<ArrowUp />);
    expect(tree.exists()).toEqual(true);
  });

  it('ArrowRight', () => {
    const tree = shallow(<ArrowRight />);
    expect(tree.exists()).toEqual(true);
  });

  it('Bell', () => {
    const tree = shallow(<Bell />);
    expect(tree.exists()).toEqual(true);
  });

  it('Brands', () => {
    const tree = shallow(<Brands />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Chart', () => {
    const tree = shallow(<Chart />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Dashboard', () => {
    const tree = shallow(<Dashboard />);
    expect(tree.exists()).toEqual(true);
  });

  it('Flag', () => {
    const tree = shallow(<Flag />);
    expect(tree.exists()).toEqual(true);
  });

  it('Help', () => {
    const tree = shallow(<Help />);
    expect(tree.exists()).toEqual(true);
  });

  it('KeyLock', () => {
    const tree = shallow(<KeyLock />);
    expect(tree.exists()).toEqual(true);
  });

  it('Listings', () => {
    const tree = shallow(<Listings />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Mail', () => {
    const tree = shallow(<Mail />);
    expect(tree.exists()).toEqual(true);
  });

  it('Menu', () => {
    const tree = shallow(<Menu />);
    expect(tree.exists()).toEqual(true);
  });

  it('Papers', () => {
    const tree = shallow(<Papers />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Region', () => {
    const tree = shallow(<Region />);
    expect(tree.exists()).toEqual(true);
  });

  it('Settings', () => {
    const tree = shallow(<Settings />);
    expect(tree.exists()).toEqual(true);
  });

  it('Tag', () => {
    const tree = shallow(<Tag />);
    expect(tree.exists()).toEqual(true);
  });

  it('Toolbox', () => {
    const tree = shallow(<Toolbox />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Spinner', () => {
    const tree = shallow(<Spinner />);
    expect(tree.exists()).toEqual(true);
  });

  it('WmLogoMini', () => {
    const tree = shallow(<WmLogoMini />);
    expect(tree.exists()).toEqual(true);
  });

  it('Wm404', () => {
    const tree = shallow(<Wm404 />);
    expect(tree.exists()).toEqual(true);
  });

  it('Plus', () => {
    const tree = shallow(<Plus />);
    expect(tree.exists()).toEqual(true);
  });
});
