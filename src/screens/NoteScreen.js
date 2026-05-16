import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Pressable,
  Animated,
} from 'react-native';
import contentConfig from '../assets/json/content.json';
import Button from '../components/Button';
import AddNote from '../components/AddNote.js';
import BackArrow from '../assets/icons/Back.jsx';
import Edit from '../assets/icons/Edit.jsx';
import CalendarIcon from '../assets/icons/CalendarIcon.jsx';
import Timer from '../assets/icons/Timer.jsx';
import Dot from '../assets/icons/Dot.jsx';
import { useNavigation } from '@react-navigation/native';
import {
  useDeleteNoteMutation,
  useGetNoteByIdQuery,
  useUpdateStatusMutation,
} from '../services/notesApi.js';
import { formatShortDate, formatTime } from '../shared/date.js';
import NoteScreenSkeleton from '../components/NoteScreenSkeleton.js';
import ErrorModal from '../components/ErrorModal.js';
import getErrorMessage from '../services/apiErrorHandler.js';
import ToastMessage from '../components/ToastMessage.js';
import AlertModal from '../components/AlertModal.js';
import ClipBoard from '../assets/icons/ClipBoard.jsx';
import Clipboard from '@react-native-clipboard/clipboard';
import SuccessTick from '../assets/icons/SuccessTick.jsx';

