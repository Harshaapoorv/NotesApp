import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Pressable,
  Animated,
  Modal,
} from 'react-native';
import contentConfig from '../assets/json/content.json';
import Button from '../components/Button';
import AddNote from '../components/AddNote.js';
import BackArrow from '../assets/icons/Back.jsx';
import Edit from '../assets/icons/Edit.jsx';
import CalendarIcon from '../assets/icons/CalendarIcon.jsx';
import Timer from '../assets/icons/Timer.jsx';
import Dot from '../assets/icons/Dot.jsx';
import { useNavigation } from '@react-navigation/native';
import {
  useDeleteNoteMutation,
  useGetNoteByIdQuery,
  useUpdateStatusMutation,
} from '../services/notesApi.js';
import { formatShortDate, formatTime } from '../shared/date.js';
import NoteScreenSkeleton from '../components/NoteScreenSkeleton.js';
import ErrorModal from '../components/ErrorModal.js';
import getErrorMessage from '../services/apiErrorHandler.js';
import ToastMessage from '../components/ToastMessage.js';
import AlertModal from '../components/AlertModal.js';
import ClipBoard from '../assets/icons/ClipBoard.jsx';
import Clipboard from '@react-native-clipboard/clipboard';
import SuccessTick from '../assets/icons/SuccessTick.jsx';
import FormattedText from '../components/FormattedText.js';
import Info from '../assets/icons/Info.jsx';
import Close from '../assets/icons/Close.jsx';
import Book from '../assets/icons/Book.jsx';
import Bold from '../assets/icons/FormatterIcons/Bold.jsx';
import Italic from '../assets/icons/FormatterIcons/Italic.jsx';
import LinkSvg from '../assets/icons/FormatterIcons/Link.jsx';
import Heading from '../assets/icons/FormatterIcons/Heading.jsx';
import UnOrderedList from '../assets/icons/FormatterIcons/UnOrderedList.jsx';
import NumberedList from '../assets/icons/FormatterIcons/NumberedList.jsx';
import Quote from '../assets/icons/FormatterIcons/Quote.jsx';
import Code from '../assets/icons/FormatterIcons/Code.jsx';
import Alphabets from '../assets/icons/FormatterIcons/Alphabets.jsx';
import Next from '../assets/icons/Next.jsx';
import Copy from '../assets/icons/Copy.jsx';

