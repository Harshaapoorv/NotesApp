import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import contentConfig from '../assets/json/content.json';
import Button from '../components/Button';
import AddNote from '../components/AddNote.js';
import BackArrow from '../assets/icons/Back.jsx';
import Edit from '../assets/icons/Edit.jsx';
import CalendarIcon from '../assets/icons/CalendarIcon.jsx';
import Timer from '../assets/icons/Timer.jsx';
import { useNavigation } from '@react-navigation/native';
import { convertToLongDate } from '../shared/utils.js';
import api from '../shared/api';

const NoteScreen = ({ route }) => {
  const { id: id, onRefresh } = route.params;
  const navigation = useNavigation();
  const [statusConfig, setStatusConfig] = useState();
  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);
  const [config, setConfig] = useState({});
  const [getData, setGetData] = useState(false);

  const onDelete = async () => {
    await api
      .delete(`/notes/${id}`)
      .then(function (response) {
        if (response.status === 200) {
          onRefresh();
          navigation.goBack();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchData = async () => {
    await api
      .get(`/notes/${id}`)
      .then(function (response) {
        if (response?.data) {
          let obj = response.data;
          let newObj = { ...obj };
          newObj.dateCreated = new Date(obj?.created_at);
          newObj.deadline = new Date(obj?.deadline);
          setStatusConfig(contentConfig.statusList[obj?.status]);
          setConfig(newObj);
        }
        setGetData(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (route?.params?.id) {
      setGetData(true);
    }
  }, []);

  useEffect(() => {
    if (getData) {
      fetchData();
    }
  }, [getData]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}
        >
          <BackArrow width={16} height={16} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{config?.title}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsAddNoteVisible(true);
            console.log('Edit Pressed');
          }}
        >
          <Edit width={16} height={16} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.body}>
        <View style={{ gap: 12 }}>
          <Text style={styles.sectionTitle}>DESCRIPTION</Text>
          <Text style={styles.description}>{config?.description}</Text>
        </View>
        <View style={styles.metaDataContainer}>
          <View style={styles.rowBig}>
            <View style={{ gap: 8 }}>
              <View style={styles.row}>
                <CalendarIcon width={16} height={16} />
                <Text style={styles.sectionTitle}>Created</Text>
              </View>
              <Text style={styles.description}>
                {convertToLongDate(`${config?.dateCreated?.getDate() + 1}/
                ${
                  config?.dateCreated?.getMonth() + 1
                }/${config?.dateCreated?.getFullYear()}`)}
                <Text style={{ color: '#6b7280' }}>
                  {' '}
                  at {config?.dateCreated?.getHours()}:
                  {config?.dateCreated?.getMinutes()}
                </Text>
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              <View style={styles.row}>
                <Timer width={16} height={16} />
                <Text style={styles.sectionTitle}>Deadline</Text>
              </View>
              <Text style={styles.description}>
                {convertToLongDate(
                  `${config?.deadline?.getDate() + 1}/${
                    config?.deadline?.getMonth() + 1
                  }/${config?.deadline?.getFullYear()}`,
                )}
              </Text>
            </View>
          </View>

          <View style={{ gap: 6 }}>
            <View style={styles.row}>
              <View
                style={[
                  { backgroundColor: statusConfig?.dotColor },
                  styles.dot,
                ]}
              />
              <Text style={styles.sectionTitle}>Status</Text>
            </View>
            <View
              style={[
                {
                  backgroundColor: statusConfig?.color,
                  borderColor: statusConfig?.color,
                },
                styles.status,
              ]}
            >
              <Text
                style={[styles.description, { color: statusConfig?.textColor }]}
              >
                {statusConfig?.label}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title="Delete Note"
          variantType="secondary"
          additionalStyles={styles.deleteButton}
          isDelete={true}
          isIcon={true}
          textStyles={styles.deleteButtonText}
          onPress={() => {
            onDelete();
          }}
        />
      </View>
      <AddNote
        isVisible={isAddNoteVisible}
        setIsVisible={setIsAddNoteVisible}
        type="edit"
        config={config}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  body: {
    padding: 16,
    paddingTop: 24,
    gap: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  description: {
    fontSize: 14,
    color: '#111827',
  },
  metaDataContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    gap: 16,
  },
  rowBig: {
    flexDirection: 'row',
    gap: 48,
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
    borderWidth: 1,
  },
  footer: {
    marginTop: 24,
    padding: 16,
  },
  deleteButton: {
    borderColor: '#e80015',
    gap: 8,
  },
  deleteButtonText: {
    color: '#e80015',
  },
});

export default NoteScreen;
