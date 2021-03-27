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

async function main() {
  // Tweet Lookup API Reference: https://bit.ly/2QF58Kw
  const { data: tweet, errors } = await twitter.get("tweets", {
    ids: "1374898887710760966",
    tweet: {
      fields: [
        "created_at",
        "entities",
        "public_metrics",
        "author_id",
        "conversation_id",
        "in_reply_to_user_id",
      ],
    },
  });

  if (errors) {
    console.log("Errors:", errors);
    return;
  }

  console.log("Tweet:", tweet);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
