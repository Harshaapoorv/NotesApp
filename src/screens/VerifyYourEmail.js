import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Button from '../components/Button';
import BackgroundDecorations from '../components/BackgroundDecorations.jsx';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../assets/icons/SmallBack.jsx';
import ErrorIcon from '../assets/icons/ErrorIcon.jsx';
import { useHeaderHeight } from '@react-navigation/elements';
import VerifyEmailIllustration from '../assets/icons/VerifyEmailIllustration.jsx';
import VerifySuccess from '../assets/icons/VerifySuccess.jsx';
import AllSet from '../assets/icons/AllSet.jsx';

const VerifyYourEmail = ({ route }) => {
  const navigation = useNavigation();
  const { email, flowType } = route.params;
  const [timer, setTimer] = React.useState(60);

  const [Inputs, setInput] = useState(['', '', '', '', '', '']);
  let finalInput;
  const headerHeight = useHeaderHeight();

  const count = useRef(5);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [inputChanged, setInputChanged] = useState(false);
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState();
  const [inCorrectOtp, setInCorrectOtp] = useState(false);
  const [otpResponse, setOtpResponse] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleInputChange = (index, value) => {
    if (index === 0 && value.length === 6) {
      setInput(value.split(''));
      setOtp(value);
      setButtonDisabled(false);
      inputRefs.current[5].focus();
      setFocusedIndex(null);
    } else {
      setInputChanged(true);
      const newInputs = [...Inputs];
      newInputs[index] = value.length > 1 ? value.slice(0, 1) : value;
      setInput(newInputs);
      if (value.length === 1 && index < Inputs.length - 1) {
        setFocusedIndex(index + 1);
        inputRefs.current[index + 1].focus();
      }
      finalInput = newInputs.join('');
      setOtp(finalInput);
    }
    setOtpResponse('');
    setInCorrectOtp(false);
  };
  const handleBackspacePress = (index, event) => {
    if (event.nativeEvent.key === 'Backspace') {
      if ((index > 0 && index < 5) || (index === 5 && Inputs[index] === '')) {
        const newInputs = [...Inputs];
        newInputs[index - 1] = '';
        inputRefs.current[index - 1].focus();
        setInput(newInputs);
      }
    }
  };

  const handleFocus = index => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    if (!inputChanged) {
      setFocusedIndex(null);
    } else {
      setInputChanged(false);
    }
  };

  React.useEffect(() => {
    if (otp?.length === 6 && count.current !== 0) {
      setButtonDisabled(false);
    } else if (count.current <= 0) {
      setInCorrectOtp(true);
      setOtpResponse(
        'You have exceeded the maximum number of attempts. Please request a new code.',
      );
      setButtonDisabled(true);
    } else {
      setButtonDisabled(true);
    }
  }, [otp]);

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

  const onConfirm = () => {
    if (otp !== '123456') {
      setInCorrectOtp(true);
      setButtonDisabled(true);
      setOtpResponse('The verification code you entered is incorrect.');
      count.current -= 1;
      if (count.current <= 0) {
        setOtpResponse(
          'You have exceeded the maximum number of attempts. Please request a new code.',
        );
        setButtonDisabled(true);
      }
      return;
    }
    setButtonDisabled(false);
    navigation.navigate('Success', {
      title: 'Email Verified!',
      description:
        flowType === 'reset'
          ? 'Your email has been verified successfully.\n You can now create a new password for your account.'
          : 'Your email has been verified successfully.\n Your account is ready to go.',
      onPress: () => {
        if (flowType === 'reset') {
          navigation.navigate('CreateNewPassword', { email });
        } else {
          navigation.navigate('Success', {
            title: "You're all Set!",
            description:
              'Welcome to NotesApp.\n Start creating and organizing your notes!',
            onPress: () => navigation.reset({ routes: [{ name: 'Home' }] }),
            buttonText: 'Go to Notes',
            Icon: AllSet,
          });
        }
      },
      buttonText: flowType === 'reset' ? 'Create new password' : 'Get Started',
      Icon: VerifySuccess,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
      >
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
            <View style={styles.gap16}>
              <View style={styles.header}>
                <View style={{ borderRadius: 80 }}>
                  <VerifyEmailIllustration width={220} height={180} />
                </View>

                <Text style={styles.title}>Verify your email</Text>
                <Text style={styles.description}>
                  We've sent a 6-digit verification code to{' '}
                  <View style={styles.emailContainer}>
                    <Text style={styles.email}>{email}</Text>
                  </View>
                </Text>
              </View>
              <View style={styles.otpContainer}>
                {Inputs.map((input, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      focusedIndex === index ? styles.outerFocusFiled : null,
                      styles.inputWrapper,
                    ]}
                  >
                    <TextInput
                      key={index}
                      style={[
                        styles.Inputfield,
                        styles.InputText,
                        inCorrectOtp && styles.inCorrectField,
                        focusedIndex === index ? styles.focusFiled : null,
                      ]}
                      value={input}
                      keyboardType="number-pad"
                      maxLength={index !== 0 ? 1 : 6}
                      onChangeText={value => {
                        handleInputChange(index, value);
                      }}
                      onKeyPress={event => {
                        handleBackspacePress(index, event);
                      }}
                      ref={el => (inputRefs.current[index] = el)}
                      onFocus={() => handleFocus(index)}
                      onBlur={() => handleBlur()}
                      accessibilityLabel="input"
                    />
                  </TouchableOpacity>
                ))}
              </View>
              {otpResponse && (
                <View style={styles.errorContainer}>
                  {otpResponse && (
                    <View style={styles.errorLabel}>
                      <ErrorIcon width={16} height={16} />
                      <View>
                        <Text style={[styles.otpResponseText]}>
                          {otpResponse}
                        </Text>
                        {otpResponse && count !== 0 && (
                          <Text style={[styles.otpResponseText]}>
                            You have {count.current} attempts remaining.
                          </Text>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              )}
            </View>
            <View style={styles.footer}>
              <Button
                title="Confirm"
                variantType="primary"
                onPress={() => onConfirm()}
                additionalStyles={styles.confirmButton}
                textStyles={styles.confirmButtonText}
                isDisabled={buttonDisabled}
              />
              <Text style={styles.footerText}>
                Didn't receive the code??{' '}
                <Text
                  style={styles.signUpText}
                  onPress={() => {
                    if (timer === 0) {
                      setTimer(60);
                      setInput(['', '', '', '', '', '']);
                      setOtp('');
                      setOtpResponse('');
                      setFocusedIndex(0);
                      setInputChanged(false);
                      setInCorrectOtp(false);
                      count.current = 5;
                    }
                  }}
                >
                  {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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

  // OTP styles
  keyboardView: {
    flex: 1,
  },
  gap16: {
    gap: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 4,
  },
  errorContainer: {
    marginTop: -4,
  },
  errorLabel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  otpResponseText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#B42318',
  },
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    width: 54,
  },
  Inputfield: {
    borderWidth: 1,
    height: 48,
    width: 48,
    // maxWidth: 44,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: '#D0D5DD',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputText: {
    fontSize: 16,
    color: '#111416',
  },
  inCorrectField: {
    borderColor: '#B42318',
    // backgroundColor: theme.color.date_error_background,
  },
  outerFocusFiled: {
    borderColor: '#2563EB',
    borderRadius: 10,
    alignItems: 'center',
  },
  focusFiled: {
    borderColor: '#2563EB',
    borderWidth: 3,
  },
});

export default VerifyYourEmail;
