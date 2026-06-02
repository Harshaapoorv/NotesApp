import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoreScreenSkeleton from '../../components/MoreScreenSkeleton.js';
import ErrorModal from '../../components/ErrorModal.js';
import { notesApi } from '../../services/notesApi.js';
import { authApi } from '../../services/authApi.js';
import { appApi } from '../../services/appApi.js';
import { userApi } from '../../services/userApi.js';
import { logout } from '../../redux/slices/authSlice.js';
import { clearRefreshToken } from '../../shared/auth/authStorage.js';
import { useDispatch } from 'react-redux';
import ProfileCard from '../../components/ProfileCard.js';
import { useGetProfileQuery } from '../../services/userApi.js';
import { useGetAppContentQuery } from '../../services/appApi.js';
import Contact from '../../assets/icons/Contact.jsx';
import Logout from '../../assets/icons/Logout.jsx';
import About from '../../assets/icons/About.jsx';
import Privacy from '../../assets/icons/Privacy.jsx';
import MoreList from '../../components/MoreList.js';
import Google from '../../assets/icons/Google.jsx';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

const appVersion = DeviceInfo.getVersion();
const buildNumber = DeviceInfo.getBuildNumber();

const MoreScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { data: user, isLoading } = useGetProfileQuery();

  const { data: appContent, isLoading: isAppContentLoading } =
    useGetAppContentQuery();

  const isGoogleUser = user?.google_id;

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onCloseErrorModal = () => {
    setIsErrorModalVisible(false);
    setErrorMessage('');
  };

  const moreConfig = [
    {
      Icon: Contact,
      title: 'Contact me',
      description: 'Visit my website or contact me on social media',
      onClickHandler: () => {
        navigation.navigate('Contact', {
          content: appContent?.contact,
        });
      },
    },
    {
      Icon: About,
      title: 'About',
      description: 'Learn more about the app and its features',
      onClickHandler: () => {
        navigation.navigate('Content', {
          content: appContent?.about,
        });
      },
    },
    {
      Icon: Privacy,
      title: 'Privacy Policy',
      description: 'Read our privacy policy',
      onClickHandler: () => {
        navigation.navigate('Content', {
          content: appContent?.privacy_policy,
        });
      },
    },
  ];

  const logoutConfig = [
    {
      Icon: Logout,
      title: 'Logout',
      description:
        'Sign out from this device. You can always log back in later.',
      onClickHandler: () => handleLogout(),
    },
  ];

  const switchGoogleAccount = async () => {
    try {
      await GoogleSignin.revokeAccess();

      await GoogleSignin.signOut();

      await clearRefreshToken();

      dispatch(logout());

      dispatch(notesApi.util.resetApiState());

      dispatch(authApi.util.resetApiState());

      dispatch(appApi.util.resetApiState());

      dispatch(userApi.util.resetApiState());
    } catch (error) {
      setErrorMessage({
        title: 'Unable to Switch Account',
        description:
          'Something went wrong while switching your Google account. Please try logging out and signing in again.',
      });

      setIsErrorModalVisible(true);
    }
  };

  const switchGoogleConfig = [
    {
      Icon: Google,
      title: 'Switch Google Account',
      description: 'Sign out and log in with a different Google account',
      onClickHandler: () => switchGoogleAccount(),
    },
  ];

  const handleLogout = async () => {
    await clearRefreshToken();

    dispatch(logout());

    dispatch(notesApi.util.resetApiState());

    dispatch(authApi.util.resetApiState());

    dispatch(appApi.util.resetApiState());

    dispatch(userApi.util.resetApiState());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>More</Text>
      </View>
      {isLoading || isAppContentLoading ? (
        <MoreScreenSkeleton style={styles.skeletonContainer} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.body}>
            <ProfileCard user={user} />
            <MoreList config={moreConfig} />
            {isGoogleUser && <MoreList config={switchGoogleConfig} />}
            <MoreList config={logoutConfig} />
            <View style={styles.footerContainer}>
              <Text style={styles.versionText}>
                NotesApp V{appVersion} ({buildNumber})
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
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
  skeletonContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
  },
  scrollContainer: {
    backgroundColor: '#F9FAFB',
    flexGrow: 1,
  },
  body: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
  },
  footerContainer: {
    marginTop: 32,
    marginBottom: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#98A2B3',
    fontWeight: '500',
    lineHeight: 16,
  },
});

export default MoreScreen;
