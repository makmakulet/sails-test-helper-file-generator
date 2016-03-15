/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
_.defaults = require('merge-defaults');
var inflection = require('inflection');


module.exports = {

  validTypes: ["controller", "model", "service"],

  before: function (scope, next) {

    //override rootpath
    scope.rootPath = scope.rootPath + "/test/unit";

    if (!scope.args[0]) {
      return next( new Error('Please provide a test type.') );
    }

    //check if type is valid
    if (!_.includes(module.exports.validTypes, scope.args[0])) {
      return next(new Error('Invalid Test Type.'));
    }

    if (!scope.rootPath) {
      return next( INVALID_SCOPE_VARIABLE('rootPath') );
    }

    // Attach defaults
    _.defaults(scope, {
      createdAt: new Date()
    });

    //use directory
    var directory = inflection.pluralize(scope.args[0]) || "./";

    //set filename 
    var filename = scope.args[1] + (scope.args[0] == "controller" ? "Controller" : ""); //append `Controller` if needed
    var hasDirectory = filename.split("/");
    filename = hasDirectory.pop();

    filename = inflection.camelize(filename) + ".test.js";
    hasDirectory.push(filename);
    var filePath = hasDirectory.join("/");

    // Decide the output filename for use in targets below:
    scope.filename = directory + "/" + filePath;

    // Add other stuff to the scope for use in our templates:
    scope.whatIsThis = 'an example file created at ' + scope.createdAt;

    next();
  },



  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: {

    ':filename':  { template: 'test.template.js' }
  },

  templatesDirectory: require('path').resolve(__dirname, './templates')
};





/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  var DEFAULT_MESSAGE =
  'Issue encountered in generator "ut-helper":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `sails-generate-ut-helper`, please resolve this '+
  'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}
