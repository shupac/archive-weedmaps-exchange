import has from 'lodash/has';

export default function formHelpers(wrapper) {
  const setInput = (name, value) => {
    wrapper
      .find(`input[name="${name}"]`)
      .simulate('change', { target: { value } });
  };

  const setTextArea = (name, value) => {
    wrapper
      .find(`textarea[name="${name}"]`)
      .simulate('change', { target: { value } });
  };

  const setValidatedSelect = (name, itemNumber) => {
    wrapper
      .find(`ValidatedSelect[name="${name}"] SelectionButton`)
      .simulate('click');

    wrapper
      .find(`ValidatedSelect[name="${name}"] SelectionItem`)
      .at(itemNumber)
      .simulate('click');
  };

  return {
    setInput,
    setTextArea,
    setValidatedSelect,
  };
}

export async function formIsValid(form: any = {}) {
  if (form.values.taxes && form.values.taxes.length >= 1) {
    await form.submitForm();
    const currentState = form.getFormState();

    return (
      !has(currentState, 'errors') ||
      (currentState.errors && currentState.errors.length === 0)
    );
  }
  return false;
}

export const findSelection = (value, selectionSet) =>
  selectionSet.find(item => item.value === value);

export const mapSelection = (values = [], selectionSet) => {
  const full = values.map(name =>
    selectionSet.find(item => item.value && item.value === name),
  );
  return full;
};
