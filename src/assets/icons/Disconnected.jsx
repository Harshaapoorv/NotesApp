import * as React from 'react';
import Svg, { Path, G, Line } from 'react-native-svg';
const Disconnected = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 280 180"
    width="100%"
    height="100%"
    {...props}
  >
    <Path
      d="M 98,74 C 115,70 145,68 164,74"
      fill="none"
      stroke="#165DFC"
      strokeWidth={2}
      strokeDasharray="4 4"
      opacity={0.3}
      strokeLinecap="round"
    />
    <Path
      d="M 95,89 C 115,86 145,84 167,90"
      fill="none"
      stroke="#FF5A36"
      strokeWidth={2}
      strokeDasharray="4 4"
      opacity={0.3}
      strokeLinecap="round"
    />
    <G transform="translate(85, 85) rotate(-12)">
      <Path
        d="M -44, 0 C -65, 0 -75, 20 -95, 12"
        fill="none"
        stroke="#165DFC"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <Path
        d="M -48, -6 L -44, -6 L -44, 6 L -48, 6 Z"
        fill="#0D46C1"
        opacity={0.8}
      />
      <Path
        d="M -53, -4 L -48, -4 L -48, 4 L -53, 4 Z"
        fill="#0D46C1"
        opacity={0.6}
      />
      <Path
        d="M -40, -22 L -6, -22 C -1, -22 3, -18 3, -13 L 3, 13 C 3, 18 -1, 22 -6, 22 L -40, 22 C -43, 22 -45, 19 -45, 16 L -45, -16 C -45, -19 -43, -22 -40, -22 Z"
        fill="#165DFC"
      />
      <Path
        d="M -22, -14 L -22, 14"
        fill="none"
        stroke="#ffffff"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.25}
      />
      <Path
        d="M 3, -9 L 18, -9 C 19.5, -9 20.5, -8 20.5, -6.5 L 20.5, -3.5 C 20.5, -2 19.5, -1 18, -1 L 3, -1 Z"
        fill="#84A9FF"
      />
      <Path
        d="M 3, 1 L 18, 1 C 19.5, 1 20.5, 2 20.5, 3.5 L 20.5, 6.5 C 20.5, 8 19.5, 9 18, 9 L 3, 9 Z"
        fill="#84A9FF"
      />
      <Line
        x1={8}
        y1={-5}
        x2={15}
        y2={-5}
        stroke="#FFFFFF"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.6}
      />
      <Line
        x1={8}
        y1={5}
        x2={15}
        y2={5}
        stroke="#FFFFFF"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.6}
      />
    </G>
    <G transform="translate(195, 75) rotate(12)">
      <Path
        d="M 44, 0 C 65, 0 75, -20 95, -12"
        fill="none"
        stroke="#FF5A36"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <Path
        d="M 44, -6 L 48, -6 L 48, 6 L 44, 6 Z"
        fill="#D83A16"
        opacity={0.8}
      />
      <Path
        d="M 48, -4 L 53, -4 L 53, 4 L 48, 4 Z"
        fill="#D83A16"
        opacity={0.6}
      />
      <Path
        d="M 6, -22 L 40, -22 C 43, -22 45, -19 45, -16 L 45, 16 C 45, 19 43, 22 40, 22 L 6, 22 C 1, 22 -3, 18 -3, 13 L -3, -13 C -3, -18 1, -22 6, -22 Z"
        fill="#FF5A36"
      />
      <Path
        d="M 22, -14 L 22, 14"
        fill="none"
        stroke="#ffffff"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.25}
      />
      <Path
        d="M -3, -10 L 4, -10 C 5, -10 5, -9 5, -8.5 L 5, -3.5 C 5, -3 5, -2 4, -2 L -3, -2 Z"
        fill="#B23B1E"
      />
      <Path
        d="M -3, 0 L 4, 0 C 5, 0 5, 1 5, 1.5 L 5, 6.5 C 5, 7 5, 8 4, 8 L -3, 8 Z"
        fill="#B23B1E"
      />
    </G>
    <G transform="translate(138, 78)">
      <Path
        d="M -12,-16 L -4,-2 L -14,2 L -6,14"
        fill="none"
        stroke="#165DFC"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.85}
      />
      <Path
        d="M 6,-14 L 14,2 L 4,6 L 12,18"
        fill="none"
        stroke="#FF5A36"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.85}
      />
    </G>
  </Svg>
);
export default Disconnected;
