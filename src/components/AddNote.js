import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
  Platform,
  Animated,
} from 'react-native';
import uuid from 'react-native-uuid';
import Button from './Button';
import Close from '../assets/icons/Close.jsx';
import Input from './Input';
import contentConfig from '../assets/json/content.json';
import {
  useUpdateNoteMutation,
  useCreateNoteMutation,
} from '../services/notesApi.js';
import ErrorModal from '../components/ErrorModal.js';
import getErrorMessage from '../services/apiErrorHandler.js';
import Clipboard from '@react-native-clipboard/clipboard';
import Bold from '../assets/icons/FormatterIcons/Bold.jsx';
import Italic from '../assets/icons/FormatterIcons/Italic.jsx';
import Code from '../assets/icons/FormatterIcons/Code.jsx';
import LinkSvg from '../assets/icons/FormatterIcons/Link.jsx';
import NumberedList from '../assets/icons/FormatterIcons/NumberedList.jsx';
import Quote from '../assets/icons/FormatterIcons/Quote.jsx';
import UnOrderedList from '../assets/icons/FormatterIcons/UnOrderedList.jsx';
import Heading from '../assets/icons/FormatterIcons/Heading.jsx';
import Expand from '../assets/icons/Expand.jsx';
import Sparkle from '../assets/icons/Sparkle.jsx';
import Collapse from '../assets/icons/Collapse.jsx';

