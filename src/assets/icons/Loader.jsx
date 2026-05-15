import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const LoaderIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props?.color ? props.color : '#ffffff'}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M21 12a9 9 0 11-6.219-8.56" />
  </Svg>
);
export default LoaderIcon;
