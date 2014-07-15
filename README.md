# metalsmith-writemetadata

A metalsmith plugin to write the metadata excerpted from the files to the filesystem as json files.

## Installation

    $ npm install metalsmith-writemetadata

## Usage

```js
var writemetadata = require('metalsmith-writemetadata');

Metalsmith.use(writemetadata());
```

### Parameter

#### pattern

```js
Metalsmith.use(writemetadata({
  pattern: ['*.md', '*.html']
}));
```

Accepts as paramater a pattern like in [multimatch](https://github.com/sindresorhus/multimatch).

#### ignorekeys

```js
Metalsmith.use(writemetadata({
  ignorekeys: ['next', 'previous']
}));
```

Accepts an array of keys to ignore in the output.

## License

MIT
