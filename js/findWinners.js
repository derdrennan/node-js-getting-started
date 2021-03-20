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
  //Get all the replies for the selected tweet
  var replies = await twitterFetch.getTweetReplies(twitterURL);
  console.log(replies);
  //Grab the wotreplay.com URL from each reply
  var replayURLlist = await getWotReplayURLs(replies);
  //console.log("In find winners URL list: " + replayURLlist);
  //console.log("In find winners URL list length: " + replayURLlist.length);

  var contestantStatList = await getContestantStats(replayURLlist);
  const stringify = JSON.stringify(contestantStatList, null, 2);
  console.log("Contestant Stat List: " + stringify);

  //Set the params we will be returning to the view.
  //console.log(replies);
  const params = { replies, replayURLlist, stringify };

  response.render("pages/twitterResult", params);
}

module.exports = { setParams: setParams };
