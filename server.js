const express = require("express");
const bodyParser = require("body-parser");
const baseRoute = require("./routes/baseRoute");
const validateRoute = require("./routes/validateRoute");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(baseRoute);
app.use(validateRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
