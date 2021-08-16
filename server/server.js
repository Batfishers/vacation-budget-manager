const express = require("express");
const app = express();
const path = require("path");
const models = require("./models/vacationBudgetModels.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/testdb", (req, res) => {
  models.Test.create(req.body)
    .then(() => {
      return res.status(200).send('Added to DB. Check cluster')
    })
    .catch((err) => {
      return res.status(400).send('Error in testdb' + JSON.stringify(err));
    })
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
