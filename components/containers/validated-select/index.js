// @flow
import * as React from 'react';
import DropdownPicker from 'components/atoms/dropdown-picker';
import { control } from 'react-validation';

type Props = {
  onChange?: any,
  name: string,
  disabled?: boolean,
  placeholder?: string,
  minWidth?: string,
  validations: any,
  children: React.Node[],
  value?: any,
};

type State = {
  optionName: string,
};

@control
class ValidatedSelect extends React.Component<Props, State> {
  constructor(props: Props, context: any) {
    super(props, context);

    let value;
    if (props.value) {
      ({ value } = props);
    }

    const { name } = this.items().find(e => e.value === value) || {};

    this.state = {
      optionName: name || '',
    };
  }

  onChange = (optionName: string) => {
    const item = this.items().find(e => e.name === optionName);
    const { name } = this.props;
    const event = {
      persist: () => null,
      target: {
        name,
        value: null,
      },
    };
    if (item) {
      event.target.value = item.value;
    }
    this.setState({ optionName });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  items() {
    const { children } = this.props;
    return React.Children.map(children, c => ({
      name: c.props.children,
      value: c.props.value,
    }));
  }

  render() {
    const { minWidth, placeholder, disabled, validations } = this.props;
    const { optionName } = this.state;
    return (
      <DropdownPicker
        onChange={this.onChange}
        items={this.items().map(i => i.name)}
        selectedItem={optionName}
        minWidth={minWidth}
        placeholder={placeholder}
        disabled={disabled}
        validations={validations}
      />
    );
  }
}

ValidatedSelect.displayName = 'ValidatedSelect';

export default ValidatedSelect;
