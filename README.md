# sails-test-helper-file-generator
Unit test file generator for SailsJs App that uses sails-test-helper module


###install guide
in your sails application, add the following line to your package.json

```
$ npm install
```
###how to use
> sails generate test-file controller user     // will create test/unit/controllers/UserController.test.js

> sails generate test-file model user          // will create test/unit/models/User.test.js

> sails generate test-file service validation  // will create test/unit/services/Validation.test.js