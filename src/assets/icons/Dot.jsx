import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';
const Dot = props => (
  <Svg
    width="8px"
    height="8px"
    viewBox="0 0 12 12"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={6} cy={6} r={6} fill={props?.color ? props.color : '#808094'} />
  </Svg>
);
export default Dot;
