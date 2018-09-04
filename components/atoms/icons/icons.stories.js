import React from 'react';
import { storiesOf } from '@storybook/react';
import BackgroundColorDecorator from 'storybook/decorators/background-color';
import GlobalStyleDecorator from 'storybook/decorators/global-style';
import { ArrowDown, ArrowUp, ArrowLeft, ArrowRight } from './arrow';
import { Bell } from './bell';
import { Brands } from './brands';
import { Check } from './check';
import { Chart } from './chart';
import { Dashboard } from './dashboard';
import { Desktop } from './desktop';
import { Grid } from './grid';
import { Flag } from './flag';
import { Help } from './help';
import { Keylock } from './key-lock';
import { Listings } from './listings';
import { Menu } from './menu';
import { Mobile } from './mobile';
import { Mail } from './mail';
import { Papers } from './papers';
import { Region } from './region';
import { Settings } from './settings';
import { Tag } from './tag';
import { Toolbox } from './toolbox';
import { WmLogo } from './wm-logo';
import { WmLogoMini } from './wm-logo-mini';
import { ChevronRight, ChevronLeft, ChevronDown } from './chevron';
import { Spinner } from './spinner';
import { Caret } from './caret';
import { Plus } from './plus';
import { Bookmark } from './bookmark';
import { ErrorIcon } from './error';
import { Cart } from './cart';
import { Info } from './info';

export default storiesOf('Icons', module)
  .addDecorator(GlobalStyleDecorator)
  .addDecorator(BackgroundColorDecorator)
  .add('ArrowDown', () => <ArrowDown />)
  .add('ArrowLeft', () => <ArrowLeft />)
  .add('ArrowRight', () => <ArrowRight />)
  .add('ArrowUp', () => <ArrowUp />)
  .add('Bell', () => <Bell size={{ width: '24px', height: '20px' }} />)
  .add('Bookmark', () => <Bookmark />)
  .add('Brands', () => <Brands />)
  .add('Check', () => <Check />)
  .add('Cart', () => <Cart />)
  .add('Chart', () => <Chart />)
  .add('Chevron Right', () => <ChevronRight />)
  .add('Chevron Left', () => <ChevronLeft />)
  .add('Chevron Down', () => <ChevronDown />)
  .add('Dashboard', () => <Dashboard />)
  .add('Desktop', () => <Desktop />)
  .add('ErrorIcon', () => <ErrorIcon />)
  .add('Flag', () => <Flag />)
  .add('Flag big for top nav bar', () => (
    <Flag size={{ width: '20px', height: '25px' }} />
  ))
  .add('Grid', () => <Grid />)
  .add('Help', () => <Help size={{ width: '24px', height: '24px' }} />)
  .add('Info', () => <Info />)
  .add('Keylock', () => <Keylock />)
  .add('Listings', () => <Listings />)
  .add('Mail', () => <Mail size={{ width: '24px', height: '18px' }} />)
  .add('Menu', () => <Menu size={{ width: '30px', height: '24px' }} />)
  .add('Mobile', () => <Mobile />)
  .add('Papers', () => <Papers />)
  .add('Region', () => <Region />)
  .add('Settings', () => <Settings />)
  .add('Tag', () => <Tag />)
  .add('Toolbox', () => <Toolbox />)
  .add('WmLogo', () => <WmLogo width="100px" height="24px" />)
  .add('WmLogoMini', () => <WmLogoMini width="33px" height="19px" />)
  .add('Spinner', () => <Spinner />)
  .add('Caret', () => <Caret />)
  .add('Plus', () => <Plus />);
