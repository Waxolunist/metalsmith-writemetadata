var extname = require('path').extname;
var dirname = require('path').dirname;
var basename = require('path').basename;
var multimatch = require('multimatch');
var debug = require('debug')('metalsmith-writemetadata');
var jsonstringify = require('json-stringify-safe');

/**
 * Expose `plugin`.
 */
module.exports = plugin;


function plugin(opts){
  opts = opts || {};
  opts.pattern = opts.pattern || [];
  opts.ignorekeys = Array.isArray(opts.ignorekeys) ? opts.ignorekeys : [];
  return function (files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      if(multimatch(file, opts.pattern).length) {
        var data = {};
        var dir = dirname(file);
        var json = basename(file, extname(file)) + '.json';
        if ('.' != dir) json = dir + '/' + json;
        debug('Write file ' + json);

        data.contents = new Buffer(
          jsonstringify(
            files[file],
            function (k, v) {
              if (opts.ignorekeys.indexOf(k) < 0) {
                return v;
              }
              return undefined;
            } 
          )
        );

        files[json] = data;
      }
    });
  };
}

