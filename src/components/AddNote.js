import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
} from 'react-native';
import uuid from 'react-native-uuid';
import Button from './Button';
import Close from '../assets/icons/Close.jsx';
import Input from './Input';
import contentConfig from '../assets/json/content.json';
import { useFocusEffect } from '@react-navigation/native';

const AddNote = ({
  isVisible,
  setIsVisible,
  setNotesList,
  notesList,
  type = 'create',
  config = {},
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState();
  const [deadline, setDeadline] = useState();
  const [dateCreated, setDateCreated] = useState(new Date());
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPrePopulated, setIsPrePopulated] = useState(false);
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  const statusConfig = contentConfig.statusList;

  useFocusEffect(() => {
    if (type === 'edit' && !isPrePopulated) {
      setTitle(config?.title);
      setDescription(config?.description);
      setStatus(statusConfig[config?.status]);
      setDeadline(config?.deadline);
      setDateCreated(config?.dateCreated);
      setIsPrePopulated(true);
    }
  });

  useEffect(() => {
    if (title) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [title, description]);

  const onReset = () => {
    setTitle('');
    setDescription('');
    setStatus();
    setDeadline();
    setIsVisible(false);
  };

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardWillShow', e => {
      Animated.timing(keyboardOffset, {
        toValue: e.endCoordinates.height,
        duration: e.duration,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener('keyboardWillHide', e => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: e.duration,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const onCreateNote = () => {
    let arr;
    if (type === 'edit') {
      arr = [];
    } else {
      arr = [...notesList];
    }
    let newNote = {
      title: title,
      description: description,
      status: status?.value ? status.value : status,
      deadline: deadline,
      dateCreated: dateCreated,
    };
    if (type === 'edit') {
      newNote = { ...newNote, id: config?.id ? config.id : uuid.v4() };
      arr.push(newNote);
    } else {
      newNote = { ...newNote, id: uuid.v4() };
    }
    arr.push(newNote);
    if (type === 'create') {
      setNotesList(arr);
    } else {
      console.log('Edited Note: ', newNote);
    }
    onReset();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsVisible(!isVisible)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [
                  { translateY: Animated.multiply(keyboardOffset, -0.6) },
                ],
              },
            ]}
          >
            <Close
              width={24}
              height={24}
              style={styles.closeIcon}
              onPress={() => onReset()}
            />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {type === 'edit' ? `Edit Note` : 'Create New Note'}
              </Text>
              <Text style={styles.modalTitleDesc}>
                {type === 'edit'
                  ? title
                  : 'Fill in the details for your new note:'}
              </Text>
            </View>

            <ScrollView
              contentContainerStyle={styles.modalBody}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Form fields for note creation will go here */}
              <Input
                label={'Title'}
                placeholder={'Enter note title...'}
                value={title}
                onChangeText={setTitle}
                isRequired={true}
              />
              <Input
                label={'Description'}
                placeholder={'Enter note description...'}
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={5}
                additionalStyles={{ height: 120 }}
              />
              <Input
                variantType="dropdown"
                placeholder={'Select Status'}
                label={'Status'}
                value={status}
                onChangeText={setStatus}
                optionList={[
                  {
                    value: 'pending',
                    label: 'Pending',
                  },
                  {
                    value: 'progress',
                    label: 'In Progress',
                  },
                  {
                    value: 'completed',
                    label: 'Completed',
                  },
                ]}
                onPressOption={() => Keyboard.dismiss()}
              />
              <Input
                label={'Deadline'}
                variantType="date"
                placeholder={'dd/mm/yyyy'}
                value={deadline}
                onChangeText={setDeadline}
              />
            </ScrollView>
            <View style={styles.modalFooter}>
              <Button
                title={type === 'edit' ? 'Save Changes' : 'Create Note'}
                variantType="primary"
                onPress={() => onCreateNote()}
                isDisabled={isButtonDisabled}
                additionalStyles={{ width: '100%' }}
              />
              <Button
                title="Cancel"
                variantType="secondary"
                onPress={() => onReset()}
                additionalStyles={{ width: '100%' }}
              />
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#fff',
    borderRadius: 10,
    gap: 16,
    overflow: 'visible',
  },
  keyboardContainer: {
    marginBottom: 120,
  },
  closeIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    alignSelf: 'flex-end',
  },
  modalHeader: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  modalTitleDesc: {
    fontSize: 14,
    fontWeight: '400',
    color: '#667085',
  },
  modalBody: {
    width: '100%',
    gap: 12,
    marginBottom: 40,
    flexGrow: 1,
  },
  modalFooter: {
    width: '100%',
    gap: 12,
  },
});

export default AddNote;
