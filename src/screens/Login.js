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

const Login = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
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
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.description}>Glad to see you again!</Text>
        </View>
        <View style={styles.body}>
          <Input
            placeholder="Email"
            additionalStyles={styles.input}
            label="Email"
            variantType="text"
            LeftIcon={Mail}
          />
          <Input
            placeholder="Password"
            label="Password"
            additionalStyles={styles.input}
            LeftIcon={Lock}
            secureTextEntry
            showPasswordToggle={showPassword}
            setShowPassword={setShowPassword}
            variantType="text"
          />
          <Text style={styles.forgotPasswordText} onPress={() => {}}>
            Forgot your password?
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.buttonsContainer}>
            <Button
              title="Log In"
              variantType="primary"
              onPress={() => navigation.reset({ routes: [{ name: 'Home' }] })}
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
            Don't have an account?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign Up
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
    marginTop: 80,
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
  forgotPasswordText: {
    alignSelf: 'flex-end',
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    width: '100%',
    gap: 24,
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
    marginTop: 8,
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

export default Login;
