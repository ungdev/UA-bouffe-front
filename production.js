/* eslint-disable */

require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(process.env.PORT);
console.log(`Node env: ${process.env.NODE_ENV}`);
console.log(`Listening on ${process.env.PORT}`);
