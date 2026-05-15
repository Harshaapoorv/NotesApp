import React from 'react';
import { Animated, Easing } from 'react-native';
import LoaderIcon from '../assets/icons/Loader.jsx';

const Loader = ({ color }) => {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
      <LoaderIcon color={color} />
    </Animated.View>
  );
};

export default Loader;
