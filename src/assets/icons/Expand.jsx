import * as React from 'react';
import Svg, { Polygon } from 'react-native-svg';
const Expand = props => (
  <Svg
    width="48px"
    height="48px"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 48 48"
    {...props}
  >
    <Polygon
      fill={props?.fill || '#BABAC3'}
      points="43,17.1 39.9,14 24,29.9 8.1,14 5,17.1 24,36"
    />
  </Svg>
);
export default Expand;
