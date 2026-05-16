const INLINE_REGEX =
  /(\*\*[^*]+\*\*)|(\*[^*]+\*)|(https?:\/\/[^\s]+)|(www\.[^\s]+)|(<<.*?>>)|(<.*?>)/g;

/**
 * SUPPORTED CODE LANGUAGES
 */
export const SUPPORTED_LANGUAGES = [
  'js',
  'javascript',
  'jsx',
  'javascriptreact',

  'ts',
  'typescript',
  'tsx',
  'typescriptreact',

  'py',
  'python',

  'java',
  'kotlin',
  'swift',
  'objective-c',
  'objective-cpp',

  'c',
  'cpp',
  'h',
  'hpp',

  'go',
  'rust',
  'rs',

  'ruby',
  'rb',

  'php',

  'dart',

  'scala',

  'groovy',

  'perl',

  'lua',

  'r',

  'matlab',

  'sql',

  'graphql',

  'html',
  'xml',

  'css',

  'json',

  'yaml',
  'yml',

  'markdown',
  'md',

  'csv',

  'ini',

  'log',

  'dockerfile',

  'makefile',

  'bash',
  'sh',
  'shell',

  'powershell',

  'assembly',
  'asm',

  'coffee',

  'elixir',

  'erlang',

  'fsharp',

  'haskell',

  'lisp',

  'pascal',

  'prolog',

  'scheme',

  'smalltalk',

  'solidity',

  'vb',

  'text',
];

/**
 * LANGUAGE ALIASES
 * Normalize variants to a single canonical key
 */
export const LANGUAGE_ALIASES = {
  /**
   * JavaScript / TypeScript
   */
  javascript: 'js',
  javascriptreact: 'jsx',

  typescript: 'ts',
  typescriptreact: 'tsx',

  /**
   * Python
   */
  python: 'py',

  /**
   * Shell
   */
  shell: 'bash',

  /**
   * Ruby
   */
  ruby: 'rb',

  /**
   * Rust
   */
  rust: 'rs',

  /**
   * Markdown
   */
  markdown: 'md',

  /**
   * YAML
   */
  yaml: 'yml',

  /**
   * Assembly
   */
  assembly: 'asm',

  /**
   * Objective-C
   */
  'objective-c': 'objective-c',
  'objective-cpp': 'objective-cpp',

  /**
   * PowerShell
   */
  powershell: 'powershell',

  /**
   * Plain text
   */
  plaintext: 'text',
  txt: 'text',
};

/**
 * INLINE PARSER
 */
export function parseInline(text = '') {
  const tokens = [];

  INLINE_REGEX.lastIndex = 0;

  let lastIndex = 0;
  let match;

  while ((match = INLINE_REGEX.exec(text)) !== null) {
    const matchedText = match[0];
    const start = match.index;

    /**
     * PLAIN TEXT
     */
    if (start > lastIndex) {
      tokens.push({
        type: 'text',
        text: text.slice(lastIndex, start),
      });
    }

    /**
     * BOLD
     * **text**
     */
    if (/^\*\*[^*]+\*\*$/.test(matchedText)) {
      tokens.push({
        type: 'bold',
        text: matchedText.slice(2, -2),
      });
    } else if (/^\*[^*]+\*$/.test(matchedText)) {
      /**
       * ITALIC
       * *text*
       */
      tokens.push({
        type: 'italic',
        text: matchedText.slice(1, -1),
      });
    } else if (/^https?:\/\/[^\s]+$/.test(matchedText)) {
      /**
       * FULL URL
       */
      tokens.push({
        type: 'link',
        text: matchedText,
        url: matchedText,
      });
    } else if (/^www\.[^\s]+$/.test(matchedText)) {
      /**
       * WWW URL
       */
      tokens.push({
        type: 'link',
        text: matchedText,
        url: `https://${matchedText}`,
      });
    } else if (/^<<.*?>>$/.test(matchedText)) {
      /**
       * <<custom-link>>
       */
      const cleanText = matchedText.slice(2, -2);

      tokens.push({
        type: 'link',
        text: cleanText,
        url: cleanText,
      });
    } else if (/^<.*?>$/.test(matchedText)) {
      /**
       * <quote>
       */
      tokens.push({
        type: 'quote',
        text: matchedText.slice(1, -1),
      });
    }

    lastIndex = INLINE_REGEX.lastIndex;
  }

  /**
   * REMAINING TEXT
   */
  if (lastIndex < text.length) {
    tokens.push({
      type: 'text',
      text: text.slice(lastIndex),
    });
  }

  return tokens;
}

/**
 * MAIN BLOCK PARSER
 */
