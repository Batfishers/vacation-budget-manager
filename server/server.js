const express = require("express");
const app = express();
const path = require("path");
const models = require("./models/vacationBudgetModels.js");
const userController = require('./controllers/userController');
const oauthRouter = require('./routes/oauthRouter');
const { User } = require("./models/vacationBudgetModels.js");
const session = require('express-session');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

passport.use(new GitHubStrategy({
  clientID: '5ad5082847b00373784f',
  clientSecret: 'c014414702e7b726a087836e2f3eef9864db1f64',
  callbackURL: 'http://localhost:8080/oauth/github/callback',
},
async function(accessToken, refreshToken, profile, done) {
  try {
    User.findOne({ username: profile.id }, function (err, user) {
      return done(err, user);
    });
  } catch (error) {
    User.create({ username: profile.id, password: 'badPassSecurity' }, function (err, user) {
      return done(err, user);
  })}
}));

app.get('/oauth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
});

app.get('/oauth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

// this is just for testing the database
app.post('/testdb', (req, res) => {
  models.Test.create(req.body)
    .then(() => {
      return res.status(200).send('Added to DB. Check cluster')
    })
    .catch((err) => {
      return res.status(400).send('Error in testdb' + JSON.stringify(err));
    })
});

// returns an object if user successfully added to database
app.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json({success: true});
});

app.post('/login', userController.verifyUser, (req, res) => {
  let responseToClient;
  if (res.locals.verifyResponse) {
    // returns a string to display to the user if there was an issue verifying the password.
    responseToClient = res.locals.verifyResponse;
  } else {
    // Returns an object if authentication was successful
    responseToClient = {
      success: true
    };
  }
  return res.status(200).json(responseToClient);
});

app.delete('/user', userController.deleteUser, (req, res) => {
  res.status(200).json((res.locals.deleted) ? 'User deleted.' : 'No user found with that username.');
});

// app.use('/oauth', oauthRouter);

app.use("/build", express.static(path.join(__dirname, "../build")));
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

app.use((err, req, res, next) => {
  console.log('Global', err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000);
