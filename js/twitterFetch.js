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
  var params = "conversation_id:" + ID;
  var replies = [];

  const { data: tweets, meta, errors } = await twitter.get(
    "tweets/search/recent",
    {
      query: params,
      max_results: 10,
      tweet: {
        fields: ["created_at", "entities", "author_id", "conversation_id"],
      },
    }
  );

  if (errors) {
    console.log("Errors:", errors);
    return;
  }

  for (const tweet of tweets) {
    //If the tweet doesn't have a URL, skip to the next one
    if (!tweet?.entities?.urls?.[0]) {
      continue;
    }

    //If a person tweets multiple URLs in the same tweet, we will
    //look at each one, and only push it to the replies array if
    //it is a wotreplays.com URL.
    for (let index = 0; index < tweet.entities.urls.length; index++) {
      const element = tweet.entities.urls[index].expanded_url;
      var bool = verifyURLisToWotreplay(element);

      if (bool == true) {
        replies.push([element, "username"]);
      } else {
        continue;
      }
    }
  }

  console.log(meta);

  return replies;
}

if (require.getTweetReplies === module) {
  getTweetReplies(ID).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

function verifyURLisToWotreplay(url) {
  const regex = /(https?|ftp):\/\/wotreplays.eu?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?(?=\s|$)/;

  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
}

module.exports = { getTweetReplies: getTweetReplies };
