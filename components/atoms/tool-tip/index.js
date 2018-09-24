// @flow
import { Component, Fragment } from 'react';
import { TooltipStyle, SpeechBubble } from './styles';

type Props = {
  children: any,
  message: string,
  height?: string,
  width?: string,
};

type State = {
  hover: boolean,
};

export default class Tooltip extends Component<Props, State> {
  state = {
    hover: false,
  };

  onMouseOver = () => {
    this.setState({ hover: true });
  };

  onMouseOut = () => {
    this.setState({ hover: false });
  };

  render() {
    const { children, message } = this.props;
    const { hover } = this.state;

    return (
      <Fragment>
        <TooltipStyle hover={hover}>
          <SpeechBubble>{message}</SpeechBubble>
        </TooltipStyle>
        {/* eslint-disable-next-line */}
        <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
          {children}
        </div>
      </Fragment>
    );
  }
}
