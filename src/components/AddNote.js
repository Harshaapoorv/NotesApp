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
import StrikeThrough from '../assets/icons/FormatterIcons/StrikeThrough.jsx';
import Expand from '../assets/icons/Expand.jsx';
import Sparkle from '../assets/icons/Sparkle.jsx';
import Collapse from '../assets/icons/Collapse.jsx';
import { formatDateForAPI, parseDateFromAPI } from '../shared/date.js';
import Add from '../assets/icons/Add.jsx';
import Copy from '../assets/icons/Copy.jsx';
import Bulb from '../assets/icons/Bulb.jsx';

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
  const [selectedType, setSelectedType] = useState();
  const [selectedGuideType, setSelectedGuideType] = useState('bold');
  const [selectedConfig, setSelectedConfig] = useState(
    examplesConfig[selectedGuideType],
  );
  const [selection, setSelection] = useState({
    start: 0,
    end: 0,
  });

  const [copyText, setCopyText] = useState('Copy');
  const [insertText, setInsertText] = useState('Insert');
  const [copyTimer, setCopyTimer] = useState(false);
  const [insertTimer, setInsertTimer] = useState(false);
  const [copiedText, setCopiedText] = useState();
  const [insertedText, setInsertedText] = useState();

  const [showTip, setShowTip] = useState(true);

  const modalTranslateY = useRef(new Animated.Value(0)).current;

  const statusConfig = contentConfig.statusList;

  const onCopyToClipboard = text => {
    Clipboard.setString(text);
    setCopiedText(text);
    setCopyText('Copied!!');
    setCopyTimer(true);
  };

  useEffect(() => {
    let timer;
    if (copyTimer) {
      timer = setTimeout(() => {
        setCopyText('Copy');
        setCopiedText();
        setCopyTimer(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [copyTimer]);

  useEffect(() => {
    let timer;
    if (insertTimer) {
      timer = setTimeout(() => {
        setInsertText('Insert');
        setInsertedText();
        setInsertTimer(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [insertTimer]);

  useEffect(() => {
    if (type === 'edit' && !isPrePopulated) {
      setTitle(config?.title || '');
      setDescription(config?.description || '');
      setStatus(statusConfig[config?.status]);
      setDeadline(parseDateFromAPI(config?.deadline));
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

    setSelectedType();
    setSelectedConfig(examplesConfig[selectedGuideType]);
    setSelectedGuideType('bold');

    setShowTip(true);

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
        deadline: formatDateForAPI(deadline),
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

  const insertAtCursor = template => {
    const start = selection.start;
    const end = selection.end;

    const before = description.slice(0, start);
    const after = description.slice(end);

    const newText = before + template + after;
    setDescription(newText);

    const cursorPosition = start + template.length;

    setSelection({
      start: cursorPosition,
      end: cursorPosition,
    });
  };

  const handlePress = type => {
    if (type === 'bold') {
      insertAtCursor(' **bold content here** ');
    }

    if (type === 'italic') {
      insertAtCursor(' *italic content here* ');
    }

    if (type === 'strikethrough') {
      insertAtCursor(' ~~striked content here~~ ');
    }

    if (type === 'link') {
      insertAtCursor(' https://your-link.com ');
    }

    if (type === 'link-www') {
      insertAtCursor(' www.your-link.com ');
    }

    if (type === 'customLink') {
      insertAtCursor(' <<your-link>> ');
    }

    if (type === 'quote') {
      insertAtCursor(
        description?.length
          ? '\n<Your quote goes here>\n'
          : '<Your quote goes here>\n',
      );
    }

    if (type === 'heading') {
      insertAtCursor(description?.length ? '\n# Heading 1\n' : '# Heading 1\n');
    }

    if (type === 'heading2') {
      insertAtCursor(
        description?.length ? '\n## Heading 2\n' : '## Heading 2\n',
      );
    }

    if (type === 'heading3') {
      insertAtCursor(
        description?.length ? '\n### Heading 3\n' : '### Heading 3\n',
      );
    }

    if (type === 'ol') {
      insertAtCursor(
        description?.length
          ? '\n1. List item\n2. List item\n3. List item\n'
          : '1. List item\n2. List item\n3. List item\n',
      );
    }

    if (type === 'ul') {
      insertAtCursor(
        description?.length
          ? '\n- List item\n- List item\n- List item\n'
          : '- List item\n- List item\n- List item\n',
      );
    }

    if (type === 'code') {
      insertAtCursor(
        description?.length
          ? '\n```\n// Your code goes here\n```\n'
          : '```\n// Your code goes here\n```\n',
      );
    }

    if (type === 'codefile') {
      insertAtCursor(
        description?.length
          ? '\n```filetype\n// Your code goes here\n```\n'
          : '```filetype\n// Your code goes here\n```\n',
      );
    }
  };

  const formatterOptionsList = [
    {
      Icon: Bold,
      type: 'bold',
      text: 'Bold',
    },
    {
      Icon: Italic,
      type: 'italic',
      text: 'Italic',
    },
    {
      Icon: StrikeThrough,
      type: 'strikethrough',
      text: 'Strike',
    },
    {
      Icon: LinkSvg,
      type: 'link',
      text: 'Link',
    },
    {
      Icon: Quote,
      type: 'quote',
      text: 'Quote',
    },
    {
      Icon: Heading,
      type: 'heading',
      text: 'Heading',
    },
    {
      Icon: UnOrderedList,
      type: 'ul',
      text: 'List',
    },
    {
      Icon: NumberedList,
      type: 'ol',
      text: 'Numbered',
    },
    {
      Icon: Code,
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
              nestedScrollEnabled
              bounces={false}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    selection={selection}
                    onSelectionChange={setSelection}
                    selectedType={selectedType}
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
                            {formatterOptionsList.map((obj, index) => {
                              const Icon = obj.Icon;
                              return (
                                <Pressable
                                  key={index}
                                  style={[
                                    styles.formatOption,
                                    selectedGuideType === obj.type &&
                                      styles.selectedFormatOption,
                                  ]}
                                  onPress={() => {
                                    setSelectedGuideType(obj.type);
                                    setSelectedConfig(examplesConfig[obj.type]);
                                  }}
                                >
                                  <Icon
                                    width={16}
                                    height={16}
                                    fill={
                                      selectedGuideType === obj.type
                                        ? '#165DFC'
                                        : '#000000'
                                    }
                                  />

                                  <Text
                                    style={[
                                      styles.formatOptionText,
                                      selectedGuideType === obj.type &&
                                        styles.selectedFormatOptionText,
                                    ]}
                                  >
                                    {obj.text}
                                  </Text>
                                </Pressable>
                              );
                            })}
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
                                      title={
                                        (copiedText === obj.body && copyText) ||
                                        'Copy'
                                      }
                                      additionalStyles={styles.copyButton}
                                      textStyles={styles.buttonText}
                                      isDisabled={
                                        copiedText === obj.body && copyTimer
                                      }
                                      onPress={() =>
                                        onCopyToClipboard(obj?.body)
                                      }
                                      LeftIcon={Copy}
                                      leftIconFill={'#165DFC'}
                                    />
                                    <Button
                                      variantType="secondary"
                                      title={
                                        (insertedText === obj.body &&
                                          insertText) ||
                                        'Insert'
                                      }
                                      additionalStyles={styles.insertButton}
                                      textStyles={styles.buttonText}
                                      isDisabled={
                                        insertedText === obj.body && insertTimer
                                      }
                                      onPress={() => {
                                        handlePress(obj.id);
                                        setInsertedText(obj.body);
                                        setInsertText('Inserted!!');
                                        setInsertTimer(true);
                                      }}
                                      LeftIcon={Add}
                                      leftIconFill={'#165DFC'}
                                    />
                                  </View>
                                </View>
                              ))}
                            </View>
                          </View>
                          {showTip && (
                            <View style={styles.tipContainer}>
                              <Bulb width={24} height={24} color={'#165DFC'} />
                              <View style={styles.tipTextContainer}>
                                <Text style={styles.tipTitle}>Tip</Text>
                                <Text style={styles.tipDesc}>
                                  You can combine multiple formats for even more
                                  powerful notes!
                                </Text>
                              </View>
                              <Pressable onPress={() => setShowTip(false)}>
                                <Close
                                  width={24}
                                  height={24}
                                  color={'#165DFC'}
                                />
                              </Pressable>
                            </View>
                          )}
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
              </TouchableWithoutFeedback>
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
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EAF2FE',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAF2FE',
  },
  tipTextContainer: {
    width: '78%',
    gap: 8,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#165DFC',
  },
  tipDesc: {
    fontSize: 12,
    color: '#667085',
  },
});

export default AddNote;
