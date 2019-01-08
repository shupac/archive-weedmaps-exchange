// @flow
import * as React from 'react';
import { REGION_COLORS } from 'lib/common/constants';
import Select from 'components/atoms/select';
import theme from 'lib/styles/theme';
import ColorKey from './styles';

const { zone } = theme;

type State = {
  selectedRegionColor: any,
};

type Props = {
  onColorSelect: string => void,
};

type ColorOptions = {
  value: string,
  text: any,
  icon?: ?React.Element<any>,
};

export class ColorSelect extends React.Component<Props, State> {
  state = {
    selectedRegionColor: null,
  };

  handleSelectChange = (item: { value: string, name: string }) => {
    this.setState({ selectedRegionColor: item });
    this.props.onColorSelect(item.value);
  };

  get colorOptions(): ColorOptions[] {
    return Object.entries(REGION_COLORS).map(color => ({
      value: color[0],
      text: color[1],
      icon: <ColorKey color={zone[color[0]]} />,
    }));
  }
  render() {
    const { selectedRegionColor } = this.state;

    return (
      <Select
        items={this.colorOptions}
        selectedItem={selectedRegionColor}
        itemToString={item => item.text}
        onChange={this.handleSelectChange}
        placeholder="Please choose a zone color.."
      />
    );
  }
}

export default ColorSelect;
