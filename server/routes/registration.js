"use strict";

const express       = require('express');
const registrationRoutes  = express.Router();

module.exports = function(userHelpers) {

  // Route for registration
  registrationRoutes.post("/", function(req, res) {
    if (!req.body.handle || !req.body.password) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    // Checks if handle is already registered.
    userHelpers.checkHandle(req.body.handle, (exists) => {
      if (exists === true) {
        res.status(400).json({ error: 'user already exists.'});
      } else {

        // If handle does not already exist, enters user in database.
        const newUser = {
          "handle": req.body.handle,
          "password": req.body.password,
          "name": req.body.handle
        };

        req.session.user_id = newUser.handle;
        userHelpers.register(newUser, (err) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.status(201).send();
          }
        });
      }
    });

  });


  return registrationRoutes;
};