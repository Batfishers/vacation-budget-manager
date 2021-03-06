const { User } = require("../models/vacationBudgetModels.js");
const path = require('path');
const userController = {};
const bcrypt = require('bcryptjs');

// Creates a user - edge cases for user inputs are not handled yet
userController.createUser = (req, res, next) => {
  User.create(req.body)
    .then(() => {
      // returns next without providing any information if addition to the database was successful
      return next()
    })
    .catch((err) => {
      return next('Error in userController.createUser: ' + JSON.stringify(err));

    })
};

// Verifies user password
userController.verifyUser = (req, res, next) => {
  // the verifyResponse property is used to pass a string response to the final middleware if the user needs to modify their inputs
  res.locals.verifyResponse = null;
  // check that the username and password fields are not empty
  if (!req.body.username || !req.body.password) {
    res.locals.verifyResponse = 'Please enter a valid username and password.';
    return next();
  }
  User.findOne({username: req.body.username})
    .then((dbPassword) => {
      // if there were no results when searching for the inputted username, user needs to sign up
      if (!dbPassword) {
        res.locals.verifyResponse = 'The inputted username does not exist in our system. Please check your spelling or sign up.';
        return next();
      };
      bcrypt.compare(req.body.password, dbPassword.password, (err, result) => {
        if (err) return next('Error in userController.verifyUser: ' + JSON.stringify(err));
        if (!result) {
          res.locals.verifyResponse = 'Incorrect password. Please try again.';
          return next();
        }
        return next();
      })

    })
    .catch((err) => {
      return next('Error in userController.verifyUser: ' + JSON.stringify(err));
    });

};



module.exports = userController;