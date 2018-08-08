/* eslint-disable react/jsx-closing-bracket-location */
import PropTypes from 'prop-types';

export const WmTrashcan = ({ height, width, src }) => (
  <img
    className="wm-icon wm-trashcan-icon"
    alt="trash"
    src={src}
    height={height}
    width={width}
  />
);

WmTrashcan.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  src: PropTypes.string,
};

WmTrashcan.defaultProps = {
  height: '16px',
  width: '16px',
  src: '/static/images/trashcan.svg',
};

export default WmTrashcan;
