import { rem } from 'polished';
import { WmTheme } from '@ghostgroup/ui';

export default {
  style: WmTheme.style,
  // Design Enforced colors
  palette: {
    white: '#FFFFFF',
    teal: '#00CDBE',
    darkTeal: '#50BAB3',
    blue: '#4A90E2',
    purple: '#936DC7',
    red: '#D0021B',
    yellow: '#F5A623',
    green: '#00B359',
    darkGrey1: '#9FA9BA',
    darkGrey2: '#727682',
    lightGrey1: '#E6EAEE',
    lightGrey2: '#CBD1E0',
    lightGrey3: '#F6F7FA',
    lightGrey4: '#FAFBFC',
    lightGrey5: '#F1F4F7',
    darkBlue1: '#354052',
    darkBlue2: '#262935',
    darkBlue3: '#1D1F26',
  },
  colors: {
    primary: '#00CDBE',
    // Accent
    border: '#cccccc',
    lightTeal: '#68E6DD',
    teal: '#00CDBE',
    midTeal: '#01A8A3',
    darkTeal: '#005F5C',
    forestGreen: '#004D47',
    persianGreen: '#02A99D',
    elfGreen: '#15957C',
    pink: '#FF3366',
    darkPink: '#DB0045',
    blueHaze: '#CBD1E0',
    dodgerBlue: '#0066FF',
    bondiBlue: '#0093B6',
    denimBlue: '#1B8AC9',
    skyBlue: '#68D6DD',
    fountainBlue: '#50BAB3',
    havelockBlue: '#4A90E2',
    oxfordBlue: '#354052',
    amethyst: '#936DC7',
    sushiGreen: '#71AD30',
    porcelain: '#F2F5F5',
    red: '#D0021B',
    denyRed: '#D95350',
    approveGreen: '#5DB75C',
    pendingYellow: '#FFB200',
    buttercup: '#F5A623',
    divider: '#E6EAEE',
    headerGrey: '#727682',

    // Grayscale
    white: '#FFFFFF',
    snow: '#FEFEFE',
    ghost: '#FDFDFD',
    vapor: '#F4F5F5',
    whiteSmoke: '#F1f1f1',
    smoke: '#EEEEEE',
    mercury: '#E6E5E5',
    silver: '#DFDFDF',
    gainsboro: '#DDDDDD',
    iron: '#CCCCCC',
    aluminum: '#999999',
    gullGray: '#9FA9BA',
    athensGray: '#FAFBFC',
    steel: '#666666',
    charcoal: '#4A4A4A',
    oil: '#333333',
    jet: '#222222',
    tar: '#111111',
    black: '#000000',

    bg: {
      grayGradient: `linear-gradient(0deg,#F2F4F7 0%,#FFFFFF 100%)`,
    },

    shadow: {
      light: 'rgba(0,0,0,0.2)',
      dark: 'rgba(0,0,0,0.7)',
    },

    // Listing Levels
    listingLevelGold: '#FFB700',
    listingLevelSilver: '#0E93B4',
    listingLevelBronze: '#E07000',

    // Navigation Menu
    navMenuBackgroundActive: '#1A1B23',
    navMenuBackgroundInactive: '#262935',
  },
  navigation: {
    sideNavWidth: rem(220),
    sideNavWidthCollapsed: rem(66),
  },
  dimensions: {
    // in pixels
    desktopHeader: 75,
    mobileHeader: 45,
    globalPadding: 16,
  },
  text: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
    proximaNovaFont:
      'proxima-nova, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
  },
  // Breakpoints, in em units
  breakpoints: [40, 52, 64],
  breakpointNames: ['xs', 'sm', 'md', 'lg'],
};
