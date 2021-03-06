const twitterFetch = require("./twitterFetch.js");
const { getWotReplayURLs } = require("./getURLfromReplies.js");
const { getContestantStats } = require("./scrapeWotreplays.js");
const util = require("util");

function setParams(request, response) {
  //var xp = request.query.xp;
  var twitterURL = request.query.twitterURL;
  //var startDate = request.query.startDate;
  //var endDate = request.query.endDate;

  findWinners(response, twitterURL);
}

//new test tweet ID: 1374866154372534279
//Invalid replay Tweet: 1377693974446501888
//Newest tweet: 1378052228804571138

async function findWinners(response, twitterURL) {
  var listOfReplies = await twitterFetch.getTweetReplies(twitterURL);
  //console.log("ListofReplies: " + listOfReplies);

  var replayURLlist = await getWotReplayURLs(listOfReplies);
  //console.log("replayURLlist: " + replayURLlist);

  var playerStats = await getContestantStats(replayURLlist);
  //console.log("playerStats: " + playerStats);

  //Set the params we will be returning to the view.
  const params = { playerStats };

  response.render("pages/twitterResult", params);
}

module.exports = { setParams: setParams };
