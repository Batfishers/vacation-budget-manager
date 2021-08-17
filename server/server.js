const express = require("express");
const app = express();
const path = require("path");
const models = require("./models/vacationBudgetModels.js");
const userController = require('./controllers/userController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/testdb', (req, res) => {
  models.Test.create(req.body)
    .then(() => {
      return res.status(200).send('Added to DB. Check cluster')
    })
    .catch((err) => {
      return res.status(400).send('Error in testdb' + JSON.stringify(err));
    })
});

app.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json({success: true});
});

app.post('/login', userController.verifyUser, (req, res) => {
  let responseToClient;
  if (res.locals.verifyResponse) {
    responseToClient = res.locals.verifyResponse;
  } else {
    responseToClient = {
      success: true
    };
  }
  return res.status(200).json(responseToClient);
});

app.use("/build", express.static(path.join(__dirname, "../build")));
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

app.use((err, req, res, next) => {
  console.log('Global', err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000);
