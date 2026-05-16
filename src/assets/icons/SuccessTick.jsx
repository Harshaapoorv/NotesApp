import * as React from 'react';
import Svg, { Circle, Polyline } from 'react-native-svg';
const SuccessTick = props => (
  <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 50 50"
    style={{
      enableBackground: 'new 0 0 50 50',
    }}
    xmlSpace="preserve"
    {...props}
  >
    <Circle
      style={{
        fill: '#25AE88',
      }}
      cx={25}
      cy={25}
      r={25}
    />
    <Polyline
      style={{
        fill: 'none',
        stroke: '#FFFFFF',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: 10,
      }}
      points=" 38,15 22,33 12,25 "
    />
  </Svg>
);
export default SuccessTick;
