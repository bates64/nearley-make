'use strict'

const nearley = require('nearley')
const nearleyg = require('nearley/lib/nearley-language-bootstrapped.js')
const nearleyc = require('nearley/lib/compile.js')
const gen = require('nearley/lib/generate.js')

module.exports = function nearleyMake(grammar, args) {
  let parser
  let genned
      args = args || {}

  let argKeys = []
  let argValues = []

  Object.keys(args).forEach(function(key) {
    argKeys.push(key)
    argValues.push(args[key])
  })

  if(typeof grammar !== 'string') {
    throw new TypeError('arg#1 must be a string, got ' + typeof grammar)
  }

  // fork of https://github.com/Hardmath123/nearley/blob/master/bin/nearleyc.js
  parser = new nearley.Parser(nearleyg.ParserRules, nearleyg.ParserStart)
  grammar = nearleyc(parser.feed(grammar).results[0], {})
  genned = gen(grammar, 'grammar')

  // this is an amazing hack, you have to agree :P
  genned = genned.replace('(function () {', 'return (function () {')
  genned = genned.replace('window.grammar =', 'return')

  // eval the generated code & pass arguments
  grammar = (new Function(...argKeys, genned))(...argValues)

  // generate parser
  parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

  return parser
}