const NoteScreen = ({ route }) => {
  const { id: id } = route.params;
  const navigation = useNavigation();
  const [statusConfig, setStatusConfig] = useState();
  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);
  const [config, setConfig] = useState({});

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [startTimer, setStartTimer] = useState(false);
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);

  const [isFormatGuideModalVisible, setIsFormatGuideModalVisible] =
    useState(false);
  const [listItemConfig, setListItemConfig] = useState(null);
  const [configTitle, setConfigTitle] = useState(null);

  const [copied, setCopied] = useState(false);
  const [copiedTimer, setCopiedTimer] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const successAnim = useState(new Animated.Value(0))[0];

  const animateClipboard = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.88,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.delay(700),
      Animated.timing(successAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onCopyToClipboard = text => {
    Clipboard.setString(text);
    animateClipboard();
    setIsSuccessVisible(true);
    setSuccessMessage({
      title: 'Copied!!',
      type: 'info',
    });
    setCopied(true);
    setCopiedTimer(true);
    setStartTimer(true);
  };

  const onCloseErrorModal = () => {
    setIsErrorModalVisible(false);
    setErrorMessage('');
  };

  const [
    deleteNote,
    {
      isSuccess: deleteNoteSuccess,
      isLoading: deleteNoteLoading,
      isError: isDeleteNoteError,
      error: deleteNoteErrorData,
    },
  ] = useDeleteNoteMutation();

  useEffect(() => {
    if (deleteNoteSuccess) {
      setIsAlertModalVisible(false);
      navigation.popTo('Home', {
        isSuccessVisible: deleteNoteSuccess,
        successMessage: {
          title: 'Note has been deleted successfully.',
          type: 'success',
        },
      });
    } else if (isDeleteNoteError) {
      setIsAlertModalVisible(false);
      setIsErrorModalVisible(true);
      setErrorMessage(getErrorMessage(deleteNoteErrorData));
    }
  }, [deleteNoteSuccess, navigation, isDeleteNoteError, deleteNoteErrorData]);

  const {
    data,
    isSuccess,
    isLoading,
    isError: isGetNoteError,
    error: getNoteErrorData,
    refetch,
    isFetching,
  } = useGetNoteByIdQuery(id, {
    skip: !id || deleteNoteSuccess || deleteNoteLoading,
  });

  useEffect(() => {
    if (isSuccess) {
      setStatusConfig(contentConfig.statusList[data?.status]);
      setConfig(data);
    } else if (isGetNoteError) {
      setIsErrorModalVisible(true);
      setErrorMessage(getErrorMessage(getNoteErrorData));
    }
  }, [data, isSuccess, isGetNoteError, getNoteErrorData]);

  const [updateStatus] = useUpdateStatusMutation();

  const handleUpdateStatus = useCallback(
    async id => {
      try {
        await updateStatus(id).unwrap();

        setIsSuccessVisible(true);
        setSuccessMessage({
          title: 'Note status has been updated successfully.',
          type: 'success',
        });
        setStartTimer(true);
      } catch (err) {
        setIsErrorModalVisible(true);
        setErrorMessage(getErrorMessage(err));
      }
    },
    [updateStatus],
  );

  useEffect(() => {
    let timer;
    if (startTimer) {
      timer = setTimeout(() => {
        setIsSuccessVisible(false);
        setSuccessMessage('');
        setStartTimer(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [startTimer]);

  useEffect(() => {
    if (copiedTimer) {
      const timer = setTimeout(() => {
        setCopied(false);
        setCopiedTimer(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [copiedTimer]);

  const statusStyle = useMemo(
    () => ({
      backgroundColor: statusConfig?.color,
      borderColor: statusConfig?.color,
    }),
    [statusConfig],
  );

  const onToolTipPress = () => {
    setIsFormatGuideModalVisible(true);
  };

  const onClose = () => {
    setIsFormatGuideModalVisible(false);
    setConfigTitle(null);
    setListItemConfig(null);
  };

  const guideModalList = [
    {
      Icon: Alphabets,
      title: 'Text Styles',
      desc: 'Bold, Italic, Headings and more',
      config: [
        {
          Icon: Bold,
          title: 'Bold',
          desc: 'Make text bold',
          syntaxes: ['**This is bold**'],
        },
        {
          Icon: Italic,
          title: 'Italic',
          desc: 'Make text italic',
          syntaxes: ['*This is italic*'],
        },
        {
          Icon: LinkSvg,
          title: 'Link',
          desc: 'Make text a clickable link',
          syntaxes: [
            '<<yourlink>>',
            'https://yourlink.com',
            'www.yourlink.com',
          ],
        },
        {
          Icon: Heading,
          title: 'Heading',
          desc: 'Make text a heading',
          syntaxes: ['# Heading 1', '## Heading 2', '### Heading 3'],
        },
      ],
    },
    {
      Icon: UnOrderedList,
      title: 'Lists',
      desc: 'Bulleted & Numbered Lists',
      config: [
        {
          Icon: UnOrderedList,
          title: 'Bulleted List',
          desc: 'Create a bulleted list',
          syntaxes: ['- Item 1\n- Item 2\n- Item 3'],
        },
        {
          Icon: NumberedList,
          title: 'Numbered List',
          desc: 'Create a numbered list',
          syntaxes: ['1. First item\n2. Second item\n3. Third item'],
        },
      ],
    },
    {
      Icon: Quote,
      title: 'Quotes',
      desc: 'Blockquotes',
      config: [
        {
          Icon: Quote,
          title: 'Blockquote',
          desc: 'Highlight a sentence as a quote',
          syntaxes: ['<This is a quote>'],
        },
      ],
    },
    {
      Icon: Code,
      title: 'Code Blocks',
      desc: 'Code syntax and supported languages',
      config: [
        {
          Icon: Code,
          title: 'Code Block',
          desc: 'Make text as a single or multiline codeblock',
          syntaxes: [
            '```// This is a single line code block```',
            '```# This is\n# a multiline\n# code block\n```',
            '```js\nconst a = 10\nconst b = 10\nconsole.log(a + b)\n```',
            '```py\na = 10\nb = 10\nprint(a + b)\n```',
          ],
        },
      ],
    },
  ];

  const FormatGuideModal = () => {
    return (
      <Modal
        visible={isFormatGuideModalVisible}
        animationType="slide"
        transparent
        statusBarTranslucent
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              {/* HEADER */}
              <Pressable style={styles.horizontalBar} onPress={onClose} />
              <View style={[styles.modalHeader]}>
                {configTitle ? (
                  <Pressable
                    onPress={() => {
                      setConfigTitle(null);
                      setListItemConfig(null);
                    }}
                  >
                    <BackArrow width={16} height={16} />
                  </Pressable>
                ) : (
                  <Book width={24} height={24} />
                )}
                <Text
                  style={[
                    styles.modalTitle,
                    configTitle && { alignSelf: 'center', textAlign: 'center' },
                  ]}
                >
                  {configTitle || 'Formatting Guide'}
                </Text>
                <Close
                  width={24}
                  height={24}
                  style={styles.closeIcon}
                  onPress={onClose}
                />
              </View>
              {!configTitle && (
                <Text style={styles.modalTitleDesc}>
                  {'Understand how text is formatted in this note'}
                </Text>
              )}

              {/* BODY */}
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                bounces={false}
              >
                {listItemConfig ? (
                  <View style={styles.modalBody}>
                    {listItemConfig.map((obj, index) => {
                      const Icon = obj.Icon;
                      return (
                        <View key={index} style={styles.configContainer}>
                          <View style={styles.configHeader}>
                            <Icon width={24} height={24} />
                            <View style={styles.configHeaderText}>
                              <Text style={styles.configTitle}>
                                {obj.title}
                              </Text>
                              <Text style={styles.configDesc}>{obj.desc}</Text>
                            </View>
                          </View>
                          <View style={{ gap: 8 }}>
                            {obj.syntaxes.map((syntax, idx) => (
                              <View key={idx}>
                                <View style={styles.configSyntaxCard}>
                                  <Text>{syntax}</Text>
                                  <Pressable
                                    onPress={() => {
                                      onCopyToClipboard(syntax);
                                    }}
                                  >
                                    <Animated.View
                                      style={{
                                        padding: 6,
                                        transform: [{ scale: scaleAnim }],
                                        opacity: successAnim.interpolate({
                                          inputRange: [0, 1],
                                          outputRange: [0.85, 1],
                                        }),
                                      }}
                                    >
                                      {copied ? (
                                        <View style={styles.copyContainer}>
                                          <SuccessTick width={18} height={18} />
                                          <Text style={styles.copyText}>
                                            Copied!!!
                                          </Text>
                                        </View>
                                      ) : (
                                        <View style={styles.copyContainer}>
                                          <Copy
                                            width={16}
                                            height={16}
                                            color={'#667085'}
                                          />
                                          <Text style={styles.copyText}>
                                            Copy
                                          </Text>
                                        </View>
                                      )}
                                    </Animated.View>
                                  </Pressable>
                                </View>
                                <View style={styles.configPreviewCard}>
                                  <Text style={styles.previewText}>
                                    Preview
                                  </Text>
                                  <FormattedText
                                    text={syntax}
                                    selectable={true}
                                    selectionColor={statusConfig?.color}
                                    setIsSuccessVisible={setIsSuccessVisible}
                                    setSuccessMessage={setSuccessMessage}
                                    setStartTimer={setStartTimer}
                                  />
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <View style={styles.modalBody}>
                    {guideModalList.map((obj, index) => {
                      const Icon = obj.Icon;
                      return (
                        <Pressable
                          key={index}
                          style={styles.listItemCard}
                          onPress={() => {
                            setListItemConfig(obj.config);
                            setConfigTitle(obj.title);
                          }}
                        >
                          <Icon width={16} height={16} />
                          <View style={styles.listItemTextContainer}>
                            <Text style={styles.listItemTitle}>
                              {obj.title}
                            </Text>
                            <Text style={styles.listItemDesc}>{obj.desc}</Text>
                          </View>
                          <Next width={14} height={14} />
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </ScrollView>

              {/* FOOTER */}
            </View>
            <View style={styles.longHorizontalBar} />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}
        >
          <BackArrow width={16} height={16} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{config?.title}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsAddNoteVisible(true);
          }}
        >
          <Edit width={16} height={16} />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading && !deleteNoteLoading}
            onRefresh={refetch}
          />
        }
      >
        {isLoading ? (
          <NoteScreenSkeleton />
        ) : (
          <>
            <View style={styles.body}>
              {config?.description && (
                <View style={{ width: '98%', gap: 12 }}>
                  <View style={styles.descriptionRowHeader}>
                    <Text style={styles.sectionTitle}>DESCRIPTION</Text>
                    <View style={styles.sectionHelpers}>
                      <Pressable onPress={onToolTipPress}>
                        <Info width={16} height={16} />
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          onCopyToClipboard(config?.description);
                        }}
                      >
                        <Animated.View
                          style={{
                            padding: 6,
                            transform: [{ scale: scaleAnim }],
                            opacity: successAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.85, 1],
                            }),
                          }}
                        >
                          {copied ? (
                            <SuccessTick width={18} height={18} />
                          ) : (
                            <ClipBoard
                              width={18}
                              height={18}
                              fill={copied ? '#16a34a' : '#6b7280'}
                            />
                          )}
                        </Animated.View>
                      </Pressable>
                    </View>
                  </View>
                  <FormattedText
                    text={config?.description}
                    styles={styles.description}
                    selectable={true}
                    selectionColor={statusConfig?.color}
                    setIsSuccessVisible={setIsSuccessVisible}
                    setSuccessMessage={setSuccessMessage}
                    setStartTimer={setStartTimer}
                  />
                </View>
              )}
              <View style={styles.metaDataContainer}>
                <View style={styles.rowBig}>
                  {config?.created_at && (
                    <View style={{ gap: 8 }}>
                      <View style={styles.row}>
                        <CalendarIcon width={16} height={16} />
                        <Text style={styles.sectionTitle}>Created</Text>
                      </View>
                      <Text style={styles.description}>
                        {formatShortDate(config?.created_at)}
                        <Text style={styles.time}>
                          {' '}
                          at {formatTime(config?.created_at)}
                        </Text>
                      </Text>
                    </View>
                  )}
                  {config?.deadline && (
                    <View style={{ gap: 8 }}>
                      <View style={styles.row}>
                        <Timer width={16} height={16} />
                        <Text style={styles.sectionTitle}>Deadline</Text>
                      </View>
                      <Text style={styles.description}>
                        {formatShortDate(config?.deadline)}
                      </Text>
                    </View>
                  )}
                </View>
                {config?.status && (
                  <View style={{ gap: 6 }}>
                    <View style={styles.row}>
                      <Dot
                        width={8}
                        height={8}
                        color={statusConfig?.textColor}
                      />
                      <Text style={styles.sectionTitle}>Status</Text>
                    </View>
                    {statusConfig && (
                      <TouchableOpacity
                        style={[statusStyle, styles.status]}
                        onPress={() => handleUpdateStatus(config?.id)}
                      >
                        <Text
                          style={[
                            styles.description,
                            { color: statusConfig?.textColor },
                          ]}
                        >
                          {statusConfig?.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            </View>
            <View style={styles.footer}>
              <Button
                title="Delete Note"
                variantType="secondary"
                additionalStyles={styles.deleteButton}
                isDelete={true}
                isIcon={true}
                textStyles={styles.deleteButtonText}
                onPress={() => {
                  setIsAlertModalVisible(true);
                }}
                isLoading={deleteNoteLoading}
                loaderColor={styles.deleteButtonText.color}
              />
            </View>
          </>
        )}
      </ScrollView>
      {isSuccessVisible && (
        <ToastMessage
          message={successMessage.title}
          type={successMessage.type}
        />
      )}
      {isAddNoteVisible && (
        <AddNote
          isVisible={isAddNoteVisible}
          setIsVisible={setIsAddNoteVisible}
          type="edit"
          config={config}
          setIsSuccessVisible={setIsSuccessVisible}
          setSuccessMessage={setSuccessMessage}
          setStartTimer={setStartTimer}
        />
      )}
      {isErrorModalVisible && (
        <ErrorModal
          isErrorModalVisible={isErrorModalVisible}
          setIsErrorModalVisible={setIsErrorModalVisible}
          title={errorMessage?.title}
          description={errorMessage?.description}
          onClose={onCloseErrorModal}
        />
      )}
      {isAlertModalVisible && (
        <AlertModal
          isAlertModalVisible={isAlertModalVisible}
          setIsAlertModalVisible={setIsAlertModalVisible}
          title={'Are you sure you want to delete this note?'}
          description={'This action cannot be undone.'}
          onClose={() => setIsAlertModalVisible(false)}
          primaryButtonText={'Yes, Delete'}
          primaryButtonHandler={() => {
            deleteNote(config?.id);
          }}
          primaryButtonLoading={deleteNoteLoading}
          primaryButtonStyles={styles.deleteModalButton}
          primaryButtonTextStyles={styles.deleteModalButtonText}
          secondaryButtonText={'No, Keep it'}
          secondaryButtonHandler={() => setIsAlertModalVisible(false)}
        />
      )}
      {isFormatGuideModalVisible && FormatGuideModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    width: '80%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  scrollContainer: {
    marginBottom: 40,
  },
  body: {
    padding: 16,
    paddingTop: 24,
    gap: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  descriptionRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  description: {
    fontSize: 14,
    color: '#000000',
  },
  sectionHelpers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaDataContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    gap: 16,
  },
  rowBig: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    fontWeight: '300',
    color: '#6b7280',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
    borderWidth: 1,
  },
  footer: {
    marginTop: 24,
    padding: 16,
  },
  deleteButton: {
    borderColor: '#e80015',
    gap: 8,
  },
  deleteButtonText: {
    color: '#e80015',
  },
  deleteModalButton: {
    backgroundColor: '#e80015',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  deleteModalButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#F9FAFB',

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    paddingBottom: 24,
    paddingTop: 12,
    paddingHorizontal: 16,

    gap: 12,

    overflow: 'hidden',
    maxHeight: '80%',
  },

  horizontalBar: {
    alignSelf: 'center',
    width: '13%',
    height: 6,
    backgroundColor: '#aba7a7',
    opacity: 0.6,
    borderRadius: 6,
  },

  longHorizontalBar: {
    alignSelf: 'center',
    width: '45%',
    height: 4,
    backgroundColor: '#aba7a7',
    borderRadius: 6,
    bottom: 12,
  },

  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },

  closeIcon: {
    alignSelf: 'flex-end',
  },

  modalTitle: {
    width: '78%',
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  modalTitleDesc: {
    fontSize: 14,
    color: '#46484d',
  },

  scrollView: {
    paddingVertical: 24,
  },

  scrollContainer: {
    paddingBottom: 12,
  },

  modalBody: {
    gap: 12,
  },

  listItemCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: '#EAECF0',
    borderWidth: 1,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  listItemTextContainer: {
    width: '80%',
    gap: 8,
  },

  listItemTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111827',
  },

  listItemDesc: {
    fontWeight: '300',
    fontSize: 12,
    color: '#667085',
  },

  configContainer: {
    gap: 12,
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
    paddingBottom: 16,
  },

  configHeader: {
    flexDirection: 'row',
    gap: 16,
  },

  configHeaderText: {
    gap: 4,
  },

  configTitle: {
    fontWeight: '500',
    fontSize: 16,
    color: '#111827',
  },

  configDesc: {
    fontWeight: '400',
    fontSize: 12,
    color: '#667085',
  },

  configSyntaxCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderColor: '#EAECF0',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  copyContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  copyText: {
    fontWeight: '300',
    fontSize: 12,
    color: '#667085',
  },

  configPreviewCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderColor: '#EAECF0',
    borderWidth: 1,
    gap: 8,
  },

  previewText: {
    fontWeight: '300',
    fontSize: 12,
    color: '#667085',
  },
});

export default NoteScreen;
