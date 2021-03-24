async function getWotReplayURLs(replies) {
  return new Promise((resolve, reject) => {
    //For testing
    // const repliesToTweet = [
    //   'http://wotreplays.eu/site/5801309#live_oaks-tru_voodoo-manticore',
    //   'Here is my replay http://wotreplays.eu/site/5387887#paris-tru_voodoo-object_430u test',
    //   'crazy http://wotreplays.eu/site/5583053#steppes-tru_voodoo-amx_13_105 game',
    //   'testtestesttesttesttesttesttesttesttest http://wotreplays.eu/site/5578960#paris-tru_voodoo-type_59_g',
    //   'http random http://wotreplays.eu/site/5391223#karelia-tru_voodoo-object_430u ddd',
    //   'wotreplays.eu http://wotreplays.eu/site/5380372#pilsen-tru_voodoo-fv215b_183',
    //   'wotreplays.com http://wotreplays.eu/site/5300373#el_halluf-tru_voodoo-object_430u',
    //   'http://wotreplays.eu/site/5277092#fjords-tru_voodoo-kampfpanzer_50_t word'
    // ];

    //const tweet = 'Here is my replay http://wotreplays.eu/site/5801309#live_oaks-tru_voodoo-manticore';
    const regEx = /(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?(?=\s|$)/g;

    var tweetArray = [];
    var counter = 0;

    try {
      replies.forEach((element) => {
        counter++;
        const url = element[0].match(regEx);
        const twitterUsername = element[1];
        //console.log("URL" + url);
        //console.log("twitteruser" + twitterUsername);
        tweetArray.push([url, twitterUsername]);
        //console.log("TweetArray in geturl: " + tweetArray);

        if (counter == replies.length) {
          resolve(tweetArray);
        }
      });
    } catch (error) {
      reject(error);
    }
    //console.log(tweetArray);
  });
}

module.exports = { getWotReplayURLs: getWotReplayURLs };
