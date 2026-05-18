import * as React from 'react';
import Svg, { Polygon } from 'react-native-svg';
const Collapse = props => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 48 48"
    {...props}
  >
    <Polygon
      fill={props?.fill || '#BABAC3'}
      points="5,30.9 8.1,34 24,18.1 39.9,34 43,30.9 24,12"
    />
  </Svg>
);
export default Collapse;
