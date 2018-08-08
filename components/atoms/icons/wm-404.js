/* eslint-disable react/jsx-closing-bracket-location */
import PropTypes from 'prop-types';

export const Wm404 = ({ height, width, src }) => (
  <img
    className="wm-icon wm-404-icon"
    alt="Weedmaps"
    src={src}
    height={height}
    width={width}
  />
);

Wm404.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  src: PropTypes.string,
};

Wm404.defaultProps = {
  height: '120px',
  width: '120px',
  src: '/static/images/404.svg',
};

export default Wm404;
