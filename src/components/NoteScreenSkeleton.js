import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const NoteScreenSkeleton = () => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#E1E9EE"
      highlightColor="#F2F8FC"
      speed={1000}
    >
      <View style={{ padding: 16, gap: 24 }}>
        {/* Description */}
        <View style={{ gap: 12 }}>
          <View
            style={{
              width: 100,
              height: 12,
              borderRadius: 4,
            }}
          />

          <View
            style={{
              width: '100%',
              height: 18,
              borderRadius: 4,
            }}
          />

          <View
            style={{
              width: '90%',
              height: 18,
              borderRadius: 4,
            }}
          />
        </View>

        {/* Metadata Container */}
        <View
          style={{
            padding: 16,
            borderRadius: 8,
            gap: 16,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ gap: 8 }}>
              <View
                style={{
                  width: 80,
                  height: 12,
                  borderRadius: 4,
                }}
              />

              <View
                style={{
                  width: 120,
                  height: 16,
                  borderRadius: 4,
                }}
              />
            </View>

            <View style={{ gap: 8 }}>
              <View
                style={{
                  width: 80,
                  height: 12,
                  borderRadius: 4,
                }}
              />

              <View
                style={{
                  width: 100,
                  height: 16,
                  borderRadius: 4,
                }}
              />
            </View>
          </View>

          {/* Status */}
          <View style={{ gap: 8 }}>
            <View
              style={{
                width: 60,
                height: 12,
                borderRadius: 4,
              }}
            />

            <View
              style={{
                width: 100,
                height: 32,
                borderRadius: 8,
              }}
            />
          </View>
        </View>

        {/* Delete Button */}
        <View
          style={{
            width: '100%',
            height: 48,
            borderRadius: 8,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export default NoteScreenSkeleton;
