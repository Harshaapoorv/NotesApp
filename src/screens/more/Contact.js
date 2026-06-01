import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import BackArrow from '../../assets/icons/Back.jsx';
import BackgroundDecorations from '../../components/BackgroundDecorations.jsx';
import { useNavigation } from '@react-navigation/native';
import LinkedIn from '../../assets/icons/LinkedIn.jsx';
import Github from '../../assets/icons/Github.jsx';
import MoreList from '../../components/MoreList.js';
import { Globe, Mail } from 'lucide-react-native';

const Contact = ({ route }) => {
  const { content } = route.params;
  const navigation = useNavigation();

  const contactConfig = [
    {
      Icon: Globe,
      title: 'Website',
      description: 'Visit my website',
      onClickHandler: () => {
        Linking.openURL(content?.portfolio);
      },
    },
    {
      Icon: Mail,
      title: 'Email',
      description: 'Send me an email',
      onClickHandler: () => {
        Linking.openURL(content?.email);
      },
    },
    {
      Icon: LinkedIn,
      title: 'LinkedIn',
      description: 'Connect with me on LinkedIn',
      onClickHandler: () => {
        Linking.openURL(content?.linkedin);
      },
    },
    {
      Icon: Github,
      title: 'Github',
      description: 'Follow me on Github',
      onClickHandler: () => {
        Linking.openURL(content?.github);
      },
    },
  ];

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
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.body}>
          <View style={styles.container}>
            <Text style={styles.title}>Contact Me</Text>
            <Text style={styles.description}>
              You can reach out to me through the following channels:
            </Text>
          </View>
          <MoreList config={contactConfig} />
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
  container: {
    gap: 8,
  },
  title: {
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
    gap: 24,
  },
});

export default Contact;
