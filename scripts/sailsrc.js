var sailsRc = process.cwd() + "/../../.sailsrc";

fs = require("fs");
fs.readFile(sailsRc, 'utf8', function (err,data) {
  if (err) {
    return console.log(".sailsrc is not found on the main app, please create the .sailsrc file on the root path of your app");
  }
  try {
    var sailsRcConfig = JSON.parse(data);
    var generators = sailsRcConfig.generators || {};
    var modules = generators.modules || {};
    modules["test-file"] =  "sails-test-helper-file-generator"
    generators.modules = modules;
    sailsRcConfig.generators = generators;
    var newConfig = JSON.stringify(sailsRcConfig, null, 2);
    fs.writeFile(sailsRc, newConfig, function (err) {
      if (err) {
        console.log(" Error writing in .sailsrc");
        return console.log(err);
      }
      console.log("Updated .sailsrc new config: ");
      return console.log(newConfig);
    });
  } catch (e) {
    console.log(" Error parsing .sailsrc file ");
    return console.log(e);
  }
});