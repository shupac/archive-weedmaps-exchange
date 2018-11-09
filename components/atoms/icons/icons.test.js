import React from 'react';
import { shallow } from 'enzyme';
import {
  Arrow,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  Bell,
  Bookmark,
  Camera,
  Cart,
  Caret,
  Check,
  Close,
  Chevron,
  Desktop,
  Error,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid,
  Gear,
  Mobile,
  PaginationArrow,
  PaginationArrowLeft,
  PaginationArrowRight,
  Photo,
  WM,
  WmLogo,
  WmTrashcan,
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
  BigArrow,
  Plus,
  Info,
  IncreaseQuantity,
  DecreaseQuantity,
} from './';

describe('Icons', () => {
  it('Arrow', () => {
    const tree = shallow(<Arrow />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('ArrowDown', () => {
    const tree = shallow(<ArrowDown />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Bookmark', () => {
    const tree = shallow(<Bookmark />);
    expect(tree.exists()).toEqual(true);
  });

  it('Camera', () => {
    const tree = shallow(<Camera />);
    expect(tree.exists()).toEqual(true);
  });

  it('Cart', () => {
    const tree = shallow(<Cart />);
    expect(tree.exists()).toEqual(true);
  });

  it('Caret', () => {
    const tree = shallow(<Caret />);
    expect(tree.exists()).toEqual(true);
  });

  it('Check', () => {
    const tree = shallow(<Check />);
    expect(tree.exists()).toEqual(true);
  });

  it('Close', () => {
    const tree = shallow(<Close />);
    expect(tree.exists()).toEqual(true);
  });

  it('Chevron', () => {
    const tree = shallow(<Chevron />);
    expect(tree.exists()).toEqual(true);
  });

  it('ChevronRight', () => {
    const tree = shallow(<ChevronRight />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('ChevronDown', () => {
    const tree = shallow(<ChevronDown />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('ChevronLeft', () => {
    const tree = shallow(<ChevronLeft />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Desktop', () => {
    const tree = shallow(<Desktop />);
    expect(tree.exists()).toEqual(true);
  });

  it('IncreaseQuantity', () => {
    const tree = shallow(<IncreaseQuantity />);
    expect(tree.exists()).toEqual(true);
  });

  it('DecreaseQuantity', () => {
    const tree = shallow(<DecreaseQuantity />);
    expect(tree.exists()).toEqual(true);
  });

  it('Grid', () => {
    const tree = shallow(<Grid />);
    expect(tree.exists()).toEqual(true);
  });

  it('Error', () => {
    const tree = shallow(<Error />);
    expect(tree.exists()).toEqual(true);
  });

  it('Eye', () => {
    const tree = shallow(<Eye />);
    expect(tree.exists()).toEqual(true);
  });

  it('Gear', () => {
    const tree = shallow(<Gear />);
    expect(tree.exists()).toEqual(true);
  });

  it('Mobile', () => {
    const tree = shallow(<Mobile />);
    expect(tree.exists()).toEqual(true);
  });

  it('PaginationArrow', () => {
    const tree = shallow(<PaginationArrow />);
    expect(tree.exists()).toEqual(true);
    expect(tree.find('path').props().transform).toEqual('rotate(0)');
  });

  it('PaginationArrowRight', () => {
    const tree = shallow(<PaginationArrowRight />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('PaginationArrowLeft', () => {
    const tree = shallow(<PaginationArrowLeft />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Photo', () => {
    const tree = shallow(<Photo />);
    expect(tree.exists()).toEqual(true);
  });

  it('WM', () => {
    const tree = shallow(<WM />);
    expect(tree.exists()).toEqual(true);
  });

  it('WmTrashcan', () => {
    const tree = shallow(<WmTrashcan />);
    expect(tree.exists()).toEqual(true);
  });

  it('WmLogo', () => {
    const tree = shallow(<WmLogo />);
    expect(tree.exists()).toEqual(true);
  });

  it('ArrowLeft', () => {
    const tree = shallow(<ArrowLeft />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('ArrowUp', () => {
    const tree = shallow(<ArrowUp />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('ArrowRight', () => {
    const tree = shallow(<ArrowRight />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Bell', () => {
    const tree = shallow(<Bell />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('BigArrow', () => {
    const tree = shallow(<BigArrow />).dive();
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
    const tree = shallow(<Dashboard />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Flag', () => {
    const tree = shallow(<Flag />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Help', () => {
    const tree = shallow(<Help />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('KeyLock', () => {
    const tree = shallow(<KeyLock />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Listings', () => {
    const tree = shallow(<Listings />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Mail', () => {
    const tree = shallow(<Mail />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Menu', () => {
    const tree = shallow(<Menu />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Papers', () => {
    const tree = shallow(<Papers />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Region', () => {
    const tree = shallow(<Region />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Settings', () => {
    const tree = shallow(<Settings />).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('Tag', () => {
    const tree = shallow(<Tag />).dive();
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

  it('Info', () => {
    const tree = shallow(<Info />);
    expect(tree.exists()).toEqual(true);
  });
});
