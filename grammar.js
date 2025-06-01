module.exports = grammar({
  name: "spgf",

  extras: ($) => [$.comment, /\s/, /\n/],

  rules: {
    grammar: ($) => repeat($.ruleDefinition),

    comment: ($) =>
      choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),

    ruleDefinition: ($) =>
      seq(optional("public"), $.ruleHeader, $.ruleBody, ";"),

    ruleHeader: ($) => seq($.ruleName, "="),

    // \p{L} means "any unicode letter"
    ruleName: ($) => seq("$", /[\p{L}0-9_]+/),

    ruleBody: ($) =>
      seq($.ruleAlternative, repeat(seq("|", $.ruleAlternative))),

    ruleAlternative: ($) => repeat1($.ruleElement),

    ruleElement: ($) =>
      choice(
        $.token,
        $.specialRuleRef,
        $.ruleRef,
        $.sequence,
        seq($.specialGarbage, optional($.repeatOperator), repeat($.grammarTag)),
        $.specialVoid,
        seq($.specialNull, repeat($.grammarTag)),
        seq($.specialEnd, repeat($.grammarTag)),
        seq($.specialBegin, repeat($.grammarTag)),
      ),
    specialGarbage: ($) => "$GARBAGE",
    specialVoid: ($) => "$VOID",
    specialNull: ($) => "$NULL",
    specialEnd: ($) => "$END",
    specialBegin: ($) => "$BEGIN",

    // \p{L} means "any unicode letter"
    token: ($) =>
      seq(/[\p{L}0-9.\-_:]/, optional($.repeatOperator), repeat($.grammarTag)),

    repeatOperator: ($) =>
      seq(
        "<",
        optional($.styleSpec),
        choice($.repeatShortcut, $.repeatFull),
        ">",
      ),

    styleSpec: ($) => seq($.styleShortcut, ":"),

    styleShortcut: ($) => choice("L", "G", "T"),

    repeatShortcut: ($) => choice("*", "+"),

    repeatFull: ($) => /[0-9]+-[0-9]*/,

    grammarTag: ($) => /\{[^}]*\}/,

    specialRuleRef: ($) => choice(),

    ruleRef: ($) =>
      seq($.ruleName, optional($.repeatOperator), repeat($.grammarTag)),

    sequence: ($) =>
      seq(
        choice($.bracedSequence, $.optionalSequence),
        optional($.repeatOperator),
        repeat($.grammarTag),
      ),

    bracedSequence: ($) => seq("(", $.ruleBody, ")"),
    optionalSequence: ($) => seq("[", $.ruleBody, "]"),
  },
});
