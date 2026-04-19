import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotesList from '../components/NotesList';
import Add from '../assets/icons/Add.jsx';
import NotesIcon from '../assets/icons/NotesIcon.jsx';
import AddNote from '../components/AddNote';

const HomeScreen = () => {
  //   const notesList = [
  //     {
  //       id: '1',
  //       title: 'Note 1',
  //       description: 'Description 1',
  //       dateCreated: '2026-04-07',
  //       deadline: '2026-04-15',
  //       status: 'pending',
  //     },
  //     {
  //       id: '2',
  //       title: 'Note 2',
  //       description: 'Description 2',
  //       dateCreated: '2026-04-07',
  //       deadline: '2026-04-15',
  //       status: 'completed',
  //     },
  //     {
  //       id: '3',
  //       title: 'Note 3',
  //       description: 'Description 3',
  //       dateCreated: '2026-04-07',
  //       deadline: '2026-04-15',
  //       status: 'progress',
  //     },
  //   ];
  const [notesList, setNotesList] = useState([]);

  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
      </View>
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
          <ScrollView
            contentContainerStyle={styles.body}
            showsVerticalScrollIndicator={false}
          >
            <NotesList list={notesList} />
          </ScrollView>
        )}
      </View>
      <Pressable
        style={styles.floaterButton}
        onPress={() => setIsAddNoteVisible(true)}
      >
        <Add width={48} height={48} color="#ffffff" />
      </Pressable>
      <AddNote
        isVisible={isAddNoteVisible}
        setIsVisible={setIsAddNoteVisible}
        notesList={notesList}
        setNotesList={setNotesList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'center',
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
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  body: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 100,
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
