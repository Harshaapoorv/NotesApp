import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeScreenSkeleton = ({ style }) => {
  return (
    <View style={[style]}>
      {/* Skeleton Content */}
      <SkeletonPlaceholder
        backgroundColor="#E1E9EE"
        highlightColor="#F2F8FC"
        speed={1000}
      >
        <View style={{ gap: 16 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
            <View
              key={item}
              style={{
                width: '100%',
                padding: 16,
                borderWidth: 1,
                borderColor: '#f3f3f5',
                backgroundColor: '#fff',
                borderRadius: 8,
                gap: 16,
              }}
            >
              {/* Title + Status */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 4,
                  flexWrap: 'wrap',
                }}
              >
                <View
                  style={{
                    width: '65%',
                    height: 24,
                    borderRadius: 4,
                  }}
                />

                <View
                  style={{
                    width: item % 2 === 0 ? '18%' : '22%',
                    height: 24,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                    alignSelf: 'flex-start',
                  }}
                />
              </View>

              {/* Dates */}
              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <View
                  style={{
                    width: '25%',
                    height: 18,
                    borderRadius: 4,
                  }}
                />

                <View
                  style={{
                    width: '25%',
                    height: 18,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>

      {/* FAB Skeleton */}
      <View
        style={{
          position: 'absolute',
          width: 72,
          height: 72,
          borderRadius: 36,
          bottom: 48,
          right: 24,
          backgroundColor: '#E1E9EE',
        }}
      />
    </View>
  );
};

export default HomeScreenSkeleton;
