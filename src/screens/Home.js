import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../components/NotesListItem';
import Add from '../assets/icons/Add.jsx';
import NotesIcon from '../assets/icons/NotesIcon.jsx';
import AddNote from '../components/AddNote';
import {
  useGetNotesQuery,
  useUpdateStatusMutation,
  useUpdateStarMutation,
} from '../services/notesApi';
import HomeScreenSkeleton from '../components/HomeScreenSkeleton.js';
import ErrorModal from '../components/ErrorModal.js';
import getErrorMessage from '../services/apiErrorHandler.js';
import ToastMessage from '../components/ToastMessage.js';
import { useRoute, useNavigation } from '@react-navigation/native';
import Export from '../assets/icons/Export.jsx';
import Filters from '../assets/icons/Filters.jsx';
import { exportNotesToExcel } from '../shared/exportNotesToExcel';

const HomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    if (route?.params?.isSuccessVisible) {
      setIsSuccessVisible(true);
      setSuccessMessage(route.params?.successMessage);
      setStartTimer(true);

      // Clear params after showing
      navigation.setParams({
        isSuccessVisible: false,
        successMessage: null,
      });
    }
  }, [route?.params]);

  const onCloseErrorModal = () => {
    setIsErrorModalVisible(false);
    setErrorMessage('');
  };

  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetNotesQuery();

  const notesList = data || [];

  useEffect(() => {
    if (isError) {
      setIsErrorModalVisible(true);
      setErrorMessage(getErrorMessage(error));
    }
  }, [isError, error]);

  const [updateStatus] = useUpdateStatusMutation();

  const [updateStar] = useUpdateStarMutation();

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

  const handleUpdateStar = useCallback(
    async ({ id, is_starred }) => {
      try {
        const response = await updateStar({
          id,
          is_starred,
        }).unwrap();

        setIsSuccessVisible(true);

        setSuccessMessage({
          title: response?.message,
          type: 'success',
        });

        setStartTimer(true);
      } catch (err) {
        setIsErrorModalVisible(true);
        setErrorMessage(getErrorMessage(err));
      }
    },
    [updateStar],
  );

  const handleUpdateStatus = useCallback(
    async id => {
      try {
        await updateStatus(id).unwrap();

        setIsSuccessVisible(true);
        setSuccessMessage({
          title: 'Note status has been updated successfully.',
          type: 'success',
        });
        setStartTimer(true);
      } catch (err) {
        setIsErrorModalVisible(true);
        setErrorMessage(getErrorMessage(err));
      }
    },
    [updateStatus],
  );

  const handleOpenNote = useCallback(
    id => {
      navigation.navigate('Note', { id });
    },
    [navigation],
  );

  const handleExportExcel = async () => {
    if (notesList.length > 0) {
      await exportNotesToExcel(
        notesList,
        setIsErrorModalVisible,
        setErrorMessage,
      );
    } else {
      setIsErrorModalVisible(true);
      setErrorMessage({
        title: 'Error',
        description: 'There are no notes to export',
      });
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <ListItem
          config={item}
          updateStatus={handleUpdateStatus}
          updateStar={handleUpdateStar}
          openNote={handleOpenNote}
        />
      );
    },
    [handleUpdateStatus, handleUpdateStar, handleOpenNote],
  );

  const keyExtractor = useCallback(item => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => console.log('Filters')}>
          <Filters width={24} height={24} />
        </Pressable>
        <Text style={styles.title}>Notes</Text>
        <Pressable onPress={() => handleExportExcel()}>
          <Export width={24} height={24} />
        </Pressable>
      </View>
      {isLoading ? (
        <View style={styles.scrollContainer}>
          <HomeScreenSkeleton style={styles.skeletonContainer} />
        </View>
      ) : (
        <>
          <View style={styles.scrollContainer}>
            {notesList?.length === 0 ? (
              <View style={styles.emptyBody}>
                <View style={styles.roundButton}>
                  <NotesIcon width={64} height={64} />
                </View>
                <Text style={styles.emptyBodyTitle}>No notes yet</Text>
                <Text style={styles.emptyBodyText}>
                  Create your first note to get started!
                </Text>
              </View>
            ) : (
              <FlatList
                data={notesList}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={10}
                updateCellsBatchingPeriod={100}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.body}
                refreshControl={
                  <RefreshControl
                    refreshing={isFetching && !isLoading}
                    onRefresh={refetch}
                  />
                }
              />
            )}
          </View>
          <Pressable
            style={styles.floaterButton}
            onPress={() => setIsAddNoteVisible(true)}
          >
            <Add width={48} height={48} color="#ffffff" />
          </Pressable>
          {isSuccessVisible && (
            <ToastMessage
              message={successMessage.title}
              type={successMessage.type}
            />
          )}
        </>
      )}
      <AddNote
        type="create"
        isVisible={isAddNoteVisible}
        setIsVisible={setIsAddNoteVisible}
        setIsSuccessVisible={setIsSuccessVisible}
        setSuccessMessage={setSuccessMessage}
        setStartTimer={setStartTimer}
      />
      <ErrorModal
        isErrorModalVisible={isErrorModalVisible}
        setIsErrorModalVisible={setIsErrorModalVisible}
        title={errorMessage?.title}
        description={errorMessage?.description}
        onClose={onCloseErrorModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  skeletonContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  body: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
  },
  emptyBody: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  roundButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBodyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111828',
  },
  emptyBodyText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#7C8590',
  },
  floaterButton: {
    backgroundColor: '#165dfc',
    position: 'absolute',
    bottom: 48,
    right: 24,
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
