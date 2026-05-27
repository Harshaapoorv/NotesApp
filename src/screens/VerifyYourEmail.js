import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Button from '../components/Button';
import BackgroundDecorations from '../components/BackgroundDecorations.jsx';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../assets/icons/SmallBack.jsx';

const VerifyYourEmail = ({ route }) => {
  const navigation = useNavigation();
  const { email, flowType } = route.params;
  const [timer, setTimer] = React.useState(60);

  React.useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#ffffff' }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.screen}>
        <BackgroundDecorations />
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrow width={24} height={24} />
        </Pressable>
        <View style={styles.header}>
          <Text style={styles.title}>Verify your email</Text>
          <Text style={styles.description}>
            We've sent a 6-digit verification code to{' '}
            <View style={styles.emailContainer}>
              <Text style={styles.email}>{email}</Text>
            </View>
          </Text>
        </View>
        <View style={styles.footer}>
          <Button
            title="Confirm"
            variantType="primary"
            onPress={() => {}}
            additionalStyles={styles.confirmButton}
            textStyles={styles.confirmButtonText}
          />
          <Text style={styles.footerText}>
            Didn't receive the code??{' '}
            <Text
              style={styles.signUpText}
              onPress={() => {
                if (timer === 0) {
                  setTimer(60);
                  console.log('Resend code');
                }
              }}
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: 24,
    left: 24,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  header: {
    width: '100%',
    marginTop: 48,
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#667085',
    marginTop: 2,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 30,
  },
  emailContainer: {
    backgroundColor: '#EAF2FE',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  email: {
    fontWeight: '600',
    color: '#2563EB',
  },
  body: {
    paddingTop: 24,
    paddingBottom: 16,
    width: '100%',
    gap: 16,
  },
  footer: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 12,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footerText: {
    fontSize: 14,
    color: '#667085',
    marginTop: 12,
  },
  signUpText: {
    color: '#2563EB',
    fontWeight: '500',
  },
});

export default VerifyYourEmail;
