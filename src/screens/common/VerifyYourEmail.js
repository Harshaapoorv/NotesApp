import React, { useState, useRef, useCallback } from 'react';
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

import Button from '../../components/Button.js';
import BackgroundDecorations from '../../components/BackgroundDecorations.jsx';

import { useNavigation } from '@react-navigation/native';

import BackArrow from '../../assets/icons/SmallBack.jsx';
import ErrorIcon from '../../assets/icons/ErrorIcon.jsx';

import { useHeaderHeight } from '@react-navigation/elements';
import VerifyEmailIllustration from '../../assets/icons/VerifyEmailIllustration.jsx';
import VerifySuccess from '../../assets/icons/VerifySuccess.jsx';

import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from '../../services/authApi.js';

import { setCredentials } from '../../redux/slices/authSlice.js';

import { saveRefreshToken } from '../../shared/auth/authStorage.js';

import { useDispatch } from 'react-redux';

const MAX_ATTEMPTS = 5;

const ERROR_MAP = {
  'OTP expired': 'The verification code has expired. Please resend.',

  'Invalid OTP': 'The verification code you entered is incorrect.',

  'OTP not found': 'Verification code not found. Please resend.',

  'Maximum attempts exceeded':
    'Maximum attempts exceeded. Please resend a new code.',
};

const VerifyYourEmail = ({ route }) => {
  const navigation = useNavigation();

  const { email, flowType, purpose } = route.params;

  const [timer, setTimer] = React.useState(60);

  const dispatch = useDispatch();

  const [Inputs, setInput] = useState(['', '', '', '', '', '']);

  let finalInput;

  const headerHeight = useHeaderHeight();

  const count = useRef(MAX_ATTEMPTS);

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
    if (otp?.length === 6) {
      setButtonDisabled(false);
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

  const [verifyOtpApi, { isLoading }] = useVerifyOtpMutation();

  const [resendOtpApi, { isLoading: resendLoading }] = useResendOtpMutation();

  const onConfirm = useCallback(async () => {
    if (otp) {
      try {
        const response = await verifyOtpApi({
          email,
          otp,
          purpose,
        }).unwrap();

        if (flowType === 'signUp') {
          navigation.navigate('Success', {
            title: 'Email Verified!',

            description:
              'Your email has been verified successfully.\n Your account is ready to go.',

            onPress: () => {
              saveRefreshToken(response?.refresh_token);

              dispatch(
                setCredentials({
                  accessToken: response?.access_token,

                  user: response?.user,
                }),
              );
            },

            buttonText: 'Go to Notes',

            Icon: VerifySuccess,
          });
        } else if (flowType === 'reset') {
          navigation.navigate('Success', {
            title: 'Email Verified!',

            description:
              'Your email has been verified successfully.\n You can now create a new password for your account.',

            onPress: () => {
              navigation.navigate('CreateNewPassword', {
                reset_token: response?.reset_token,
              });
            },

            buttonText: 'Create new password',

            Icon: VerifySuccess,

            canGoBack: true,
          });
        }
      } catch (err) {
        if (err?.status === 401) {
          return;
        }

        const backendMessage = err?.data?.detail;

        setInCorrectOtp(true);

        setOtpResponse(
          ERROR_MAP[backendMessage] ||
            backendMessage ||
            'Something went wrong.',
        );

        if (backendMessage === 'Invalid OTP') {
          count.current = Math.max(count.current - 1, 0);
        }

        return;
      }
    }
  }, [verifyOtpApi, otp]);

  const onResendOtp = useCallback(async () => {
    try {
      await resendOtpApi({
        email,
        purpose,
      }).unwrap();

      setTimer(60);

      setInput(['', '', '', '', '', '']);

      setOtp('');

      setOtpResponse('');

      setFocusedIndex(0);

      setInputChanged(false);

      setInCorrectOtp(false);

      count.current = MAX_ATTEMPTS;
    } catch (err) {
      setOtpResponse(err?.data?.detail || 'Failed to resend OTP');

      setInCorrectOtp(true);
    }
  }, [email, purpose]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          style={{
            backgroundColor: '#ffffff',
          }}
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
                  <View style={styles.errorLabel}>
                    <ErrorIcon width={16} height={16} />

                    <View style={{ width: '90%' }}>
                      <Text style={[styles.otpResponseText]}>
                        {otpResponse}
                      </Text>

                      {count.current >= 0 &&
                        otpResponse === ERROR_MAP['Invalid OTP'] && (
                          <Text style={[styles.otpResponseText]}>
                            You have {count.current} attempts remaining.
                          </Text>
                        )}
                    </View>
                  </View>
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
                isLoading={isLoading}
              />

              <Text style={styles.footerText}>
                Didn't receive the code?{' '}
                <Text
                  style={styles.signUpText}
                  onPress={() => {
                    if (timer === 0 && !resendLoading) {
                      onResendOtp();
                    }
                  }}
                >
                  {timer > 0
                    ? `Resend in ${timer}s`
                    : resendLoading
                    ? 'Resending...'
                    : 'Resend Code'}
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

  keyboardView: {
    flex: 1,
  },

  gap16: {
    gap: 16,
    alignItems: 'center',
  },

  otpContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 4,
  },

  errorContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: -4,
  },

  errorLabel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },

  otpResponseText: {
    width: '80%',
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
