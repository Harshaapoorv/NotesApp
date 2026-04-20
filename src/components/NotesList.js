import React from 'react';
import { StyleSheet, View } from 'react-native';
import ListItem from './NotesListItem';

const NotesList = ({ list, onRefresh }) => {
  return (
    <View style={styles.container}>
      {list?.map((note, index) => (
        <ListItem key={index} config={note} onRefresh={onRefresh} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
});

export default NotesList;
