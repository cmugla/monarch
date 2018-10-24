var { createMigration } = require('../util/');

var fs = require ('fs');
var path = require('path');
var { exec } = require ('child_process');

module.exports = filePath => {
  var component = require(path.resolve(filePath));

  exec(`ctf-migrate create ${component.content_type} -c ${component.content_type}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log('ctf-migrate error:', err);
      return;
    }

    // Success!
    console.log(stdout);

    const fileName = stdout.split('/')[stdout.split('/').length - 1].trim();

    fs.writeFile(`./migrations/${component.content_type}/${fileName}`, createMigration(component), function(err) {
      if(err) {
          return console.log('fs error:', err);
      }

      console.log("The file was updated!");
    });
  });
}
