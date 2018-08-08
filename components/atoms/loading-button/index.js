// @flow
import React, { Fragment } from 'react';
import { WmTheme } from '@ghostgroup/ui';
import Spinner from 'components/atoms/icons/spinner';
import ButtonLoadingProgress from 'components/atoms/loading-button/styles';

const { state } = WmTheme.style;

const LoadingButton = ({
  isLoading = false,
  children,
  loadingText,
  onClick,
  size = { width: '180px', height: '40px' },
  disabled,
}: {
  isLoading: boolean,
  children: string,
  loadingText: string,
  onClick: any,
  size?: { width?: string, height?: string },
  disabled?: boolean,
}) => (
  <ButtonLoadingProgress
    isLoading={isLoading}
    size={size}
    onClick={onClick}
    disabled={disabled}
  >
    {isLoading ? (
      <Fragment>
        <Spinner stroke={state.secondary} />
        <span>{loadingText}</span>
      </Fragment>
    ) : (
      <Fragment>{children}</Fragment>
    )}
  </ButtonLoadingProgress>
);

LoadingButton.displayName = 'LoadingButton';

export default LoadingButton;
