$(document).ready(function() {

  // *******************
  // *DISPLAY SCRIPTING*
  // *******************

  // Toggles display of compose tweet box when clicking compose button in nav bar
  $("#compose").click(function() {
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").focus();
  });

  // Function to pass information from database to createTweetElement. Prepends the result to #tweet-container.
  function renderTweets (tweets) {
    // Checks if #tweet-container is empty (page load). if it is, will run through entire database of tweets and display them.
    if ($(`#tweet-container`).children().length === 0) {
      tweets.forEach(function (tweetData) {
        createTweetElement(tweetData).prependTo($(`#tweet-container`));
      });
    // On creation of new tweet, will post the newly created to the top of page.
    } else {
      createTweetElement(tweets[tweets.length - 1]).prependTo($(`#tweet-container`));
    }
  }

  // Creates new tweet article to be used by the renderTweets function.
  function createTweetElement (tweetData) {
    let daysAgo = timePassed(tweetData.created_at);
    let $tweet =
        $(`<article class='tweet'>`)
        .append($("<header>")
          .append($(`<div class='avatar'>`)
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
        .append($(`<div class="tweet-text"><p>${escape(tweetData.content.text)}</p></div>`)
        )
        .append($(`<hr/>`)
        )
        .append($(`<footer>`)
          .append($(`<span class='days-back'>${daysAgo}</span>`)
          )
          .append($(`<div class='tweetButtons'>`)
            .append($(`<i class='fas fa-flag'></i>`)
            )
            .append($(`<i class='fas fa-retweet'></i>`)
            )
            .append($(`<i class='fas fa-heart'></i>`)
            )
          )
          .append($(`</div>`)
          )
        )
        .append($(`</footer>`)
        );
    return $tweet;
  }

  // Submit new tweet on enter keypress when .new-tweet textarea is in focus.
  if ($(".new-tweet textarea").focus()) {
    $(".new-tweet textarea").on("keypress", function(event) {
      let key = event.key;
      if (key ===  "Enter") {
        $(".new-tweet textarea").submit();
      }
    });
  }

  // **************
  // *AJAX METHODS*
  // **************

  // Function that calls an AJAX request to load tweets onto the page with the renderTweets function. Autonomous so fires on page load, otherwise when called by the new tweet event handler.
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

  // AJAX request for new tweet
  $("#tweet-input").on('submit', function(event) {
    event.preventDefault();

    // Handles situations of a tweet being too long or empty by displaying a popup and not submitting the tweet. Else, sends the formData to be handled by loadTweets.
    let newTweet = $("#tweet-input")[0][0].value;
    if (newTweet === "") {
      alert("Your tweet is empty!");
    } else if (newTweet.length > 140){
      alert("Your tweet is too long!");
    } else {
      let formData = $("#tweet-input").serialize();
      $.post("/tweets/", formData)
      .done(function (result) {
        loadTweets();
      });
    }
  });
});

// ********************
// *RESOURCE FUNCTIONS*
// ********************

// Escape function to prevent cross-site scripting
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Function to calculate time since tweet was created. Takes in millisecond date string from tweet database as argument. Will change depending on length of time
function timePassed (dateString) {
  let time = Date.now() - dateString;
  if (time < 60000 ) {
    return `Moments ago`;
  } else if (time >= 60000 && time < 3600000) {
    return `${Math.floor(time / 60000)} minutes ago`;
  } else if (time >= 3600000 && time < 86400000) {
    return `${Math.floor(time / 3600000)} hours ago`;
  } else if (time >= 86400000 && time < 31540000000) {
    return `${Math.floor(time / 86400000)} days ago`;
  } else if (time >= 31540000000) {
    return `${Math.floor(time / 31540000000)} years ago`;
  }

}
