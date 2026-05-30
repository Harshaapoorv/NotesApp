import * as React from 'react';
import Svg, { Path, Circle, Polygon } from 'react-native-svg';
const ResetSuccess = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="100%"
    height="100%"
    {...props}
  >
    <Path
      d="M 100,52 C 120,52 138,56 146,60 C 146,102 132,138 100,162 C 68,138 54,102 54,60 C 62,56 80,52 100,52 Z"
      fill="none"
      stroke="#4285F4"
      strokeWidth={7}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.1}
    />
    <Path
      d="M 100,52 C 120,52 138,56 146,60 C 146,102 132,138 100,162 C 68,138 54,102 54,60 C 62,56 80,52 100,52 Z"
      fill="none"
      stroke="#ADC8FC"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={100} cy={105} r={25} fill="#24B45A" />
    <Path
      d="M 91,105 L 97,111 L 109,97"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={4.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M 34,44 Q 34,51 27,51 Q 34,51 34,58 Q 34,51 41,51 Q 34,51 34,44 Z"
      fill="#1866F2"
    />
    <Path
      d="M 152,30 Q 152,37 145,37 Q 152,37 152,44 Q 152,37 159,37 Q 152,37 152,30 Z"
      fill="#1866F2"
    />
    <Path
      d="M 168,72 Q 168,78 162,78 Q 168,78 168,84 Q 168,78 174,78 Q 168,78 168,72 Z"
      fill="#1866F2"
    />
    <Path
      d="M 24,132 Q 24,138 18,138 Q 24,138 24,144 Q 24,138 30,138 Q 24,138 24,132 Z"
      fill="#1866F2"
    />
    <Circle cx={48} cy={24} r={3} fill="#4285F4" opacity={0.4} />
    <Circle cx={20} cy={92} r={2.5} fill="#4285F4" opacity={0.3} />
    <Circle cx={42} cy={156} r={2} fill="#4285F4" opacity={0.3} />
    <Circle cx={60} cy={174} r={2.5} fill="#4285F4" opacity={0.4} />
    <Circle cx={154} cy={162} r={3} fill="#4285F4" opacity={0.4} />
    <Circle cx={180} cy={96} r={2} fill="#4285F4" opacity={0.3} />
    <Polygon
      points="172,143 175,146 172,149 169,146"
      fill="#4285F4"
      opacity={0.5}
    />
  </Svg>
);
export default ResetSuccess;
