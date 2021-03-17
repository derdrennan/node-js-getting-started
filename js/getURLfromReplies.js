function getWotReplayURLs(replies){
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
  
  const tweet = 'Here is my replay http://wotreplays.eu/site/5801309#live_oaks-tru_voodoo-manticore';
  
  // /g needed at end of regex or it will throw an error when used with matchAll
  const regEx = /(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?(?=\s|$)/g;
  
  var tweetArray = [];
  
  repliesToTweet.forEach(element => {
     const url = element.match(regEx);
     tweetArray.push(url);
  });
  
  return tweetArray;
  //console.log(tweetArray);
}

module.exports = { getWotReplayURLs: getWotReplayURLs };