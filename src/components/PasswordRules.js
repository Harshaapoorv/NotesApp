import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import SuccessTick from '../assets/icons/SuccessTick.jsx';

import Wrong from '../assets/icons/Wrong.jsx';

const PasswordRules = ({
  passwordChecks,
  showMatchRule = false,
  passwordsMatch = false,
}) => {
  const styles = getStyles();

  return (
    <View style={styles.passwordCriteria}>
      <Text style={styles.title}>Password must contain:</Text>

      {showMatchRule && (
        <View style={styles.passwordCriteriaItem}>
          {passwordsMatch ? (
            <SuccessTick width={16} height={16} />
          ) : (
            <Wrong width={16} height={16} />
          )}

          <Text style={styles.passwordCriteriaText}>Passwords must match</Text>
        </View>
      )}

      <View style={styles.passwordCriteriaItem}>
        {passwordChecks.minLength ? (
          <SuccessTick width={16} height={16} />
        ) : (
          <Wrong width={16} height={16} />
        )}

        <Text style={styles.passwordCriteriaText}>At least 8 characters</Text>
      </View>

      <View style={styles.passwordCriteriaItem}>
        {passwordChecks.uppercase ? (
          <SuccessTick width={16} height={16} />
        ) : (
          <Wrong width={16} height={16} />
        )}

        <Text style={styles.passwordCriteriaText}>
          At least 1 uppercase letter
        </Text>
      </View>

      <View style={styles.passwordCriteriaItem}>
        {passwordChecks.lowercase ? (
          <SuccessTick width={16} height={16} />
        ) : (
          <Wrong width={16} height={16} />
        )}

        <Text style={styles.passwordCriteriaText}>
          At least 1 lowercase letter
        </Text>
      </View>

      <View style={styles.passwordCriteriaItem}>
        {passwordChecks.number ? (
          <SuccessTick width={16} height={16} />
        ) : (
          <Wrong width={16} height={16} />
        )}

        <Text style={styles.passwordCriteriaText}>At least 1 number</Text>
      </View>

      <View style={styles.passwordCriteriaItem}>
        {passwordChecks.specialCharacter ? (
          <SuccessTick width={16} height={16} />
        ) : (
          <Wrong width={16} height={16} />
        )}

        <Text style={styles.passwordCriteriaText}>
          At least 1 special character
        </Text>
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: '#111727',
      marginBottom: 6,
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
      fontSize: 12,
      color: '#4B5563',
    },
  });

export default PasswordRules;
