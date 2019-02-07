// @flow
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import type { Node } from 'react';
import theme from 'lib/styles/theme';

type NodeOrNodes = Node | Node[];

// Create the ThemeProvider to retrieve context for wrapping around.
const themeProvider = shallow(<ThemeProvider theme={theme} />);
const themeContext = themeProvider.instance().getChildContext();

export const shallowWithTheme = (
  tree: NodeOrNodes,
  { context }: { context?: {} } = {},
) => shallow(tree, { context: Object.assign({}, context, themeContext) });

export const mountWithTheme = (
  tree: NodeOrNodes,
  { context, childContextTypes }: { context?: {}, childContextTypes?: {} } = {},
) =>
  mount(tree, {
    context: Object.assign({}, context, themeContext),
    childContextTypes: Object.assign(
      {},
      // $FlowFixMe
      ThemeProvider.childContextTypes,
      childContextTypes,
    ),
  });
