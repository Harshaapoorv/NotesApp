import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Copy = props => (
  <Svg
    width="800px"
    height="800px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Path fill={props?.color ? props?.color : '#FFFFFF'} d="M6 0v3h3z" />
    <Path
      fill={props?.color ? props?.color : '#FFFFFF'}
      d="M9 4h-4v-4h-5v12h9z"
    />
    <Path fill={props?.color ? props?.color : '#FFFFFF'} d="M13 4v3h3z" />
    <Path
      fill={props?.color ? props?.color : '#FFFFFF'}
      d="M12 4h-2v9h-3v3h9v-8h-4z"
    />
  </Svg>
);
export default Copy;
