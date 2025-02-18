// This function guesses the human language (writing system) of the given
// JavaScript string, using the Unicode Alias in extended RegExp.
//
// You can learn more about this in:
// - https://en.wikipedia.org/wiki/Script_(Unicode)
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
// - https://unicode.org/reports/tr18/#General_Category_Property
// - https://tc39.es/ecma262/multipage/text-processing.html#table-unicode-script-values

// Supported languages. The order matters.
// Usually, this is only for "special cases" like CJKV languages as latin
// characters are usually included in the base font, and can be safely fallback
// to the Noto Sans font. A list of special cases we want to support can be
// found here (sort by popularity):
// - https://fonts.google.com/noto/fonts?sort=popularity&noto.query=sans
const code = {
  emoji:
    // https://stackoverflow.com/a/68146409
    // U+E000–U+F8FF, U+F0000–U+FFFFD, U+100000–U+10FFFD is the Unicode Private Use Area (PUA). See https://en.wikipedia.org/wiki/Private_Use_Areas
    /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)+|\p{EPres}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?|\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})|[\u{E000}-\u{F8FF}]|[\u{F0000}-\u{FFFFD}]|[\u{100000}-\u{10FFFD}]/u,
  ja: /\p{scx=Hira}|\p{scx=Kana}|[，；：]/u,
  ko: /\p{scx=Hangul}/u,
  zh: /\p{scx=Han}/u,
  th: /\p{scx=Thai}/u,
  bn: /\p{scx=Bengali}/u,
  ar: /\p{scx=Arabic}/u,
  ta: /\p{scx=Tamil}/u,
  ml: /\p{scx=Malayalam}/u,
  he: /\p{scx=Hebrew}/u,
  te: /\p{scx=Telugu}/u,
  devanagari: /\p{scx=Devanagari}/u,
}

// Here we assume all characters from the passed in "segment" is in the same
// written language. So if the string contains at least one matched character,
// we determine it as the matched language.
export function detectLanguageCode(segment: string): string {
  for (const c in code) {
    if (code[c].test(segment)) {
      return c
    }
  }
  return 'unknown'
}
