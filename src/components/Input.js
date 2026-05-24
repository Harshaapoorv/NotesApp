import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import CalendarIcon from '../assets/icons/CalendarIcon.jsx';
import Expand from '../assets/icons/Expand.jsx';
import Collapse from '../assets/icons/Collapse.jsx';
import { formatDateForAPI, formatShortDate } from '../shared/date.js';
import Info from '../assets/icons/Info.jsx';

const Input = ({
  variantType = 'text',
  label,
  placeholder,
  value,
  onChangeText,
  additionalStyles,
  isRequired = false,
  type,
  keypad,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  optionList = [],
  onPressOption,
  formatter,
  formatterOptionsList,
  handleFormatterSelection,
  tooltip,
  onToolTipPress,
  selection,
  onSelectionChange,
  selectedType,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const showDatePickerModal = () => {
    return (
      <Modal
        isVisible={showDateModal}
        onBackdropPress={() => setShowDateModal(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>Select Deadline</Text>
          <View style={styles.quickRow}>
            <Text
              onPress={() => {
                onChangeText(new Date());
                setShowDateModal(false);
              }}
            >
              Today
            </Text>
            <Text
              onPress={() => {
                const d = new Date();
                d.setDate(d.getDate() + 1);
                onChangeText(d);
                setShowDateModal(false);
              }}
            >
              Tomorrow
            </Text>
          </View>
          <Calendar
            onDayPress={day => {
              const selected = new Date(day.timestamp);
              onChangeText(selected);
              setShowDateModal(false);
            }}
            markedDates={
              value
                ? {
                    [formatDateForAPI(value)]: {
                      selected: true,
                      selectedColor: '#2563eb',
                    },
                  }
                : {}
            }
          />
        </View>
      </Modal>
    );
  };

  const renderInput = () => {
    switch (variantType) {
      case 'text':
        return (
          <>
            <View
              style={[styles.inputBorder, isInputFocused && styles.focused]}
            >
              <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={[
                  styles.input,
                  formatter && styles.formatterInput,
                  additionalStyles,
                ]}
                keyboardType={keypad}
                maxLength={maxLength}
                textContentType={type}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical="top"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                selection={selection || undefined}
                onSelectionChange={
                  onSelectionChange
                    ? e => onSelectionChange(e.nativeEvent.selection)
                    : undefined
                }
              />
              {formatter && (
                <View style={styles.formatter}>
                  {formatterOptionsList.map((item, index) => {
                    const Icon = item.Icon;

                    const isSelected = selectedType === item.type;

                    return (
                      <Pressable
                        key={index}
                        onPress={() => handleFormatterSelection(item.type)}
                      >
                        <Icon
                          width={16}
                          height={16}
                          fill={isSelected ? '#165DFC' : '#000000'}
                        />
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
            {maxLength && (
              <Text style={styles.charCount}>
                {maxLength ? `${value?.length}/${maxLength}` : value?.length}
              </Text>
            )}
          </>
        );
      case 'dropdown':
        // Implement dropdown logic here
        return (
          <View style={styles.dropdownWrapper}>
            <View
              style={[
                styles.input,
                styles.inputBorder,
                additionalStyles,
                showDropdown && {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setShowDropdown(!showDropdown);
                  onPressOption();
                }}
              >
                <View style={styles.dropdown}>
                  <Text
                    style={[
                      styles.dropdownPlaceholder,
                      value && styles.selectedValue,
                    ]}
                  >
                    {value?.label ? value?.label : value ? value : placeholder}
                  </Text>
                  {showDropdown ? (
                    <Collapse width={16} height={16} />
                  ) : (
                    <Expand width={16} height={16} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
            {showDropdown && (
              <View style={[styles.dropdownOptionsContainer]}>
                {optionList.map((option, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      onChangeText(option);
                      setShowDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownOption,
                        optionList?.length - 1 === index && styles.lastOption,
                      ]}
                    >
                      {option.label ? option.label : option}
                    </Text>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            )}
          </View>
        );
      case 'date':
        return (
          <TouchableOpacity onPress={() => setShowDateModal(true)}>
            <View style={[styles.input, styles.inputBorder]}>
              <View style={styles.dropdown}>
                <Text style={{ color: value ? '#000' : '#9ca3af' }}>
                  {value ? formatShortDate(value) : 'Select deadline'}
                </Text>
                <CalendarIcon width={18} height={18} />
              </View>
            </View>
            {showDatePickerModal()}
          </TouchableOpacity>
        );
      default:
        return (
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={[styles.input, styles.inputBorder, additionalStyles]}
            keyboardType={keypad}
            textContentType={type}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
          />
        );
    }
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputHeader}>
        <View style={styles.labelContainer}>
          {label && <Text style={styles.label}>{`${label}`}</Text>}
          {isRequired && <Text style={styles.required}>*</Text>}
        </View>
        {tooltip && (
          <View>
            <Pressable onPress={onToolTipPress}>
              <Info width={16} height={16} />
            </Pressable>
          </View>
        )}
      </View>

      {renderInput()}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
  inputHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#353535',
  },
  required: {
    color: '#E80015',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#353535',
  },
  focused: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  inputBorder: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  formatter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  formatterInput: {
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  charCount: {
    alignSelf: 'flex-end',
    marginRight: 8,
    marginTop: 4,
    fontSize: 12,
    color: '#9ca3af',
  },
  dropdownWrapper: {
    width: '100%',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownPlaceholder: {
    color: '#9ca3af',
  },
  selectedValue: {
    color: '#353535',
  },
  dropdownOptionsContainer: {
    width: '100%',
    bottom: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.25,
  },
  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
});

export default Input;
