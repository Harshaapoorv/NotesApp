import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BackgroundDecorations = () => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: -40,
          right: -50,
          width: 220,
          height: 220,
          borderRadius: 120,
          backgroundColor: '#2563EB',
          opacity: 0.025,
          transform: [{ scaleX: 1.2 }, { scaleY: 0.9 }, { rotate: '18deg' }],
        }}
      />

      <View
        style={{
          position: 'absolute',
          top: 220,
          right: -30,
          width: 100,
          height: 140,
          borderRadius: 80,
          backgroundColor: '#2563EB',
          opacity: 0.04,
          transform: [{ rotate: '-24deg' }],
        }}
      />

      <View
        style={{
          position: 'absolute',
          top: 120,
          left: -50,
          width: 120,
          height: 120,
          borderRadius: 999,
          backgroundColor: '#2563EB',
          opacity: 0.04,
        }}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 120,
          right: -40,
          width: 140,
          height: 140,
          borderRadius: 999,
          backgroundColor: '#2563EB',
          opacity: 0.03,
        }}
      />

      <View
        style={{
          position: 'absolute',
          top: 80,
          right: 24,
          width: 90,
          height: 90,
          opacity: 0.09,
          transform: [{ rotate: '12deg' }],
        }}
      >
        <Svg
          fill="#000000"
          width="80px"
          height="80px"
          viewBox="-6 0 46 46"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            id="_11.Notebook"
            data-name="11.Notebook"
            d="M41,46h0a1,1,0,0,1-1,1H12a5,5,0,0,1-5-5V6a5,5,0,0,1,5-5H38a1,1,0,0,1,1,1h0V9h1a1,1,0,0,1,1,1h0ZM9,42H9a3,3,0,0,0,3,3h3V11H12A4.962,4.962,0,0,1,9,9.978ZM37,9V3H12a3,3,0,0,0,0,6Zm2,2H17V45H39ZM12,7a1,1,0,0,1,0-2H34a1,1,0,0,1,0,2Z"
            transform="translate(-7 -1)"
            fillRule="evenodd"
          />
        </Svg>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 300,
          left: -4,
          width: 100,
          height: 100,
          opacity: 0.08,
          transform: [{ rotate: '-20deg' }],
        }}
      >
        <Svg
          width="80px"
          height="80px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <Path
            fill="#444"
            d="M1 11.9l-1 4.1 4.1-1 9.2-9.2-3.1-3.1-9.2 9.2zM1.5 15l-0.4-0.5 0.4-2 2 2-2 0.5zM10.9 4.4l-8.1 8-0.6-0.6 8.1-8 0.6 0.6z"
          />
          <Path
            fill="#444"
            d="M15.3 0.7c-1.1-1.1-2.6-0.5-2.6-0.5l-1.5 1.5 3.1 3.1 1.5-1.5c0-0.1 0.6-1.5-0.5-2.6zM13.4 1.6l-0.5-0.5c0.6-0.6 1.1-0.1 1.1-0.1l-0.6 0.6z"
          />
        </Svg>
      </View>
    </>
  );
};

export default BackgroundDecorations;
