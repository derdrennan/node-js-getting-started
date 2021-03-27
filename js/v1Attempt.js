var Twitter = require("twitter");
require("dotenv/config");

const apikey = process.env.apikey;
const apikeysecret = process.env.apikeysecret;
const accesstoken = process.env.accesstoken;
const accesstokensecret = process.env.accesstokensecret;

var twitter = new Twitter({
  consumer_key: apikey,
  consumer_secret: apikeysecret,
  access_token_key: accesstoken,
  access_token_secret: accesstokensecret,
});

function getTweetReplies(ID) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("ID is: " + ID);
      var [name, id_str] = await statusesShow(ID);
      var replies = await searchTweets(name, id_str);

      if (replies.length >= 1) {
        resolve(replies);
      } else {
        console.log(error);
        reject("No replay links were found");
      }
    } catch (error) {
      console.log(error);
    }
  });
}

async function statusesShow(ID) {
  console.log("Inside statusesShow. ID: " + ID);
  //Find a username and id_str associated with the given tweet ID
  var params = { id: ID };
  console.log("params: " + params);
  twitter.get(
    "statuses/show",
    params,
    async function (error, tweets, response) {
      if (!error) {
        var name = tweets.user.screen_name;
        var id_str = tweets.id_str;
        console.log("Name and ID_STR: " + name + " " + id_str);

        return [name, id_str];
      } else {
        console.log(error);
        return [];
      }
    }
  );
}

async function searchTweets(name, id_str) {
  //Searching tweets that match a specific username. Then we look at each one and if someone
  //replied to that tweet, the 'in_reply_to_status_id' will match the 'id_str' so we save those.
  var replies = [];
  console.log(
    "Inside searchTweets. Name and IDSTR are: " + name + " " + id_str
  );
  twitter.get(
    "search/tweets",
    { q: name, count: 100, fields: "entities" },
    async function (error, tweets, response) {
      var counter = 0;

      if (!error) {
        tweets.statuses.forEach((element) => {
          //console.log(element);
          counter++;
          if (element.in_reply_to_status_id_str == id_str) {
            //replies.push(element.text);
            //console.log(element.entities.urls[0].expanded_url);
            replies.push([
              element.entities.urls[0].expanded_url,
              element.user.screen_name,
            ]);
          }
          if (counter == tweets.statuses.length) {
            //console.log('Right before the return: ' + replies);
            return replies;
          }
        });
      } else {
        console.log(error);
        return [];
      }
    }
  );
}

module.exports = { getTweetReplies: getTweetReplies };







async function getTweetReplies(ID) {
  return new Promise((resolve, reject) => {
    var params = { id: ID };
    var replies = [];

    //Get the info needed for the second query
    twitter.get(
      "statuses/show",
      params,
      async function (error, tweets, response) {
        if (!error) {
          var name = tweets.user.screen_name;
          var id_str = tweets.id_str;
          //console.log(tweets);

          //Searching tweets that match a specific username. Then we look at each one and if someone
          //replied to that tweet, the 'in_reply_to_status_id' will match the 'id_str' so we save those.
          twitter.get(
            "search/tweets",
            { q: name, count: 100, fields: "entities" },
            async function (error, tweets, response) {
              var counter = 0;

              if (!error) {
                tweets.statuses.forEach((element) => {
                  //console.log(element);
                  counter++;
                  if (element.in_reply_to_status_id_str == id_str) {
                    //replies.push(element.text);
                    //console.log(element.entities.urls[0].expanded_url);
                    replies.push([
                      element.entities.urls[0].expanded_url,
                      element.user.screen_name,
                    ]);
                  }
                  if (counter == tweets.statuses.length) {
                    //console.log('Right before the return: ' + replies);
                    resolve(replies);
                  }
                });
              } else {
                console.log(error);
                reject(err);
              }
            }
          );
        } else {
          console.log(error);
          reject(err);
        }
      }
    );
  });
}

module.exports = { getTweetReplies: getTweetReplies };