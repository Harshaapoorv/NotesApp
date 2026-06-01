import React from 'react';
import Svg, { G, Path, Polygon } from 'react-native-svg';

const Privacy = ({ size = 64, color = '#2563EB', ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" {...props}>
      <G>
        {/* Main Base Shield Outline */}
        <Path
          fill={color}
          d="M48.7,13.36l-15.73-5.2c-0.63-0.21-1.31-0.21-1.93,0l-15.73,5.2c-1.26,0.42-2.11,1.6-2.11,2.92v19.6 c0,4.1,1.89,7.98,5.12,10.51l11.16,8.73c1.49,1.16,3.57,1.16,5.06,0l11.16-8.73c3.23-2.53,5.12-6.41,5.12-10.51v-19.6 C50.81,14.96,49.96,13.78,48.7,13.36z"
        />
        {/* Top Left Quadrant (Blue) */}
        <Polygon
          fill={color}
          points="32,12.05 17.19,16.95 17.19,31.02 32,31.02"
        />
        {/* Top Right Quadrant (White) */}
        <Polygon
          fill="#FFFFFF"
          points="46.81,31.02 46.81,16.95 32,12.05 32,12.05 32,31.02"
        />
        {/* Bottom Left Quadrant (White) */}
        <Path
          fill="#FFFFFF"
          d="M17.19,31.02v4.86c0,2.89,1.31,5.58,3.59,7.36l11.16,8.73C31.94,51.98,31.96,52,32,52V31.02H17.19z"
        />
        {/* Bottom Right Quadrant (Blue) */}
        <Path
          fill={color}
          d="M32,31.02V52l0.06-0.02l11.16-8.73c2.28-1.78,3.59-4.47,3.59-7.36v-4.86H32z"
        />
      </G>
    </Svg>
  );
};

export default Privacy;