export default function parseText(text = '') {
  const lines = text.split('\n');

  const blocks = [];

  let bulletBuffer = [];
  let numberedBuffer = [];

  let isCodeBlock = false;
  let codeBuffer = [];
  let codeLanguage = 'text';

  /**
   * FLUSH BULLETS
   */
  const flushBullets = () => {
    if (bulletBuffer.length) {
      blocks.push({
        type: 'bullet-list',
        content: bulletBuffer,
      });

      bulletBuffer = [];
    }
  };

  /**
   * FLUSH NUMBERED
   */
  const flushNumbered = () => {
    if (numberedBuffer.length) {
      blocks.push({
        type: 'numbered-list',
        content: numberedBuffer,
      });

      numberedBuffer = [];
    }
  };

  /**
   * FLUSH CODE BLOCK
   */
  const flushCodeBlock = () => {
    blocks.push({
      type: 'code-block',
      language: codeLanguage || 'text',
      content: codeBuffer.join('\n'),
    });

    codeBuffer = [];
    codeLanguage = 'text';
  };

  lines.forEach(line => {
    const trimmed = line.trim();

    /**
     * SINGLE LINE CODE BLOCK
     *
     * ```js const a = 10```
     * ```const a = 10```
     */
    if (
      trimmed.startsWith('```') &&
      trimmed.endsWith('```') &&
      trimmed.length > 6
    ) {
      flushBullets();
      flushNumbered();

      const innerContent = trimmed.slice(3, -3).trim();

      let language = 'text';
      let code = innerContent;

      /**
       * Detect language token
       */
      const languageMatch = innerContent.match(/^([a-zA-Z0-9+#]+)\s+/);

      if (languageMatch) {
        const detectedLanguage = languageMatch[1].toLowerCase();

        /**
         * ONLY treat as language if supported
         */
        if (SUPPORTED_LANGUAGES.includes(detectedLanguage)) {
          language = LANGUAGE_ALIASES[detectedLanguage] || detectedLanguage;

          code = innerContent.slice(languageMatch[1].length).trim();
        }
      }

      blocks.push({
        type: 'code-block',
        language,
        content: code,
      });

      return;
    }

    /**
     * MULTILINE CODE BLOCK FENCE
     *
     * ```
     * ```js
     * ```python
     */
    if (trimmed.startsWith('```')) {
      flushBullets();
      flushNumbered();

      /**
       * CLOSE BLOCK
       */
      if (isCodeBlock) {
        flushCodeBlock();

        isCodeBlock = false;
      } else {
        /**
         * OPEN BLOCK
         */
        isCodeBlock = true;

        const extractedLanguage = trimmed.slice(3).trim().toLowerCase();

        /**
         * Validate language
         */
        if (
          extractedLanguage &&
          SUPPORTED_LANGUAGES.includes(extractedLanguage)
        ) {
          codeLanguage =
            LANGUAGE_ALIASES[extractedLanguage] || extractedLanguage;
        } else {
          codeLanguage = 'text';

          /**
           * If user wrote:
           * ```const a = 10
           *
           * treat everything after ``` as code
           */
          if (extractedLanguage) {
            codeBuffer.push(trimmed.slice(3));
          }
        }
      }

      return;
    }

    /**
     * INSIDE CODE BLOCK
     */
    if (isCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    /**
     * EMPTY LINE
     */
    if (!trimmed) {
      flushBullets();
      flushNumbered();
      return;
    }

    /**
     * HEADING 3
     */
    if (/^### /.test(trimmed)) {
      flushBullets();
      flushNumbered();

      blocks.push({
        type: 'heading',
        level: 3,
        content: parseInline(trimmed.slice(4)),
      });

      return;
    }

    /**
     * HEADING 2
     */
    if (/^## /.test(trimmed)) {
      flushBullets();
      flushNumbered();

      blocks.push({
        type: 'heading',
        level: 2,
        content: parseInline(trimmed.slice(3)),
      });

      return;
    }

    /**
     * HEADING 1
     */
    if (/^# /.test(trimmed)) {
      flushBullets();
      flushNumbered();

      blocks.push({
        type: 'heading',
        level: 1,
        content: parseInline(trimmed.slice(2)),
      });

      return;
    }

    /**
     * BULLET LIST
     */
    if (trimmed.startsWith('- ')) {
      flushNumbered();

      bulletBuffer.push(parseInline(trimmed.slice(2)));

      return;
    }

    /**
     * NUMBERED LIST
     *
     * 1. Item
     */
    if (/^\d+\. /.test(trimmed)) {
      flushBullets();

      numberedBuffer.push(parseInline(trimmed.replace(/^\d+\. /, '')));

      return;
    }

    /**
     * NORMAL PARAGRAPH
     */
    flushBullets();
    flushNumbered();

    blocks.push({
      type: 'paragraph',
      content: parseInline(line),
    });
  });

  /**
   * FINAL FLUSHES
   */
  flushBullets();
  flushNumbered();

  /**
   * HANDLE UNCLOSED CODE BLOCK
   */
  if (isCodeBlock) {
    flushCodeBlock();
  }

  return blocks;
}
