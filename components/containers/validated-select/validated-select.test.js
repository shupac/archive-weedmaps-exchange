import React from 'react';
import { shallow, mount } from 'enzyme';
import ValidatedForm from 'react-validation/build/form';
import ValidatedSelect from './';

ValidatedForm.displayName = 'ValidatedForm';

describe('validated select', () => {
  it('renders correctly', () => {
    const onChange = () => null;
    const tree = shallow(
      <ValidatedForm>
        <ValidatedSelect onChange={onChange}>
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </ValidatedSelect>
      </ValidatedForm>,
    );
    expect(tree.exists()).toEqual(true);
  });

  it('should call onChange when clicking on a SelectionItem', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ValidatedForm>
        <ValidatedSelect onChange={onChange}>
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </ValidatedSelect>
      </ValidatedForm>,
    );
    wrapper.find('SelectionButton').simulate('click');
    wrapper
      .find('SelectionItem')
      .first()
      .simulate('click');
    expect(onChange).toHaveBeenCalled();
  });

  it('should update the form when clicking on a SelectionItem', () => {
    const wrapper = mount(
      <ValidatedForm>
        <ValidatedSelect name="select">
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </ValidatedSelect>
      </ValidatedForm>,
    );
    wrapper.find('SelectionButton').simulate('click');
    wrapper
      .find('SelectionItem')
      .first()
      .simulate('click');
    expect(
      wrapper
        .find('ValidatedForm')
        .instance()
        .getValues().select,
    ).toEqual('one');
  });
});
