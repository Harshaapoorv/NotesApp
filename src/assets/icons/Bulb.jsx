import * as React from 'react';
import Svg, { Rect, Path, Line } from 'react-native-svg';
const Bulb = props => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    enableBackground="new 0 0 32 32"
    xmlSpace="preserve"
    {...props}
  >
    <Rect
      x={13}
      y={23}
      fill="none"
      stroke={props?.color ? props?.color : '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      width={6}
      height={4}
    />
    <Path
      fill="none"
      stroke={props?.color ? props?.color : '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M24,12c0-4.7-4.1-8.5-8.9-7.9 c-3.6,0.4-6.5,3.3-7,6.9c-0.4,2.9,0.8,5.5,2.8,7.2c1.4,1.2,2.2,2.9,2.2,4.6V23h6v-0.2c0-1.8,0.9-3.5,2.3-4.8 C22.9,16.5,24,14.4,24,12z"
    />
    <Line
      fill="none"
      stroke={props?.color ? props?.color : '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={27}
      y1={13}
      x2={30}
      y2={13}
    />
    <Line
      fill="none"
      stroke={props?.color ? props?.color : '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={2}
      y1={13}
      x2={5}
      y2={13}
    />
    <Line
      fill="none"
      stroke={props?.color ? props?.color : '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={23.8}
      y1={20.8}
      x2={25.9}
      y2={22.9}
    />
    <Line
      fill="none"
      stroke={props?.color ? props?.color : '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={6.1}
      y1={3.1}
      x2={8.2}
      y2={5.2}
    />
    <Line
      fill="none"
      stroke={props?.color ? props?.color : '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={8.2}
      y1={20.8}
      x2={6.1}
      y2={22.9}
    />
    <Line
      fill="none"
      stroke={props?.color ? props?.color : '#000000'}
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={25.9}
      y1={3.1}
      x2={23.8}
      y2={5.2}
    />
    <Path d="M18,27c0,1.1-0.9,2-2,2s-2-0.9-2-2H18z" />
  </Svg>
);
export default Bulb;
