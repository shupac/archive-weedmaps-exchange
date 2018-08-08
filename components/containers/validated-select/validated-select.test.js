import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ValidatedForm from 'react-validation/build/form';
import ValidatedSelect from './';

ValidatedForm.displayName = 'ValidatedForm';

describe('validated select', () => {
  it('renders correctly', () => {
    const onChange = () => null;
    const tree = renderer
      .create(
        <ValidatedForm>
          <ValidatedSelect onChange={onChange}>
            <option value="one">One</option>
            <option value="two">Two</option>
            <option value="three">Three</option>
          </ValidatedSelect>
        </ValidatedForm>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
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
