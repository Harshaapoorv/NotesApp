import * as React from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';
const Info = props => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 48 48"
    {...props}
  >
    <Circle fill="#2196F3" cx={24} cy={24} r={21} />
    <Rect x={22} y={22} fill="#ffffff" width={4} height={11} />
    <Circle fill="#ffffff" cx={24} cy={16.5} r={2.5} />
  </Svg>
);
export default Info;
