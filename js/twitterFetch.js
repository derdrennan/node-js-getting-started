var Twitter = require('twitter');
require('dotenv/config');
 
const apikey = process.env.apikey;
const apikeysecret = process.env.apikeysecret;
const accesstoken = process.env.accesstoken;
const accesstokensecret = process.env.accesstokensecret;

var twitter = new Twitter({
  consumer_key: apikey,
  consumer_secret: apikeysecret,
  access_token_key: accesstoken,
  access_token_secret: accesstokensecret
});

async function getTweetReplies(ID) {

  return new Promise((resolve, reject) => {
    var params = {id: ID};
    var replies=[];
  
    //Get the info needed for the second query
    twitter.get('statuses/show', params, async function(error, tweets, response) {
    if (!error) {
      var name = tweets.user.screen_name;
      var id_str = tweets.id_str;
      //console.log(tweets);
      
      //Searching tweets that match a specific username. Then we look at each one and if someone
      //replied to that tweet, the 'in_reply_to_status_id' will match the 'id_str' so we save those.
      twitter.get('search/tweets', { q: name, count: 100, fields: "entities" }, async function(error, tweets, response) { 
        var counter = 0;

        if(!error) {
          tweets.statuses.forEach(element => {
            //console.log(element);
            counter ++;
          if (element.in_reply_to_status_id_str == id_str) {
            //replies.push(element.text);
            //console.log(element.entities.urls[0].expanded_url);
            replies.push(element.entities.urls[0].expanded_url);
          }
          if (counter == tweets.statuses.length){
            //console.log('Right before the return: ' + replies);
            resolve(replies);
          }
        }); 
        } else {
          console.log(error);
          reject(err);
        }
      });
    } else {
      console.log(error);
      reject(err);
    }
  });
  });
}

module.exports = { getTweetReplies:  getTweetReplies  };
