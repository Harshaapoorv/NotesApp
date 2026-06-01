import React from 'react';

import { View, Text, StyleSheet, Pressable } from 'react-native';
import Next from '../assets/icons/Next.jsx';

const MoreList = ({ config }) => {
  return (
    <View style={styles.list}>
      {config.map((obj, index) => {
        const { Icon, title, description, onClickHandler } = obj;
        const isLastItem = index === config.length - 1;

        return (
          <Pressable
            key={index}
            style={[styles.listItem, isLastItem && styles.lastItem]}
            onPress={() => {
              if (onClickHandler) {
                onClickHandler();
              }
            }}
          >
            <View style={styles.listItemContent}>
              <Icon width={32} height={32} />
              <View style={styles.listItemText}>
                <Text style={styles.listItemTitle}>{title}</Text>
                <Text style={styles.listItemDescription}>{description}</Text>
              </View>
            </View>
            <Next width={16} height={16} />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 8,
  },
  listItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listItemText: {
    width: '75%',
    gap: 8,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  listItemDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default MoreList;
