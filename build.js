// deps
const fs = require('fs');
const path = require('path');
// vars
const srcPath = './src';

function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
      var pathname = path.join(dir, file);
      var htmlFile = pathname.match(/\.html$/);
      if (fs.statSync(pathname).isDirectory()) {
          travel(pathname, callback);
      } else {
          callback(htmlFile);
      }
  });
}
travel(srcPath,function(pathname){
  console.log(pathname);
});