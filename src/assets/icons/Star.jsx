// import * as React from 'react';
// import Svg, { G, Path } from 'react-native-svg';
// const Star = props => (
//   <Svg
//     width="800px"
//     height="800px"
//     viewBox="0 0 24 24"
//     xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
//     xmlns="http://www.w3.org/2000/svg"
//     xmlns:cc="http://creativecommons.org/ns#"
//     xmlns:dc="http://purl.org/dc/elements/1.1/"
//     {...props}
//   >
//     <G transform="translate(0 -1028.4)">
//       <Path
//         d="m12 1028.4 4 9 8 1-6 5 2 9-8-5-8 5 2-9-6-5 8-1z"
//         fill={props?.isFilled ? '#f39c12' : 'none'}
//       />
//       <Path
//         d="m12 1028.4-4 9-6.9688 0.8 4.9688 4.2-0.1875 0.8 0.1875 0.2-1.75 7.8 7.75-4.8 7.75 4.8-1.75-7.8 0.188-0.2-0.188-0.8 4.969-4.2-6.969-0.8-4-9z"
//         fill={props?.isFilled ? '#f1c40f' : 'none'}
//       />
//     </G>
//   </Svg>
// );
// export default Star;

import * as React from 'react';
import Svg, { Polygon } from 'react-native-svg';
const Star = props => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="800px"
    height="800px"
    viewBox="0 0 64 64"
    enableBackground="new 0 0 64 64"
    xmlSpace="preserve"
    {...props}
  >
    <Polygon
      fill={props?.isFilled ? '#f1c40f' : 'none'}
      stroke={props?.isFilled ? '#f1c40f' : '#111827'}
      strokeWidth={2}
      strokeMiterlimit={10}
      points="32,47 12,62 20,38 2,24 24,24 32,1 40,24  62,24 44,38 52,62 "
    />
  </Svg>
);
export default React.memo(Star);
