import * as React from 'react';
import Svg, { Path, Line } from 'react-native-svg';
const Bold = props => (
  <Svg
    fill={props.fill || '#000000'}
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    id="bold"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color"
    {...props}
  >
    <Path
      id="primary"
      d="M5,3h7.5A4.49,4.49,0,0,1,17,7.5h0A4.49,4.49,0,0,1,12.5,12H7"
      style={{
        fill: 'none',
        stroke: props.fill || '#000000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
    <Path
      id="primary-2"
      data-name="primary"
      d="M5,21h9.5A4.49,4.49,0,0,0,19,16.5h0A4.49,4.49,0,0,0,14.5,12H7"
      style={{
        fill: 'none',
        stroke: props.fill || '#000000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
    <Line
      id="primary-3"
      data-name="primary"
      x1={7}
      y1={21}
      x2={7}
      y2={3}
      style={{
        fill: 'none',
        stroke: props.fill || '#000000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
  </Svg>
);
export default Bold;
