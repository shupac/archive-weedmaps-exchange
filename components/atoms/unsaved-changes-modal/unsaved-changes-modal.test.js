import { shallow } from 'enzyme';
import UnsavedChangesModal from './';

function setup() {
  const actions = {
    onStay: jest.fn(),
    onLeave: jest.fn(),
  };
  const component = <UnsavedChangesModal {...actions} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  return { wrapper, actions };
}

describe('UnsavedChangesModal', () => {
  it('should render the component ', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });
});
