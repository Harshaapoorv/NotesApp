import React, { useMemo } from 'react';
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
import { formatShortDate } from '../shared/date.js';
import Star from '../assets/icons/Star.jsx';

const ListItem = ({ config, updateStatus, updateStar, openNote }) => {
  const pageConfig = contentConfig.statusList;
  const statusConfig = pageConfig[config.status];

  const statusStyle = useMemo(
    () => ({
      backgroundColor: statusConfig?.color,
      borderColor: statusConfig?.color,
    }),
    [statusConfig],
  );

  return (
    <Pressable
      style={[
        styles.container,
        config?.status === 'completed' && styles.completedCard,
      ]}
      onPress={() => openNote(config?.id)}
    >
      <View style={styles.notesHeader}>
        <Text style={styles.noteTitle}>{config.title}</Text>
        {config?.status && (
          <TouchableOpacity
            style={[statusStyle, styles.status]}
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
        <View style={styles.dates}>
          {config?.created_at && (
            <View style={styles.time}>
              <CalendarIcon width={14} height={14} />
              <Text style={styles.timeText}>
                {formatShortDate(config?.created_at)}
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
        <Pressable
          onPress={() =>
            updateStar({ id: config?.id, is_starred: !config?.is_starred })
          }
        >
          <Star width={20} height={20} isFilled={config?.is_starred} />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default React.memo(ListItem, (prevProps, nextProps) => {
  return (
    prevProps.config.id === nextProps.config.id &&
    prevProps.config.title === nextProps.config.title &&
    prevProps.config.status === nextProps.config.status &&
    prevProps.config.is_starred === nextProps.config.is_starred &&
    prevProps.config.created_at === nextProps.config.created_at &&
    prevProps.config.deadline === nextProps.config.deadline &&
    prevProps.openNote === nextProps.openNote &&
    prevProps.updateStatus === nextProps.updateStatus &&
    prevProps.updateStar === nextProps.updateStar
  );
});

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
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 1,
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
    width: '65%',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  dates: {
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
