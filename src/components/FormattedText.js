import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Pressable,
  Animated,
} from 'react-native';
import parseText from '../shared/parseText';
import ClipBoard from '../assets/icons/ClipBoard.jsx';
import Clipboard from '@react-native-clipboard/clipboard';
import SuccessTick from '../assets/icons/SuccessTick.jsx';
import contentConfig from '../assets/json/content.json';

const renderInlineContent = (content, selectable, selectionColor) => {
  return content.map((item, index) => {
    switch (item.type) {
      case 'text':
        return (
          <Text
            key={index}
            style={styles.text}
            selectable={selectable}
            selectionColor={selectionColor}
          >
            {item.text}
          </Text>
        );

      case 'bold':
        return (
          <Text
            key={index}
            style={styles.bold}
            selectable={selectable}
            selectionColor={selectionColor}
          >
            {item.text}
          </Text>
        );

      case 'link':
        return (
          <Text
            key={index}
            style={styles.link}
            selectable={selectable}
            selectionColor={selectionColor}
            suppressHighlighting
            onPress={() => {
              if (item.url) {
                Linking.openURL(item.url);
              }
            }}
          >
            {item.text}
          </Text>
        );

      case 'italic':
        return (
          <Text
            key={index}
            style={styles.italic}
            selectable={selectable}
            selectionColor={selectionColor}
          >
            {item.text}
          </Text>
        );

      case 'quote':
        return (
          <Text
            key={index}
            style={[styles.text, styles.quote]}
            selectable={selectable}
            selectionColor={selectionColor}
          >
            {item.text}
          </Text>
        );

      default:
        return (
          <Text
            key={index}
            selectable={selectable}
            selectionColor={selectionColor}
          >
            {item.text}
          </Text>
        );
    }
  });
};

const FormattedText = ({
  text,
  additionalStyles,
  setIsSuccessVisible,
  setSuccessMessage,
  setStartTimer,
  selectable = false,
  selectionColor,
}) => {
  const parsedText = parseText(text);

  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedTimer, setCopiedTimer] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const successAnim = useState(new Animated.Value(0))[0];

  const LANGUAGE_MAP = contentConfig.LANGUAGE_MAP;

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
    setCopiedTimer(true);
    setStartTimer(true);
  };

  useEffect(() => {
    if (copiedTimer) {
      const timer = setTimeout(() => {
        setCopiedTimer(false);
        setCopiedIndex(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [copiedTimer]);

  return (
    <View style={[styles.container, additionalStyles]}>
      {parsedText.map((block, index) => {
        // HEADING BLOCK
        if (block.type === 'heading') {
          return (
            <Text
              key={index}
              style={[
                styles.heading,
                block.level === 1 && styles.heading1,
                block.level === 2 && styles.heading2,
                block.level === 3 && styles.heading3,
              ]}
            >
              {renderInlineContent(block.content, selectable, selectionColor)}
            </Text>
          );
        }

        // PARAGRAPH BLOCK
        if (block.type === 'paragraph') {
          return (
            <Text
              key={index}
              style={[styles.text, styles.paragraph]}
              selectable={selectable}
              selectionColor={selectionColor}
              textBreakStrategy="simple"
            >
              {renderInlineContent(block.content, selectable, selectionColor)}
            </Text>
          );
        }

        // BULLET LIST BLOCK
        if (block.type === 'bullet-list') {
          return (
            <View key={index} style={styles.bulletContainer}>
              {block.content.map((bulletItem, bulletIndex) => (
                <View key={bulletIndex} style={styles.bulletPoint}>
                  <View style={styles.dot} />

                  <Text
                    style={styles.text}
                    selectable={selectable}
                    selectionColor={selectionColor}
                    textBreakStrategy="simple"
                  >
                    {renderInlineContent(
                      bulletItem,
                      selectable,
                      selectionColor,
                    )}
                  </Text>
                </View>
              ))}
            </View>
          );
        }

        // NUMBERED LIST BLOCK
        if (block.type === 'numbered-list') {
          return (
            <View key={index} style={styles.bulletContainer}>
              {block.content.map((item, itemIndex) => (
                <View key={itemIndex} style={[styles.numberedPoint]}>
                  <Text style={styles.numberText}>{itemIndex + 1}.</Text>

                  <Text
                    style={[styles.text, styles.numberedPointContent]}
                    selectable={selectable}
                    selectionColor={selectionColor}
                    textBreakStrategy="simple"
                  >
                    {renderInlineContent(item, selectable, selectionColor)}
                  </Text>
                </View>
              ))}
            </View>
          );
        }

        // CODE BLOCK
        if (block.type === 'code-block') {
          return (
            <View key={index} style={styles.codeBlock}>
              <View style={styles.codeBlockHeader}>
                <Text style={styles.codeLanguage}>
                  {LANGUAGE_MAP[block.language] || block.language}
                </Text>
                <Pressable
                  onPress={() => {
                    setCopiedIndex(index);
                    onCopyToClipboard(block.content);
                  }}
                  style={styles.copyButton}
                >
                  <Animated.View
                    style={{
                      padding: 6,
                      transform: [
                        copiedIndex === index
                          ? { scale: scaleAnim }
                          : { scale: 1 },
                      ],
                      opacity:
                        copiedIndex === index
                          ? successAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.85, 1],
                            })
                          : 0.85,
                    }}
                  >
                    {copiedIndex === index ? (
                      <SuccessTick width={18} height={18} />
                    ) : (
                      <ClipBoard
                        width={18}
                        height={18}
                        fill={copiedIndex === index ? '#16a34a' : '#6b7280'}
                      />
                    )}
                  </Animated.View>
                </Pressable>
              </View>
              <Text
                style={styles.codeText}
                selectable={selectable}
                selectionColor={selectionColor}
                textBreakStrategy="simple"
              >
                {block.content}
              </Text>
            </View>
          );
        }

        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  paragraph: {
    flexWrap: 'wrap',
  },

  text: {
    fontSize: 14,
    lineHeight: 24,
    color: '#111827',
    includeFontPadding: false,
  },

  bold: {
    fontWeight: '700',
    color: '#111827',
  },

  link: {
    color: '#2563EB',
    textDecorationLine: 'underline',
  },

  italic: {
    fontStyle: 'italic',
    color: '#111827',
  },

  quote: {
    fontStyle: 'italic',
    color: '#6B7280',
  },

  bulletContainer: {
    width: '100%',
    gap: 8,
    marginLeft: 8,
  },

  bulletPoint: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#111827',
    marginTop: 9,
  },

  numberedPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  numberedPointContent: {
    flex: 1,
    flexShrink: 1,
  },

  heading: {
    color: '#111827',
    fontWeight: '700',
  },

  heading1: {
    fontSize: 28,
    lineHeight: 36,
  },

  heading2: {
    fontSize: 22,
    lineHeight: 30,
  },

  heading3: {
    fontSize: 18,
    lineHeight: 26,
  },

  numberText: {
    marginRight: 8,
    fontSize: 14,
    lineHeight: 24,
    color: '#111827',
  },

  codeBlock: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },

  codeBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    paddingBottom: 8,
  },

  codeLanguage: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#F9FAFB',
  },

  codeText: {
    fontFamily: 'Menlo',
    fontSize: 13,
    lineHeight: 20,
    color: '#F9FAFB',
  },
});

export default FormattedText;
