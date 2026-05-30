import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G, Rect, Polygon } from 'react-native-svg';
const AllSet = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 180 180"
    width="100%"
    height="100%"
    {...props}
  >
    <Defs>
      <ClipPath id="cone-clip">
        <Path d="M 36,164 L 62,82 C 74,70 106,110 114,122 Z" />
      </ClipPath>
    </Defs>
    <Path
      d="M 72,86 C 62,65 80,52 68,34 C 62,24 72,14 68,8"
      fill="none"
      stroke="#ADC8FC"
      strokeWidth={3}
      strokeLinecap="round"
      opacity={0.8}
    />
    <Path
      d="M 82,94 C 80,68 105,62 90,42 C 80,28 100,18 92,10"
      fill="none"
      stroke="#1866F2"
      strokeWidth={3.5}
      strokeLinecap="round"
    />
    <Path
      d="M 94,102 C 105,82 98,68 114,52 C 120,42 110,32 122,22"
      fill="none"
      stroke="#ADC8FC"
      strokeWidth={3}
      strokeLinecap="round"
      opacity={0.8}
    />
    <Path
      d="M 102,110 C 122,116 136,106 144,102 C 150,99 153,91 146,87 C 137,82 131,95 143,95"
      fill="none"
      stroke="#1866F2"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M 110,118 C 122,122 128,114 142,115"
      fill="none"
      stroke="#34A853"
      strokeWidth={2.5}
      strokeLinecap="round"
      opacity={0.5}
    />
    <Path
      d="M 112,74 C 118,66 124,76 130,68"
      fill="none"
      stroke="#34A853"
      strokeWidth={2}
      opacity={0.3}
    />
    <G clipPath="url(#cone-clip)">
      <Rect x={0} y={0} width={180} height={180} fill="#1866F2" />
      <Path
        d="M 10,135 Q 55,123 100,155 L 90,178 Q 45,145 0,158 Z"
        fill="#ADC8FC"
      />
      <Path
        d="M 30,95 Q 75,88 120,118 L 110,140 Q 65,106 15,118 Z"
        fill="#ADC8FC"
      />
    </G>
    <Path
      d="M 62,82 C 74,70 106,110 114,122 C 103,130 73,93 62,82 Z"
      fill="#1049A9"
    />
    <Path
      d="M 28,70 Q 28,82 16,82 Q 28,82 28,94 Q 28,82 40,82 Q 28,82 28,70 Z"
      fill="#1866F2"
    />
    <Path
      d="M 148,58 Q 148,66 140,66 Q 148,66 148,74 Q 148,66 156,66 Q 148,66 148,58 Z"
      fill="#1866F2"
    />
    <Polygon points="53,36 57,40 53,44 49,40" fill="#FBBC04" />
    <Polygon points="126,27 131,31 126,35 121,31" fill="#EA4335" />
    <Polygon points="147,122 152,126 147,130 142,126" fill="#FBBC04" />
    <Polygon points="16,112 19,115 16,118 13,115" fill="#1866F2" />
    <Rect
      x={126}
      y={140}
      width={4}
      height={4}
      rx={1}
      fill="#1866F2"
      opacity="0.2.5"
      transform="rotate(15 126 140)"
    />
    <Rect
      x={158}
      y={80}
      width={4}
      height={4}
      rx={1}
      fill="#1866F2"
      opacity="0.2.5"
      transform="rotate(45 158 80)"
    />
  </Svg>
);
export default AllSet;
