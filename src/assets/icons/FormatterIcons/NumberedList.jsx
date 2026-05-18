import * as React from 'react';
import Svg, { Line, Path } from 'react-native-svg';
const NumberedList = props => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    enableBackground="new 0 0 32 32"
    xmlSpace="preserve"
    {...props}
  >
    <Line
      fill="none"
      stroke={props.fill || '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={11}
      y1={7}
      x2={28}
      y2={7}
    />
    <Line
      fill="none"
      stroke={props.fill || '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={11}
      y1={16}
      x2={28}
      y2={16}
    />
    <Line
      fill="none"
      stroke={props.fill || '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={11}
      y1={25}
      x2={28}
      y2={25}
    />
    <Path
      fill="none"
      stroke={props.fill || '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M5,15v-0.5C5,13.7,5.7,13,6.5,13h0 C7.3,13,8,13.7,8,14.5v0c0,0.3-0.1,0.6-0.4,0.8L5,17.8V18h4"
    />
    <Path
      fill="none"
      stroke={props.fill || '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M4,27h2.5C7.3,27,8,26.3,8,25.5v0 C8,24.7,7.3,24,6.5,24H6v-0.1l1-1.7V22H4"
    />
    <Path
      fill="none"
      stroke={props.fill || '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M7,10V4H6.4c0,0-0.9,1-2,1"
    />
  </Svg>
);
export default NumberedList;
