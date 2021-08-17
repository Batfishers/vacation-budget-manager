const { User } = require("../models/vacationBudgetModels.js");
const path = require('path');
const userController = {};
const bcrypt = require('bcryptjs');



userController.createUser = (req, res, next) => {
  User.create(req.body)
    .then(() => {
      return next()
    })
    .catch((err) => {
      return next('Error in userController.createUser: ' + JSON.stringify(err));

    })
};


userController.verifyUser = (req, res, next) => {
  res.locals.verifyResponse = null;
  if (!req.body.username || !req.body.password) {
    res.locals.verifyResponse = 'Please enter a valid username and password.';
    return next();
  }
  User.findOne({username: req.body.username})
    .then((dbPassword) => {
      if (!dbPassword) {
        // user needs to sign up
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