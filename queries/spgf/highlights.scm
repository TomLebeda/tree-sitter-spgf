[ "public" ] @keyword.modifier

[ "<" ">"  ] @punctuation.special
[ "(" ")" ] @punctuation.bracket
[ "[" "]"] @punctuation.bracket

; for some reason, curly brackets (braces) can't be matched the same way normal brackets are
(braceOpen) @punctuation.bracket
(braceClose) @punctuation.bracket

[ ";" ":" ] @punctuation.delimiter
[ "|" "=" ] @operator

(specialGarbage) @constant.builtin
(specialVoid) @constant.builtin
(specialNull) @constant.builtin
(specialEnd) @constant.builtin
(specialBegin) @constant.builtin

(comment) @comment

(ruleRef) @function.call
(ruleHeader) @constructor

(token) @string
(grammarTag) @tag

(styleShortcut) @string.special.symbol

(repeatFull) @keyword.repeat
(repeatShortcut) @operator

(ERROR) @error