const AddNote = ({
  isVisible,
  setIsVisible,
  type,
  config,
  setIsSuccessVisible,
  setSuccessMessage,
  setStartTimer,
}) => {
  const examplesConfig = contentConfig.examplesConfig;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState();
  const [deadline, setDeadline] = useState();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isPrePopulated, setIsPrePopulated] = useState(false);

  const [showFormattingGuide, setShowFormattingGuide] = useState(false);
  const [expandFormattingGuide, setExpandFormattingGuide] = useState(false);
  const [selectedType, setSelectedType] = useState('bold');
  const [selectedConfig, setSelectedConfig] = useState(
    examplesConfig[selectedType],
  );

  const modalTranslateY = useRef(new Animated.Value(0)).current;

  const statusConfig = contentConfig.statusList;

  const onCopyToClipboard = text => {
    Clipboard.setString(text);
  };

  useEffect(() => {
    if (type === 'edit' && !isPrePopulated) {
      setTitle(config?.title || '');
      setDescription(config?.description || '');
      setStatus(statusConfig[config?.status]);
      setDeadline(config?.deadline ? new Date(config.deadline) : null);

      setIsPrePopulated(true);
    }
  }, [isVisible, config]);

  useEffect(() => {
    setIsButtonDisabled(!title?.trim());
  }, [title]);

  useEffect(() => {
    const keyboardShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        const keyboardHeight = e.endCoordinates.height;

        let shift = keyboardHeight * 0.42;

        if (showFormattingGuide) {
          shift = keyboardHeight * 0.52;
        }

        if (expandFormattingGuide) {
          shift = keyboardHeight * 0.15;
        }

        Animated.timing(modalTranslateY, {
          toValue: -shift,
          duration: e.duration || 250,
          useNativeDriver: true,
        }).start();
      },
    );

    const keyboardHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      e => {
        Animated.timing(modalTranslateY, {
          toValue: 0,
          duration: e.duration || 250,
          useNativeDriver: true,
        }).start();
      },
    );

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, [showFormattingGuide, expandFormattingGuide]);

  const onReset = () => {
    setTitle('');
    setDescription('');
    setStatus();
    setDeadline();

    setIsButtonDisabled(true);
    setIsErrorModalVisible(false);
    setErrorMessage('');

    setShowFormattingGuide(false);
    setExpandFormattingGuide(false);

    setSelectedType('bold');
    setSelectedConfig(examplesConfig[selectedType]);

    setIsVisible(false);
    setIsPrePopulated(false);

    Keyboard.dismiss();
  };

  const [
    createNote,
    {
      isSuccess: createNoteSuccess,
      isLoading: createNoteLoading,
      isError: isCreateNoteError,
      error: createNoteErrorData,
    },
  ] = useCreateNoteMutation();

  const [
    updateNote,
    {
      isSuccess: updateNoteSuccess,
      isError: isUpdateNoteError,
      error: updateNoteErrorData,
      isLoading: updateNoteLoading,
    },
  ] = useUpdateNoteMutation();

  const onCloseErrorModal = () => {
    setIsErrorModalVisible(false);
    setErrorMessage('');
  };

  useEffect(() => {
    if (createNoteSuccess || updateNoteSuccess) {
      onReset();

      setIsSuccessVisible(true);
      setStartTimer(true);

      setSuccessMessage({
        title: updateNoteSuccess
          ? 'Note has been updated successfully.'
          : 'Note has been created successfully.',
        type: 'success',
      });
    }

    if (isCreateNoteError || isUpdateNoteError) {
      if (isCreateNoteError) {
        setErrorMessage(getErrorMessage(createNoteErrorData));
      }

      if (isUpdateNoteError) {
        setErrorMessage(getErrorMessage(updateNoteErrorData));
      }

      setIsErrorModalVisible(true);
    }
  }, [
    createNoteSuccess,
    updateNoteSuccess,
    isCreateNoteError,
    isUpdateNoteError,
  ]);

  const onCreateNote = () => {
    let newNote = {
      title,
      description,
      status: status?.value ? status.value : status,
      deadline,
    };

    if (type === 'edit') {
      newNote = {
        id: config?.id ? config.id : uuid.v4(),
        title,
        description,
        status: status?.value ? status.value : status,
        deadline,
      };

      updateNote(newNote);
    }

    if (type === 'create') {
      createNote(newNote);
    }
  };

  const onTooltipPress = () => {
    setShowFormattingGuide(prev => !prev);
  };

  const handlePress = type => {
    let newVal = description || '';

    if (type === 'bold') {
      newVal += ' **bold content here** ';
    }

    if (type === 'italic') {
      newVal += ' *italic content here* ';
    }

    if (type === 'link') {
      newVal += ' https://your-link.com ';
    }

    if (type === 'link-www') {
      newVal += ' www.your-link.com ';
    }

    if (type === 'customLink') {
      newVal += ' <<your-link>> ';
    }

    if (type === 'quote') {
      newVal += description?.length
        ? '\n<Your quote goes here>\n'
        : '<Your quote goes here>\n';
    }

    if (type === 'heading') {
      newVal += description?.length ? '\n# Heading 1\n' : '# Heading 1\n';
    }

    if (type === 'heading2') {
      newVal += description?.length ? '\n## Heading 2\n' : '## Heading 2\n';
    }

    if (type === 'heading3') {
      newVal += description?.length ? '\n### Heading 3\n' : '### Heading 3\n';
    }

    if (type === 'ol') {
      newVal += description?.length
        ? '\n1. List item\n2. List item\n3. List item\n'
        : '1. List item\n2. List item\n3. List item\n';
    }

    if (type === 'ul') {
      newVal += description?.length
        ? '\n- List item\n- List item\n- List item\n'
        : '- List item\n- List item\n- List item\n';
    }

    if (type === 'code') {
      newVal += description?.length
        ? '\n```\n// Your code goes here\n```\n'
        : '```\n// Your code goes here\n```\n';
    }

    if (type === 'codefile') {
      newVal += description?.length
        ? '\n```filetype\n// Your code goes here\n```\n'
        : '```filetype\n// Your code goes here\n```\n';
    }

    setDescription(newVal);
  };

  const formatterOptionsList = [
    {
      icon: (
        <Bold
          width={16}
          height={16}
          fill={selectedType === 'bold' ? '#165DFC' : '#000000'}
        />
      ),
      type: 'bold',
      text: 'Bold',
    },
    {
      icon: (
        <Italic
          width={16}
          height={16}
          fill={selectedType === 'italic' ? '#165DFC' : '#000000'}
        />
      ),
      type: 'italic',
      text: 'Italic',
    },
    {
      icon: (
        <LinkSvg
          width={16}
          height={16}
          fill={selectedType === 'link' ? '#165DFC' : '#000000'}
        />
      ),
      type: 'link',
      text: 'Link',
    },
    {
      icon: (
        <Quote
          width={16}
          height={16}
          fill={selectedType === 'quote' ? '#165DFC' : '#000000'}
        />
      ),
      type: 'quote',
      text: 'Quote',
    },
    {
      icon: (
        <Heading
          width={16}
          height={16}
          fill={selectedType === 'heading' ? '#165DFC' : '#000000'}
        />
      ),
      type: 'heading',
      text: 'Heading',
    },
    {
      icon: (
        <UnOrderedList
          width={16}
          height={16}
          fill={selectedType === 'ul' ? '#165DFC' : '#000000'}
        />
      ),
      type: 'ul',
      text: 'List',
    },
    {
      icon: (
        <NumberedList
          width={16}
          height={16}
          fill={selectedType === 'ol' ? '#165DFC' : '#000000'}
        />
      ),
      type: 'ol',
      text: 'Numbered',
    },
    {
      icon: (
        <Code
          width={16}
          height={16}
          fill={selectedType === 'code' ? '#165DFC' : '#000000'}
        />
      ),
      type: 'code',
      text: 'Code',
    },
  ];

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onReset}
    >
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  maxHeight: expandFormattingGuide ? '88%' : '75%',
                  minHeight: expandFormattingGuide ? '88%' : '75%',
                  transform: [
                    {
                      translateY: modalTranslateY,
                    },
                  ],
                },
              ]}
            >
              <Close
                width={24}
                height={24}
                style={styles.closeIcon}
                onPress={onReset}
              />

              {/* HEADER */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {type === 'edit' ? 'Edit Note' : 'Create New Note'}
                </Text>

                <Text style={styles.modalTitleDesc}>
                  {type === 'edit'
                    ? title
                    : 'Fill in the details for your new note:'}
                </Text>
              </View>

              {/* BODY */}
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                bounces={false}
              >
                <View style={styles.modalBody}>
                  <Input
                    label={'Title'}
                    placeholder={'Enter note title...'}
                    value={title}
                    onChangeText={setTitle}
                    isRequired
                    maxLength={30}
                  />

                  <Input
                    label={'Description'}
                    placeholder={'Write notes, code, lists, links...'}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={10}
                    additionalStyles={{
                      minHeight: 120,
                      maxHeight: 200,
                    }}
                    formatter
                    formatterOptionsList={formatterOptionsList}
                    tooltip
                    onToolTipPress={onTooltipPress}
                    handleFormatterSelection={handlePress}
                  />

                  {showFormattingGuide && (
                    <View
                      style={[
                        styles.formatContainer,
                        expandFormattingGuide && styles.focusedFormatContainer,
                      ]}
                    >
                      <View style={styles.formattingGuideContainer}>
                        <View style={styles.guideLeftSection}>
                          <Sparkle width={16} height={16} fill={'#165DFC'} />

                          <View style={styles.formattingGuideText}>
                            <Text style={styles.formattingGuideTitle}>
                              Formatting Guide
                            </Text>

                            <Text style={styles.formattingGuideDesc}>
                              {expandFormattingGuide
                                ? 'Choose a format to see how it works'
                                : 'Learn how to format your text'}
                            </Text>
                          </View>
                        </View>

                        <Pressable
                          onPress={() =>
                            setExpandFormattingGuide(prev => !prev)
                          }
                        >
                          {expandFormattingGuide ? (
                            <Collapse width={16} height={16} fill={'#165DFC'} />
                          ) : (
                            <Expand width={16} height={16} fill={'#165DFC'} />
                          )}
                        </Pressable>
                      </View>

                      {expandFormattingGuide && (
                        <View style={styles.expandedContainer}>
                          <View style={styles.formatOptionContainer}>
                            {formatterOptionsList.map((obj, index) => (
                              <Pressable
                                key={index}
                                style={[
                                  styles.formatOption,
                                  selectedType === obj.type &&
                                    styles.selectedFormatOption,
                                ]}
                                onPress={() => {
                                  setSelectedType(obj.type);
                                  setSelectedConfig(examplesConfig[obj.type]);
                                }}
                              >
                                {obj.icon}

                                <Text
                                  style={[
                                    styles.formatOptionText,
                                    selectedType === obj.type &&
                                      styles.selectedFormatOptionText,
                                  ]}
                                >
                                  {obj.text}
                                </Text>
                              </Pressable>
                            ))}
                          </View>
                          <View style={styles.selectedContainer}>
                            <View style={{ gap: 4 }}>
                              <Text style={styles.selectedTitle}>
                                {selectedConfig.title}
                              </Text>
                              <Text style={styles.selectedDesc}>
                                {selectedConfig.desc}
                              </Text>
                            </View>
                            <View style={{ gap: 8 }}>
                              {selectedConfig.examples.map((obj, index) => (
                                <View key={index} style={{ gap: 8 }}>
                                  <Text style={styles.exampleTitle}>
                                    {obj.title}
                                  </Text>
                                  <View style={styles.exampleBody}>
                                    <Text style={styles.exampleBodyText}>
                                      {obj.body}
                                    </Text>
                                  </View>
                                  <View style={styles.exampleButtons}>
                                    <Button
                                      variantType="secondary"
                                      title={'Copy'}
                                      additionalStyles={styles.copyButton}
                                      textStyles={styles.buttonText}
                                      onPress={() =>
                                        onCopyToClipboard(obj?.body)
                                      }
                                    />
                                    <Button
                                      variantType="secondary"
                                      title={'Insert'}
                                      additionalStyles={styles.insertButton}
                                      textStyles={styles.buttonText}
                                      onPress={() => handlePress(obj.id)}
                                    />
                                  </View>
                                </View>
                              ))}
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  )}

                  <Input
                    variantType="dropdown"
                    placeholder={'Select Status'}
                    label={'Status'}
                    value={status}
                    onChangeText={setStatus}
                    optionList={[
                      {
                        value: 'pending',
                        label: 'Pending',
                      },
                      {
                        value: 'progress',
                        label: 'In Progress',
                      },
                      {
                        value: 'completed',
                        label: 'Completed',
                      },
                    ]}
                    onPressOption={() => Keyboard.dismiss()}
                  />

                  <Input
                    label={'Deadline'}
                    variantType="date"
                    placeholder={'dd/mm/yyyy'}
                    value={deadline}
                    onChangeText={setDeadline}
                  />
                </View>
              </ScrollView>

              {/* FOOTER */}
              <View style={styles.modalFooter}>
                <Button
                  title="Cancel"
                  variantType="secondary"
                  onPress={onReset}
                  additionalStyles={{ width: '48%' }}
                />

                <Button
                  title={type === 'edit' ? 'Save Changes' : 'Create Note'}
                  variantType="primary"
                  onPress={onCreateNote}
                  isDisabled={isButtonDisabled}
                  additionalStyles={{ width: '48%' }}
                  isLoading={createNoteLoading || updateNoteLoading}
                />
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <ErrorModal
        isErrorModalVisible={isErrorModalVisible}
        setIsErrorModalVisible={setIsErrorModalVisible}
        title={errorMessage?.title}
        description={errorMessage?.description}
        onClose={onCloseErrorModal}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#fff',

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    paddingTop: 24,
    paddingHorizontal: 16,

    overflow: 'hidden',
  },

  scrollView: {
    flex: 1,
  },

  scrollContainer: {
    paddingBottom: 12,
  },

  modalHeader: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },

  modalBody: {
    gap: 12,
  },

  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,

    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },

  closeIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  modalTitleDesc: {
    fontSize: 14,
    color: '#667085',
  },

  formatContainer: {
    backgroundColor: '#F8FAFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5EDFF',
  },

  focusedFormatContainer: {
    backgroundColor: '#FBFBFC',
  },

  formattingGuideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  guideLeftSection: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },

  formattingGuideText: {
    gap: 4,
  },

  formattingGuideTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#165DFC',
  },

  formattingGuideDesc: {
    fontSize: 12,
    color: '#667085',
  },

  expandedContainer: {
    gap: 16,
  },

  formatOptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },

  formatOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EAECF0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  selectedFormatOption: {
    backgroundColor: '#ECF2FE',
    borderColor: '#165DFC',
  },

  formatOptionText: {
    fontSize: 14,
    color: '#111827',
  },

  selectedFormatOptionText: {
    color: '#165DFC',
  },

  selectedContainer: {
    borderWidth: 1,
    borderColor: '#EAECF0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    gap: 12,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  selectedDesc: {
    fontSize: 12,
    fontWeight: '300',
    color: '#667085',
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  exampleBody: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  exampleBodyText: {
    fontFamily: 'Menlo',
    fontSize: 13,
    lineHeight: 20,
    color: '#F9FAFB',
  },
  exampleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  copyButton: {
    width: '48%',
    borderColor: '#165DFC',
  },
  insertButton: {
    width: '48%',
    backgroundColor: '#EAF2FE',
    borderColor: '#EAF2FE',
  },
  buttonText: {
    color: '#165DFC',
  },
});

export default AddNote;
