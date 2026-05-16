import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import contentConfig from '../assets/json/content.json';
import CalendarIcon from '../assets/icons/CalendarIcon.jsx';
import Timer from '../assets/icons/Timer.jsx';
import { useNavigation } from '@react-navigation/native';
import { formatShortDate } from '../shared/date.js';

const ListItem = ({ config, updateStatus }) => {
  const pageConfig = contentConfig.statusList;
  const statusConfig = pageConfig[config.status];
  const navigation = useNavigation();

  return (
    <Pressable
      style={[
        styles.container,
        config?.status === 'completed' && styles.completedCard,
      ]}
      onPress={() => navigation.navigate('Note', { id: config?.id })}
    >
      <View style={styles.notesHeader}>
        <Text style={styles.noteTitle}>{config.title}</Text>
        {config?.status && (
          <TouchableOpacity
            style={[
              {
                backgroundColor: statusConfig?.color,
                borderColor: statusConfig?.color,
              },
              styles.status,
            ]}
            onPress={() => updateStatus(config?.id)}
          >
            <Text
              style={[styles.statusText, { color: statusConfig?.textColor }]}
            >
              {statusConfig?.label}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.footer}>
        {config?.dateCreated && (
          <View style={styles.time}>
            <CalendarIcon width={14} height={14} />
            <Text style={styles.timeText}>
              {formatShortDate(config?.dateCreated)}
            </Text>
          </View>
        )}
        {config?.deadline && (
          <View style={styles.time}>
            <Timer width={14} height={14} />
            <Text style={styles.timeText}>
              {formatShortDate(config?.deadline)}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f3f5',
    backgroundColor: '#fff',
    borderRadius: 8,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  completedCard: {
    opacity: 0.6,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  noteTitle: {
    width: '70%',
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#7C8590',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '300',
    color: '#808694',
  },
});
