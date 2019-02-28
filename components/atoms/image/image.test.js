// @flow
import React from 'react';
import { shallow } from 'enzyme';
import Image from './';

describe('WM Logo Image', () => {
  const googleImageSrc =
    '../../../static/images/powered_by_google_on_white.png';

  it('should render image correctly with passed in props', () => {
    const wrapper = shallow(<Image alt="Google Image" src={googleImageSrc} />);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find('img').prop('src')).toEqual(googleImageSrc);
  });

  it('should update image src to missing image when error occurs', () => {
    const wrapper = shallow(<Image alt="missing image" src="Invalid Source" />);

    const event = {
      target: {
        onerror: true,
        src: 'Invalid Source',
      },
    };

    wrapper.props().onError(event);
    expect(event.target.src).toEqual('/static/images/image_missing.png');
    expect(event.target.onerror).toEqual(null);
  });
});
