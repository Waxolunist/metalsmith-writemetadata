var extname = require('path').extname;
var dirname = require('path').dirname;
var basename = require('path').basename;

/**
 * Expose `plugin`.
 */
module.exports = plugin;


function plugin(){
  return function (files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      var data = {};
      var dir = dirname(file);
      var json = basename(file, extname(file)) + '.json';
      if ('.' != dir) json = dir + '/' + json;

      data.contents = new Buffer(JSON.stringify(files[file]));

      files[json] = data;
    });
  };
}
