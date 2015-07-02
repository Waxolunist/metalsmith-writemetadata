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

Accepts an array of keys to ignore in the output. These keys are ignored regardless of where in the object hierarchy they appear.


#### childIgnorekeys

```js
Metalsmith(__dirname)
.use(writemetadata({
  childIgnorekeys: ['next', 'previous', 'content']
}));
```

Accepts an array of keys to ignore in the output if they are not a part of the root object.

#### bufferencoding

**Since: 0.4.3**  
**Default: false**  
**See: [Buffer.toString](https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end)**  
**Resolves: [Issue #1](https://github.com/Waxolunist/metalsmith-writemetadata/issues/1)**  

```js
Metalsmith(__dirname)
.use(writemetadata({
  bufferencoding: 'utf8'
}));
```

If this value is set, the contents field which is internally represented as a Buffer, will be converted to a string 
by calling the method Buffer.toString with the encoding specified in the options.

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
      output: {
        path: 'content/projects.json',
        asObject: true,
        metadata: {
          "type": "list"
        }
      },
      ignorekeys: ['contents', 'next', 'previous']
    }
  }
}))
```

##### collections.output

output is a parameter for collections, determining the desired output. If **asObject** is false, an array will be output. Otherwise a object in following format (taking example from above):

```js
{
  name: 'projects',
  total: 9,
  type: 'list',
  result: [...]
  
}
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
  bufferencoding: 'utf8',
  collections: {
    projects: {
      output: {
        path: 'content/projects.json',
        asObject: true,
        metadata: {
          "type": "list"
        }
      },
      ignorekeys: ['contents', 'next', 'previous']
    }
  }
}))
```

## License

MIT
