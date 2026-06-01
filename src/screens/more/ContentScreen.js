import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import BackArrow from '../../assets/icons/Back.jsx';
import BackgroundDecorations from '../../components/BackgroundDecorations.jsx';
import { useNavigation } from '@react-navigation/native';

const ContentScreen = ({ route }) => {
  const { content } = route.params;
  const navigation = useNavigation();

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
        <BackgroundDecorations />
        <Text style={styles.title}>{content?.title}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.body}>
          {content?.body.map((obj, index) => {
            switch (obj.type) {
              case 'text':
                return (
                  <View key={index} style={styles.section}>
                    <Text style={styles.sectionTitle}>{obj.heading}</Text>
                    <Text style={styles.sectionContent}>{obj.content}</Text>
                  </View>
                );
              case 'link':
                return (
                  <View key={index} style={styles.section}>
                    <Text style={styles.sectionTitle}>{obj.heading}</Text>
                    <Pressable
                      key={index}
                      onPress={() => Linking.openURL(obj.content.url)}
                    >
                      <Text style={[styles.sectionContent, styles.linkText]}>
                        {obj.content.label}
                      </Text>
                    </Pressable>
                  </View>
                );
              case 'bulletpoints':
                return (
                  <View key={index} style={styles.section}>
                    <Text style={styles.sectionTitle}>{obj.heading}</Text>
                    <View style={styles.bulletPoints}>
                      {obj.content.map((point, idx) => (
                        <View key={idx} style={styles.bulletPoint}>
                          <View style={styles.dot} />
                          <Text style={styles.bulletPointText}>{point}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                );
              default:
                return null;
            }
          })}
        </View>
      </ScrollView>
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
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    width: '88%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  scrollContainer: {
    flexGrow: 1,
    marginBottom: 48,
  },
  body: {
    padding: 16,
    paddingTop: 24,
    gap: 16,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 22,
  },
  sectionContent: {
    fontSize: 14,
    color: '#353535',
    padding: 8,
    lineHeight: 20,
  },
  bulletPoints: {
    padding: 8,
    gap: 4,
  },
  bulletPoint: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#111827',
    marginTop: 6,
  },
  bulletPointText: {
    fontSize: 14,
    color: '#353535',
    lineHeight: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
});

export default ContentScreen;
