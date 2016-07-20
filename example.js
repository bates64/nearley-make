const make = require('./nearley-make')
const fs = require('fs')

const grammar = fs.readFileSync('example.ne', 'utf-8')
const parser = make(grammar, {
  // anything you want to expose to the grammar as variables
  // for example builtins or flavour settings
  output: 'Hello, World!'
})

const trees = parser.feed('the usual').results
const tree = trees[0]

// logs "Hello, World!"
console.log(tree)