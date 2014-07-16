# metalsmith-writemetadata

A metalsmith plugin to write the metadata excerpted from the files to the filesystem as json files.

## Installation

    $ npm install metalsmith-writemetadata

## Usage

```js
var writemetadata = require('metalsmith-writemetadata');

Metalsmith(__dirname)
.use(writemetadata());
```

### Parameter

#### pattern

```js
Metalsmith(__dirname)
.use(writemetadata({
  pattern: ['*.md', '*.html']
}));
```

Accepts as paramater a pattern like in [multimatch](https://github.com/sindresorhus/multimatch).

#### ignorekeys

```js
Metalsmith(__dirname)
.use(writemetadata({
  ignorekeys: ['next', 'previous']
}));
```

Accepts an array of keys to ignore in the output.

#### collections

If used together with the collections plugin, this plugin can also write collections.

```js
Metalsmith(__dirname)
.use(collections({
  projects: {
    pattern: 'content/projects/*.html'
  }
}))
.use(writemetadata({
  collections: {
    projects: {
      output: 'content/projects.json',
      ignorekeys: ['contents', 'next', 'previous']
    }
  }
}))
```
## Complete example

This example is from a real world example:

```js
Metalsmith(__dirname)
.source('./resources')
.destination('./build')
.use(ignore([
  '**/.bower.json',
  '**/*.gzip'
]))
.use(markdown())
.use(collections({
  projects: {
    pattern: 'content/projects/*.html'
  }
}))
.use(writemetadata({
  pattern: ['**/*.html'],
  ignorekeys: ['next', 'previous'],
  collections: {
    projects: {
      output: 'content/projects.json',
      ignorekeys: ['contents', 'next', 'previous']
    }
  }
}))
```

## License

MIT
