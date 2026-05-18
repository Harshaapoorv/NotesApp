import * as React from 'react';
import Svg, { Line } from 'react-native-svg';
const Italic = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.fill || '#000000'}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Line x1={19} y1={4} x2={10} y2={4} />
    <Line x1={14} y1={20} x2={5} y2={20} />
    <Line x1={15} y1={4} x2={9} y2={20} />
  </Svg>
);
export default Italic;
