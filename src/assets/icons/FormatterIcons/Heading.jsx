import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Heading = props => (
  <Svg
    fill={props.fill || '#000000'}
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    id="heading"
    data-name="Flat Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-color"
    {...props}
  >
    <Path
      id="primary"
      d="M20,22H16a1,1,0,0,1,0-2h1V13H7v7H8a1,1,0,0,1,0,2H4a1,1,0,0,1,0-2H5V4H4A1,1,0,0,1,4,2H8A1,1,0,0,1,8,4H7v7H17V4H16a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2H19V20h1a1,1,0,0,1,0,2Z"
      style={{
        fill: props.fill || '#000000',
      }}
    />
  </Svg>
);
export default Heading;
