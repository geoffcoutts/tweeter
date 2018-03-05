"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient   = require("mongodb").MongoClient;
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";
const cookieSession = require("cookie-session");

app.use(cookieSession({
  name: "session",
  keys: ["fajkdfhakjd"]
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);


  const DataHelpers = require("./lib/data-helpers.js")(db);

  const userHelpers = require("./lib/user-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  const registrationRoutes = require("./routes/registration")(userHelpers);

  // const loginRoutes = require("./routes/login")(userHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.use("/register", registrationRoutes);

  // app.use("/login", loginRoutes);

  app.listen(PORT, () => {
    console.log("Tweeter app listening on port " + PORT);
  });
});