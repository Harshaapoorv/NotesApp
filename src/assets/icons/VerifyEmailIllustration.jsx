import * as React from 'react';
import Svg, { Circle, Path, G, Line, Rect } from 'react-native-svg';
const VerifyEmailIllustration = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 240 240"
    width="100%"
    height="100%"
    {...props}
  >
    <Circle cx={120} cy={120} r={86} fill="#1866F2" opacity={0.06} />
    <Path
      d="M 48,116 L 76,90 L 164,90 L 192,116 L 192,186 C 192,194 186,200 178,200 L 62,200 C 54,200 48,194 48,186 Z"
      fill="#E8F0FE"
      stroke="#1866F2"
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <G>
      <Path
        d="M 86,56 L 150,56 L 162,68 L 162,145 L 78,145 L 78,64 C 78,60 82,56 86,56 Z"
        fill="#FFFFFF"
        stroke="#D2E3FC"
        strokeWidth={1}
      />
      <Path d="M 150,56 L 150,68 L 162,68 Z" fill="#D2E3FC" />
      <Line
        x1={94}
        y1={84}
        x2={146}
        y2={84}
        stroke="#ADC8FC"
        strokeWidth={6.5}
        strokeLinecap="round"
      />
      <Line
        x1={94}
        y1={102}
        x2={134}
        y2={102}
        stroke="#ADC8FC"
        strokeWidth={6.5}
        strokeLinecap="round"
      />
      <Line
        x1={94}
        y1={120}
        x2={150}
        y2={120}
        stroke="#ADC8FC"
        strokeWidth={6.5}
        strokeLinecap="round"
      />
    </G>
    <Path
      d="M 48,116 L 120,156 L 192,116 L 192,186 C 192,194 186,200 178,200 L 62,200 C 54,200 48,194 48,186 Z"
      fill="#FFFFFF"
      stroke="#1866F2"
      strokeWidth={4}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <Line
      x1={48}
      y1={184}
      x2={108}
      y2={150}
      stroke="#1866F2"
      strokeWidth={4}
      strokeLinecap="round"
    />
    <Line
      x1={192}
      y1={184}
      x2={132}
      y2={150}
      stroke="#1866F2"
      strokeWidth={4}
      strokeLinecap="round"
    />
    <G>
      <Circle cx={180} cy={172} r={22} fill="#1866F2" />
      <Path
        d="M 173,170 V 163 C 173,159 187,159 187,163 V 170"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <Rect x={169} y={169} width={22} height={16} rx={3.5} fill="#FFFFFF" />
    </G>
    <Path
      d="M 32,50 Q 32,60 22,60 Q 32,60 32,70 Q 32,60 42,60 Q 32,60 32,50 Z"
      fill="#1866F2"
    />
    <Path
      d="M 210,60 Q 210,68 202,68 Q 210,68 210,76 Q 210,68 218,68 Q 210,68 210,60 Z"
      fill="#1866F2"
    />
    <Circle cx={28} cy={112} r={5} fill="#1866F2" />
    <Circle cx={212} cy={102} r={5} fill="#1866F2" />
    <Circle cx={218} cy={146} r={3.5} fill="#4285F4" opacity={0.7} />
  </Svg>
);
export default VerifyEmailIllustration;
