import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import BackArrow from '../assets/icons/SmallBack.jsx';
import Button from '../components/Button';
import Google from '../assets/icons/Google.jsx';
import BackgroundDecorations from '../components/BackgroundDecorations.jsx';
import Input from '../components/Input.js';
import { useNavigation } from '@react-navigation/native';
import Mail from '../assets/icons/Mail.jsx';
import Lock from '../assets/icons/Lock.jsx';
import SuccessTick from '../assets/icons/SuccessTick.jsx';
import Profile from '../assets/icons/Profile.jsx';

const SignUp = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.description}>Let's get you set up!</Text>
        </View>
        <View style={styles.body}>
          <Input
            placeholder="Enter your full name"
            additionalStyles={styles.input}
            label="Full Name"
            variantType="text"
            LeftIcon={Profile}
          />
          <Input
            placeholder="Enter your email"
            additionalStyles={styles.input}
            label="Email"
            variantType="text"
            LeftIcon={Mail}
          />
          <Input
            placeholder="Create a password"
            label="Password"
            additionalStyles={styles.input}
            LeftIcon={Lock}
            secureTextEntry
            showPasswordToggle={showPassword}
            setShowPassword={setShowPassword}
            variantType="text"
          />
          <Input
            placeholder="Confirm your password"
            label="Confirm Password"
            additionalStyles={styles.input}
            LeftIcon={Lock}
            secureTextEntry
            showPasswordToggle={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            variantType="text"
          />
          <View style={styles.passwordCriteria}>
            <View style={styles.passwordCriteriaItem}>
              <SuccessTick width={16} height={16} />
              <Text style={styles.passwordCriteriaText}>
                At least 8 characters
              </Text>
            </View>
            <View style={styles.passwordCriteriaItem}>
              <SuccessTick width={16} height={16} />

              <Text style={styles.passwordCriteriaText}>
                One uppercase letter
              </Text>
            </View>
            <View style={styles.passwordCriteriaItem}>
              <SuccessTick width={16} height={16} />

              <Text style={styles.passwordCriteriaText}>
                One number or special character
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.buttonsContainer}>
            <Button
              title="Create Account"
              variantType="primary"
              onPress={() =>
                navigation.navigate('VerifyYourEmail', {
                  email: 'harsha@gmail.com',
                  flowType: 'signUp',
                })
              }
              additionalStyles={styles.loginButton}
              textStyles={styles.loginButtonText}
            />
          </View>
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or continue with</Text>
            <View style={styles.line} />
          </View>
          <Button
            title="Continue with Google"
            variantType="secondary"
            LeftIcon={Google}
            onPress={() => {}}
            additionalStyles={styles.googleButton}
            textStyles={styles.googleButtonText}
          />
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('Login')}
            >
              Log In
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
    alignItems: 'flex-start',
    gap: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    color: '#667085',
    marginTop: 2,
    fontWeight: '500',
  },
  body: {
    paddingTop: 24,
    paddingBottom: 16,
    width: '100%',
    gap: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  passwordCriteria: {
    width: '100%',
    marginBottom: 8,
    gap: 8,
    alignItems: 'flex-start',
  },
  passwordCriteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  passwordCriteriaText: {
    fontSize: 14,
    color: '#4B5563',
  },
  footer: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  loginButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginTop: 4,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    fontSize: 12,
    color: '#667085',
    fontWeight: '500',
  },
  googleButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  googleButtonText: {
    fontSize: 14,
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

export default SignUp;
