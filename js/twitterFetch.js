var Twitter = require('twitter');
require('dotenv/config');
 
// const apikey = process.env.apikey;
// const apikeysecret = process.env.apikeysecret;
// const accesstoken = process.env.accesstoken;
// const accesstokensecret = process.env.accesstokensecret;

//console.log(apikey, apiSecretKey, accessToken, accessTokenSecret);

// var twitter = new Twitter({
//   consumer_key: apikey,
//   consumer_secret: apikeysecret,
//   access_token_key: accesstoken,
//   access_token_secret: accesstokensecret
// });

var twitter = new Twitter({
  consumer_key: process.env.apikey,
  consumer_secret: process.env.apikeysecret,
  access_token_key: process.env.accesstoken,
  access_token_secret: process.env.accesstokensecret
});

function showdownParams(request, response) {
  var xp = request.query.xp;
  var twitterURL = request.query.twitterURL;
  var startDate = request.query.startDate;
  var endDate = request.query.endDate;
}
 
//var params = {screen_name: 'TRUvoodoo'};

//ID for a Tweet that we are using just for testing purposes
var params = {id: '1370567494885208066'};
var replies=[];

//This is so I can get the user name and id_str to run the next query
twitter.get('statuses/show', params, function(error, tweets, response) {
  if (!error) {
    //console.log(tweets);
    var name = tweets.user.screen_name;
    var id_str = tweets.id_str;
    
    //Searching tweets that match a specific username. Then we look at each one and if someone
    //replied to that tweet, the 'in_reply_to_status_id' will match the 'id_str' so we save those.
    twitter.get('search/tweets', { q: name, result_type: 'recent', count: 1000 }, function(error, tweets, response) { 
      if(!error) {
       console.log(tweets);
       tweets.statuses.forEach(element => {
         if (element.in_reply_to_status_id_str == id_str) {
           replies.push(element.text);
         }
       });

       console.log(replies);

      } else {
        console.log(error);
      }
    });
  } else {
    console.log(error);
  }

  console.log(replies);
  //getWotReplayURLs(replies);

});



