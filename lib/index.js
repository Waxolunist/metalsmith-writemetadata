var extname = require('path').extname;
var dirname = require('path').dirname;
var basename = require('path').basename;
var multimatch = require('multimatch');
var debug = require('debug')('metalsmith-writemetadata');

/**
 * Expose `plugin`.
 */
module.exports = plugin;


function plugin(opts){
  opts = opts || {};
  opts.pattern = opts.pattern || [];
  return function (files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      if(multimatch(file, opts.pattern).length) {
        var data = {};
        var dir = dirname(file);
        var json = basename(file, extname(file)) + '.json';
        if ('.' != dir) json = dir + '/' + json;
        debug('Write file ' + json);

        data.contents = new Buffer(JSON.stringify(files[file]));

        files[json] = data;
      }
    });
  };
}
