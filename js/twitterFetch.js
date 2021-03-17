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
  
    //This is so I can get the user name and id_str to run the next query
    twitter.get('statuses/show', params, async function(error, tweets, response) {
    if (!error) {
      var name = tweets.user.screen_name;
      var id_str = tweets.id_str;
      
      //Searching tweets that match a specific username. Then we look at each one and if someone
      //replied to that tweet, the 'in_reply_to_status_id' will match the 'id_str' so we save those.
      twitter.get('search/tweets', { q: name, count: 100 }, async function(error, tweets, response) { 
        var counter = 0;

        if(!error) {
          //console.log(tweets);
          tweets.statuses.forEach(element => {
            counter ++;
          if (element.in_reply_to_status_id_str == id_str) {
            replies.push(element.text);
          }
          if (counter == tweets.statuses.length){
            resolve(replies);
          }
        }); 
        } else {
          console.log(error);
          reject(err);
        }
        //console.log(replies);
        //resolve(replies);
        //return await replies;

      });
    } else {
      console.log(error);
      reject(err);
    }
  });

  });
}

module.exports = { getTweetReplies:  getTweetReplies  };
