[ "public" ] @keyword
[ "(" ")" ] @punctuation.bracket
[ "<" ">"  ] @punctuation.repeat
[ "[" "]"] @punctuation.optional
; curly braces for some reason cause problems
; [ "{" "}"  ] @punctuation.curly_bracket
[ "|" ";" ] @punctuation.special
[ "=" ] @punctuation.equals

(specialGarbage) @special.garbage
(specialVoid) @special.void
(specialNull) @special.null
(specialEnd) @special.end
(specialBegin) @special.begin

(comment) @comment

(ruleRef) @method.call
(ruleHeader) @function

(token) @token
(grammarTag) @tag

(styleSpec) @style.spec
(styleShortcut) @style.shortcut

(repeatFull) @repeat.full
(repeatShortcut) @repeat.shortcut

(ERROR) @error