const NoteScreen = ({ route }) => {
  const { id: id } = route.params;
  const navigation = useNavigation();
  const [statusConfig, setStatusConfig] = useState();
  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);
  const [config, setConfig] = useState({});

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [startTimer, setStartTimer] = useState(false);
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);

  const [copied, setCopied] = useState(false);
  const [copiedTimer, setCopiedTimer] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const successAnim = useState(new Animated.Value(0))[0];

  const animateClipboard = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.88,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.delay(700),
      Animated.timing(successAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onCopyToClipboard = text => {
    Clipboard.setString(text);
    animateClipboard();
    setIsSuccessVisible(true);
    setSuccessMessage({
      title: 'Copied!!',
      type: 'info',
    });
    setCopied(true);
    setCopiedTimer(true);
    setStartTimer(true);
  };

  const onCloseErrorModal = () => {
    setIsErrorModalVisible(false);
    setErrorMessage('');
  };

  const [
    deleteNote,
    {
      isSuccess: deleteNoteSuccess,
      isLoading: deleteNoteLoading,
      isError: isDeleteNoteError,
      error: deleteNoteErrorData,
    },
  ] = useDeleteNoteMutation();

  useEffect(() => {
    if (deleteNoteSuccess) {
      setIsAlertModalVisible(false);
      navigation.popTo('Home', {
        isSuccessVisible: deleteNoteSuccess,
        successMessage: {
          title: 'Note has been deleted successfully.',
          type: 'success',
        },
      });
    } else if (isDeleteNoteError) {
      setIsAlertModalVisible(false);
      setIsErrorModalVisible(true);
      setErrorMessage(getErrorMessage(deleteNoteErrorData));
    }
  }, [deleteNoteSuccess, navigation, isDeleteNoteError, deleteNoteErrorData]);

  const {
    data,
    isSuccess,
    isLoading,
    isError: isGetNoteError,
    error: getNoteErrorData,
    refetch,
    isFetching,
  } = useGetNoteByIdQuery(id, {
    skip: !id || deleteNoteSuccess || deleteNoteLoading,
  });

  useEffect(() => {
    if (isSuccess) {
      let obj = data;
      let newObj = { ...obj };
      newObj.dateCreated = obj?.created_at;
      newObj.deadline = obj?.deadline;
      setStatusConfig(contentConfig.statusList[obj?.status]);
      setConfig(newObj);
    } else if (isGetNoteError) {
      setIsErrorModalVisible(true);
      setErrorMessage(getErrorMessage(getNoteErrorData));
    }
  }, [data, isSuccess, isGetNoteError, getNoteErrorData]);

  const [
    updateStatus,
    {
      isError: updateStatusError,
      error: updateStatusErrorData,
      isSuccess: updateStatusSuccess,
    },
  ] = useUpdateStatusMutation();

  useEffect(() => {
    if (updateStatusError) {
      setIsErrorModalVisible(true);
      setErrorMessage(getErrorMessage(updateStatusErrorData));
    } else if (updateStatusSuccess) {
      setIsSuccessVisible(true);
      setSuccessMessage({
        title: 'Note status has been updated successfully.',
        type: 'success',
      });
      setStartTimer(true);
    }
  }, [updateStatusError, updateStatusErrorData, updateStatusSuccess]);

  useEffect(() => {
    let timer;
    if (startTimer) {
      timer = setTimeout(() => {
        setIsSuccessVisible(false);
        setSuccessMessage('');
        setStartTimer(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [startTimer]);

  useEffect(() => {
    if (copiedTimer) {
      const timer = setTimeout(() => {
        setCopied(false);
        setCopiedTimer(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [copiedTimer]);

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
          }}
        >
          <Edit width={16} height={16} />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading && !deleteNoteLoading}
            onRefresh={refetch}
          />
        }
      >
        {isLoading ? (
          <NoteScreenSkeleton />
        ) : (
          <>
            <View style={styles.body}>
              {config?.description && (
                <View style={{ gap: 12 }}>
                  <View style={styles.descriptionRowHeader}>
                    <Text style={styles.sectionTitle}>DESCRIPTION</Text>
                    <Pressable
                      onPress={() => {
                        onCopyToClipboard(config?.description);
                      }}
                    >
                      <Animated.View
                        style={{
                          padding: 6,
                          transform: [{ scale: scaleAnim }],
                          opacity: successAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.85, 1],
                          }),
                        }}
                      >
                        {copied ? (
                          <SuccessTick width={18} height={18} />
                        ) : (
                          <ClipBoard
                            width={18}
                            height={18}
                            fill={copied ? '#16a34a' : '#6b7280'}
                          />
                        )}
                      </Animated.View>
                    </Pressable>
                  </View>
                  <Text
                    style={styles.description}
                    selectable={true}
                    selectionColor={statusConfig?.color}
                  >
                    {config?.description}
                  </Text>
                </View>
              )}
              <View style={styles.metaDataContainer}>
                <View style={styles.rowBig}>
                  {config?.dateCreated && (
                    <View style={{ gap: 8 }}>
                      <View style={styles.row}>
                        <CalendarIcon width={16} height={16} />
                        <Text style={styles.sectionTitle}>Created</Text>
                      </View>
                      <Text style={styles.description}>
                        {formatShortDate(config?.dateCreated)}
                        <Text style={styles.time}>
                          {' '}
                          at {formatTime(config?.dateCreated)}
                        </Text>
                      </Text>
                    </View>
                  )}
                  {config?.deadline && (
                    <View style={{ gap: 8 }}>
                      <View style={styles.row}>
                        <Timer width={16} height={16} />
                        <Text style={styles.sectionTitle}>Deadline</Text>
                      </View>
                      <Text style={styles.description}>
                        {formatShortDate(config?.deadline)}
                      </Text>
                    </View>
                  )}
                </View>
                {config?.status && (
                  <View style={{ gap: 6 }}>
                    <View style={styles.row}>
                      <Dot
                        width={8}
                        height={8}
                        color={statusConfig?.textColor}
                      />
                      <Text style={styles.sectionTitle}>Status</Text>
                    </View>
                    {statusConfig && (
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
                          style={[
                            styles.description,
                            { color: statusConfig?.textColor },
                          ]}
                        >
                          {statusConfig?.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
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
                  setIsAlertModalVisible(true);
                }}
                isLoading={deleteNoteLoading}
                loaderColor={styles.deleteButtonText.color}
              />
            </View>
          </>
        )}
      </ScrollView>
      {isSuccessVisible && (
        <ToastMessage
          message={successMessage.title}
          type={successMessage.type}
        />
      )}
      {isAddNoteVisible && (
        <AddNote
          isVisible={isAddNoteVisible}
          setIsVisible={setIsAddNoteVisible}
          type="edit"
          config={config}
          setIsSuccessVisible={setIsSuccessVisible}
          setSuccessMessage={setSuccessMessage}
          setStartTimer={setStartTimer}
        />
      )}
      {isErrorModalVisible && (
        <ErrorModal
          isErrorModalVisible={isErrorModalVisible}
          setIsErrorModalVisible={setIsErrorModalVisible}
          title={errorMessage?.title}
          description={errorMessage?.description}
          onClose={onCloseErrorModal}
        />
      )}
      {isAlertModalVisible && (
        <AlertModal
          isAlertModalVisible={isAlertModalVisible}
          setIsAlertModalVisible={setIsAlertModalVisible}
          title={'Are you sure you want to delete this note?'}
          description={'This action cannot be undone.'}
          onClose={() => setIsAlertModalVisible(false)}
          primaryButtonText={'Yes, Delete'}
          primaryButtonHandler={() => {
            deleteNote(config?.id);
          }}
          primaryButtonLoading={deleteNoteLoading}
          primaryButtonStyles={styles.deleteModalButton}
          primaryButtonTextStyles={styles.deleteModalButtonText}
          secondaryButtonText={'No, Keep it'}
          secondaryButtonHandler={() => setIsAlertModalVisible(false)}
        />
      )}
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
    flexWrap: 'wrap',
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
  scrollContainer: {
    marginBottom: 40,
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
  descriptionRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  description: {
    fontSize: 14,
    color: '#000000',
  },
  metaDataContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    gap: 16,
  },
  rowBig: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    fontWeight: '300',
    color: '#6b7280',
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
  deleteModalButton: {
    backgroundColor: '#e80015',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  deleteModalButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default NoteScreen;
