const express = require("express");
const bodyParser = require("body-parser");
const baseRoute = require("./routes/baseRoute");
const validateRoute = require("./routes/validateRoute");
const { errorRes } = require("./helpers/messages");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(baseRoute);
app.use(validateRoute);

// Handle application errors
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500);
  errorRes.message = "Invalid JSON payload passed.";
  errorRes.data = null;
  res.json(errorRes);
});

// Handle 404 - Keep this as a last route
app.use(function(req, res, next) {
  res.status(404);
  res.send("404: File Not Found");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
