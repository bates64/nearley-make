# nearley-make
> Compile [nearley](https://github.com/Hardmath123/nearley/) grammars at run-time

`nearley-make` allows you to use [nearley](https://github.com/Hardmath123/nearley/) in Node.js, without requiring you to compile your grammar first.

Very useful for debug/development modes.

## Install
```sh
$ npm install nearley-make --save
```

## Usage
Examples speak 1000 words.

```js
const make = require('nearley-make')
const fs = require('fs')

const grammar = fs.readFileSync('grammar.ne', 'utf-8') // note that this is a *nearley* file
const parser = make(grammar, {
  // anything you want to expose to the grammar as variables
  // for example builtins or flavour settings
  output: 'Hello, World!'
})

const trees = parser.feed('the usual').results
const tree = trees[0]

// logs "Hello, World!"
console.log(tree)
```

```python
# grammar.ne
main -> "the usual" {% d => output %} # output the exposed "output" variable
```