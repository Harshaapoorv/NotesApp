import * as React from 'react';
import Svg, { Circle, Path, Rect, Polygon } from 'react-native-svg';
const VerifySuccess = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 220 180"
    width={220}
    height={180}
    {...props}
  >
    <Circle cx={110} cy={90} r={32} fill="#24B45A" />
    <Path
      d="M 98 91 L 107 100 L 123 84"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M 35,60 Q 35,68 27,68 Q 35,68 35,76 Q 35,68 43,68 Q 35,68 35,60 Z"
      fill="#4285F4"
    />
    <Rect
      x={55}
      y={45}
      width={16}
      height={8}
      rx={2}
      transform="rotate(-20 63 49)"
      fill="#EA4335"
    />
    <Polygon points="90,30 94,35 90,40 86,35" fill="#FBBC05" />
    <Rect
      x={62}
      y={115}
      width={14}
      height={7}
      rx={2}
      transform="rotate(30 69 118.5)"
      fill="#34A853"
    />
    <Polygon points="42,120 47,125 42,130 37,125" fill="#FBBC05" />
    <Circle cx={45} cy={95} r={3} fill="#4285F4" />
    <Path
      d="M 185,95 Q 185,102 178,102 Q 185,102 185,109 Q 185,102 192,102 Q 185,102 185,95 Z"
      fill="#4285F4"
    />
    <Path
      d="M 145,115 Q 145,122 138,122 Q 145,122 145,129 Q 145,122 152,122 Q 145,122 145,115 Z"
      fill="#EA4335"
    />
    <Rect
      x={165}
      y={60}
      width={15}
      height={8}
      rx={2}
      transform="rotate(-35 172.5 64)"
      fill="#34A853"
    />
    <Polygon points="145,45 150,50 145,55 140,50" fill="#FBBC05" />
    <Rect
      x={180}
      y={35}
      width={8}
      height={15}
      rx={2}
      transform="rotate(15 184 42.5)"
      fill="#EA4335"
    />
    <Polygon points="202,68 207,73 202,78 197,73" fill="#FBBC05" />
    <Circle cx={160} cy={98} r={3} fill="#4285F4" opacity={0.3} />
    <Circle cx={105} cy={40} r={3.5} fill="#4285F4" opacity={0.4} />
    <Circle cx={120} cy={140} r={3.5} fill="#4285F4" opacity={0.5} />
    <Polygon
      points="148,22 152,25 148,28 144,25"
      fill="#4285F4"
      opacity={0.3}
    />
    <Polygon points="68,75 72,78 68,81 64,78" fill="#4285F4" opacity={0.2} />
  </Svg>
);
export default VerifySuccess;
