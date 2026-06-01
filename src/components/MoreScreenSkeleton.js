import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MoreScreenSkeleton = () => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#E1E9EE"
      highlightColor="#F2F8FC"
      speed={1000}
    >
      <View style={{ flexDirection: 'row', padding: 16, gap: 8 }}>
        {/* Description */}
        <View
          style={{
            width: 84,
            height: 84,
            borderRadius: 40,
            backgroundColor: '#E1E9EE',
          }}
        />
        <View
          style={{
            width: '80%',
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: 16,
            gap: 8,
          }}
        >
          <View style={{ width: '50%', height: 16 }} />
          <View style={{ width: '70%', height: 12 }} />
          <View style={{ width: '30%', height: 12 }} />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          gap: 8,
          alignItems: 'center',
        }}
      >
        {/* Description */}
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: '#E1E9EE',
          }}
        />
        <View
          style={{
            width: '75%',
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: 8,
            gap: 8,
          }}
        >
          <View style={{ width: '50%', height: 14 }} />
          <View style={{ width: '70%', height: 10 }} />
        </View>
        <View style={{ width: 14, height: 36 }} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          gap: 8,
          alignItems: 'center',
        }}
      >
        {/* Description */}
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: '#E1E9EE',
          }}
        />
        <View
          style={{
            width: '75%',
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: 8,
            gap: 8,
          }}
        >
          <View style={{ width: '50%', height: 14 }} />
          <View style={{ width: '70%', height: 10 }} />
        </View>
        <View style={{ width: 14, height: 36 }} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          gap: 8,
          alignItems: 'center',
        }}
      >
        {/* Description */}
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: '#E1E9EE',
          }}
        />
        <View
          style={{
            width: '75%',
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: 8,
            gap: 8,
          }}
        >
          <View style={{ width: '50%', height: 14 }} />
          <View style={{ width: '70%', height: 10 }} />
        </View>
        <View style={{ width: 14, height: 36 }} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default MoreScreenSkeleton;
