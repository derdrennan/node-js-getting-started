var Twitter = require("twitter-v2");
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

async function getTweetReplies(ID) {
  var params = ["conversation_id:" + ID];
  var replies = [];

  const { data: tweets, includes, meta, errors } = await twitter.get(
    "tweets/search/recent",
    {
      query: params,
      max_results: 10,
      tweet: {
        fields: ["entities", "author_id"],
      },
      expansions: ["author_id"],
    }
  );

  if (errors) {
    console.log("Errors:", errors);
    return;
  }

  //console.log(includes);

  tweets.forEach((tweet) => {
    if (!tweet?.entities?.urls?.[0]) {
      return;
    }

    //console.log(tweet);

    //If a person tweets multiple URLs in the same tweet, we will
    //look at each one, and only push it to the replies array if
    //it is a wotreplays.com URL. For now, we just assume the client
    //will sort the list and see if there are duplicate gamertags.
    for (let index = 0; index < tweet.entities.urls.length; index++) {
      const wotreplayURL = tweet.entities.urls[index].expanded_url;
      //console.log("URL: " + wotreplayURL);

      if (URLisToWotreplays(wotreplayURL)) {
        var username = "";
        includes.users.forEach((userObject) => {
          if (userObject.id == tweet.author_id) {
            username = userObject.username;
          }
        });

        replies.push([wotreplayURL, username]);
      }
    }
  });

  //console.log(meta);

  return replies;
}

if (require.getTweetReplies === module) {
  getTweetReplies(ID).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

function URLisToWotreplays(url) {
  const regex = /(https?|ftp):\/\/wotreplays.eu?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?(?=\s|$)/;

  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
}

module.exports = { getTweetReplies: getTweetReplies };
