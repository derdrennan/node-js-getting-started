const twitterFetch = require("./twitterFetch.js");
const { getWotReplayURLs } = require("./getURLfromReplies.js");
const { getContestantStats } = require("./scrapeWotreplays.js");
const util = require("util");

function setParams(request, response) {
  var xp = request.query.xp;
  var twitterURL = request.query.twitterURL;
  var startDate = request.query.startDate;
  var endDate = request.query.endDate;

  findWinners(response, xp, twitterURL, startDate, endDate);
}

//test twitter ID: 1372356771478528003;

async function findWinners(response, xp, twitterURL, startDate, endDate) {
  var listOfReplies = await twitterFetch.getTweetReplies(twitterURL);

  var replayURLlist = await getWotReplayURLs(listOfReplies);

  var playerStats = await getContestantStats(replayURLlist);
  const stringify = JSON.stringify(playerStats, null, 2);

  //Set the params we will be returning to the view.
  const params = { playerStats };

  //response.render("pages/twitterResult", params);
  response.render("pages/twitterResult", params);
}

module.exports = { setParams: setParams };
