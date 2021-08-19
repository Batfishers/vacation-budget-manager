const express = require("express");
const app = express();
const path = require("path");
const models = require("./models/vacationBudgetModels.js");
const userController = require('./controllers/userController');
const oauthRouter = require('./routes/oauthRouter');
const url = require('url');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use('/oauth', oauthRouter);

app.use("/build", express.static(path.join(__dirname, "../build")));
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

app.use((err, req, res, next) => {
  console.log('Global', err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000);
