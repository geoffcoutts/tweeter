/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];


$(document).ready(function() {

  function renderTweets (tweets) {
    let test = $(`.container`).children().length;
    if ($(`.container`).children().length === 1) {
      tweets.forEach(function (tweetData) {
        createTweetElement(tweetData).appendTo($(`.container`));
      });
    } else {
      createTweetElement(tweets[tweets.length - 1]).appendTo($(`.container`));
    }
  }

  function createTweetElement (tweetData) {
    let daysAgo = timePassed(tweetData.created_at);
    let $tweet =
        $("<article class='tweet'>")
        .append($("<header>")
          .append($("<div class='avatar'>")
            .append($(`<img class='profile-picture' src='${tweetData.user.avatars.regular}'>`)
            )
            .append($(`<h2 class='profile-name'>${tweetData.user.name}</h2>`)
            )
          )
          .append($("</div>")
          )
          .append($(`<span class='handle'>${tweetData.user.handle}</span>`)
          )
        )
        .append($("</header>")
        )
        .append($(`<div><p>${tweetData.content.text}</p></div>`)
        )
        .append($(`<hr/>`)
        )
        .append($(`<footer>`)
          .append($(`<span class='days-back'>${daysAgo}</span>`)
          )
          .append($(`<div class='tweetButtons'>`)
            .append($(`<img src='../images/tweetFlag.png'>`)
            )
            .append($(`<img src='../images/tweetRetweet.png'>`)
            )
            .append($(`<img src='../images/tweetLike.png'>`)
            )
          )
          .append($(`</div>`)
          )
        )
        .append($(`</footer>`)
        );
    return $tweet;
  }


  // renderTweets(data);

  function loadTweets () {
    $.ajax({
      url: "/tweets/",
      method: "GET",
      dataType: "json",
      })
      .done(function (jsonData) {
        renderTweets (jsonData);
    });
  }

  loadTweets();

  // EVENT HANDLERS

  $("#tweet-input").on('submit', function(event) {
    event.preventDefault();
    function showAlert(message) {
      window.alert(message);
    }
    let newTweet = $("#tweet-input")[0][0].value;
    if (newTweet === "") {
      showAlert("Your tweet is empty!");
    } else if (newTweet.length > 140){
      showAlert("Your tweet is too long!");
    } else {
      let formData = $("#tweet-input").serialize();
      $.post("/tweets/", formData)
      .done(loadTweets());
    }
  });

});


  function timePassed (dateString) {
    let time = Date.now() - dateString;
    // return time
    if (time < 60000 ) {
      return `Moments ago`;
    } else if (time >= 60000 && time < 3600000) {
      return `${Math.floor(time / 1000 / 60)} minutes ago`;
    } else if (time >= 3600000 && time < 86400000) {
      return `${Math.floor(time / 1000 / 60 / 60)} hours ago`;
    } else if (time >= 86400000 && time < 31540000000) {
      return `${Math.floor(time / 1000 / 60 / 60 / 24)} days ago`;
    } else if (time >= 31540000000) {
      return `${Math.floor(time / 31540000000)} years ago`;
    }

  }
