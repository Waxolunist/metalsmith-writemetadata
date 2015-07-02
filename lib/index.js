var extname = require('path').extname;
var dirname = require('path').dirname;
var basename = require('path').basename;
var multimatch = require('multimatch');
var debug = require('debug')('metalsmith-writemetadata');
var circularjson = require('circular-json');
var extend = require('node.extend');

/**
 * Expose `plugin`.
 */
module.exports = plugin;


function plugin(opts){
  opts = opts || {};
  opts.pattern = opts.pattern || [];
  opts.ignorekeys = Array.isArray(opts.ignorekeys) ? opts.ignorekeys : [];
  opts.childIgnorekeys = Array.isArray(opts.childIgnorekeys) ? opts.childIgnorekeys : [];
  opts.collections = opts.collections || {};
  opts.space = opts.space || '';
  opts.bufferencoding = opts.bufferencoding || false;
  return function (files, metalsmith, done){
    var metadata = metalsmith.metadata();
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      if(multimatch(file, opts.pattern).length) {
        var data = {};
        var dir = dirname(file);
        var json = basename(file, extname(file)) + '.json';
        if ('.' != dir) json = dir + '/' + json;
        debug('Write file ' + json);
  
        if(opts.bufferencoding && files[file] && files[file].contents && files[file].contents instanceof Buffer) {
          files[file].contents = files[file].contents.toString(opts.bufferencoding); 
        }
        data.contents = new Buffer(
          circularjson.stringify(
            files[file],
            function (k, v) {
              if (opts.ignorekeys.indexOf(k) > -1 || (this !== files[file] && opts.childIgnorekeys.indexOf(k) > -1)) {
                return undefined;
              }
              return v;
            }, 
            opts.space
          )
        );

        files[json] = data;
      }
    });

      
    Object.keys(opts.collections).forEach(function(key) {
      var collection = metadata.collections[key];
      var config = opts.collections[key] || {};
      var data = {};
      if(collection) {
        config.ignorekeys = Array.isArray(config.ignorekeys) ? config.ignorekeys : [];
        config.output = config.output || {};
        config.output.path = config.output.path || key + '.json';
        config.output.asObject = config.output.asObject || false;
        config.output.metadata = config.output.metadata || {};
        debug('Write metadata for collection ' + key);

        var contents = collection;
        if(config.output.asObject) {
          contents = {};
          contents.name = key;
          contents.total = collection.length;
          if(opts.bufferencoding) {
            for(var i in collection) {
              if(collection[i] && collection[i].contents && collection[i].contents instanceof Buffer) {
                collection[i].contents =  collection[i].contents.toString(opts.bufferencoding); 
              }
            }
          }
          contents.result = collection;
          contents = extend(contents, config.output.metadata);
        } 
        data.contents = new Buffer(
          circularjson.stringify(
            contents,
            function (k,v) {
              if(config.ignorekeys.indexOf(k) > -1) {
                return undefined;
              }
              return v;
            },
            opts.space
          )
        );
        files[config.output.path] = data;
      }
    });
  };
}



