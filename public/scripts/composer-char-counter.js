$(document).ready(function() {
  var tweetInput = $("#tweet-input textarea");
  tweetInput.on('input', function (event) {
    var charCount = $(this).siblings(".counter");
    charCount.text(140 - ($(this).val().length));
    console.log(parseInt(charCount.text()));
    if (parseInt(charCount.text()) < 0) {
      charCount.css("color", "#ff0000");
    } else {
      charCount.css("color", "#244751");
    }
  });
});
