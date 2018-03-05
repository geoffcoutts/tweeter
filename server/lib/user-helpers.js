"use strict";



module.exports = function makeUserHelpers(db) {
  return {

    checkHandle: function(handle, callback) {
      db.collection("users").findOne({"handle": handle}, (err, result) => {
        if (err) throw err;
        if (result) {
          console.log(result);
          callback(true);
        } else {
          callback(false);
        }
      });
    },

    // Saves a user to `db.users`
    register: function(newUser, callback) {
      // simulateDelay(() => {
        db.collection("users").insertOne(newUser);
        callback(null, true);
      // });
    },

    // Get all tweets in `db`, sorted by newest first
    login: function(callback) {
      // simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        db.collection("tweets").find().toArray((err, tweets) => {
          if (err) {
            throw err;
          }
          callback(null, tweets.sort(sortNewestFirst));
        });


      // });
    }

  };
};