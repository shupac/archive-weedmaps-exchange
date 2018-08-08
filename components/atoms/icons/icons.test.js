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
    expect(tree).toMatchSnapshot();
  });

  it('ArrowLeft', () => {
    const tree = shallow(<ArrowLeft />);
    expect(tree).toMatchSnapshot();
  });

  it('ArrowUp', () => {
    const tree = shallow(<ArrowUp />);
    expect(tree).toMatchSnapshot();
  });

  it('ArrowRight', () => {
    const tree = shallow(<ArrowRight />);
    expect(tree).toMatchSnapshot();
  });

  it('Bell', () => {
    const tree = shallow(<Bell />);
    expect(tree).toMatchSnapshot();
  });

  it('Brands', () => {
    const tree = shallow(<Brands />).dive();
    expect(tree).toMatchSnapshot();
  });

  it('Chart', () => {
    const tree = shallow(<Chart />).dive();
    expect(tree).toMatchSnapshot();
  });

  it('Dashboard', () => {
    const tree = shallow(<Dashboard />);
    expect(tree).toMatchSnapshot();
  });

  it('Flag', () => {
    const tree = shallow(<Flag />);
    expect(tree).toMatchSnapshot();
  });

  it('Help', () => {
    const tree = shallow(<Help />);
    expect(tree).toMatchSnapshot();
  });

  it('KeyLock', () => {
    const tree = shallow(<KeyLock />);
    expect(tree).toMatchSnapshot();
  });

  it('Listings', () => {
    const tree = shallow(<Listings />).dive();
    expect(tree).toMatchSnapshot();
  });

  it('Mail', () => {
    const tree = shallow(<Mail />);
    expect(tree).toMatchSnapshot();
  });

  it('Menu', () => {
    const tree = shallow(<Menu />);
    expect(tree).toMatchSnapshot();
  });

  it('Papers', () => {
    const tree = shallow(<Papers />).dive();
    expect(tree).toMatchSnapshot();
  });

  it('Region', () => {
    const tree = shallow(<Region />);
    expect(tree).toMatchSnapshot();
  });

  it('Settings', () => {
    const tree = shallow(<Settings />);
    expect(tree).toMatchSnapshot();
  });

  it('Tag', () => {
    const tree = shallow(<Tag />);
    expect(tree).toMatchSnapshot();
  });

  it('Toolbox', () => {
    const tree = shallow(<Toolbox />).dive();
    expect(tree).toMatchSnapshot();
  });

  it('Spinner', () => {
    const tree = shallow(<Spinner />);
    expect(tree).toMatchSnapshot();
  });

  it('WmLogoMini', () => {
    const tree = shallow(<WmLogoMini />);
    expect(tree).toMatchSnapshot();
  });

  it('Wm404', () => {
    const tree = shallow(<Wm404 />);
    expect(tree).toMatchSnapshot();
  });

  it('Plus', () => {
    const tree = shallow(<Plus />);
    expect(tree).toMatchSnapshot();
  });
});
