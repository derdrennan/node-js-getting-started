const rp = require("request-promise");
const $ = require("cheerio");

async function getContestantStats(replayURLlist) {
  var statsArray = [];

  for (var i = 0; i < replayURLlist.length; i++) {
    //console.log("Inside first for loop");
    //console.log("Replay: " + replayURLlist[i]);
    console.log(replayURLlist[i][0]);
    var url = replayURLlist[i][0];

    var [playerList, userName] = await getPlayerListFromWotreplays(url);
    var playerStats = getContestantStatsFromPlayerList(playerList, userName);
    console.log(playerStats);
    statsArray.push(playerStats);
  }
  return statsArray;
}

async function getPlayerListFromWotreplays(url) {
  return await rp(url)
    .then(function (html) {
      //Scraping the username of the contestant
      //var userName = $('.link--white', html).text();
      const regEx = /var roster = (\[.*?\]);/g;
      const userRegex = /([^\s]+)/g;
      const user = $(".replay-stats__username", html).text();
      const userName = user.match(userRegex)[0];

      console.log("Username is: " + userName);

      //gameStats now contains the data for every single
      //player in the match.
      const gameStats = html.matchAll(regEx);

      for (const match of gameStats) {
        //If we don't do match[1], the data will have 'var roster'
        //in front of it, and we can't JSON.parse. The actual JSON is group
        //1 from the regex, therefore match[1] is parsed.
        const playerList = JSON.parse(match[1]);
        //console.log(obj);

        return [playerList, userName];
      }
    })
    .catch(function (error) {
      console.log(error);
      return [];
    });
}

function getContestantStatsFromPlayerList(playerList, userName) {
  for (var i = 0; i < playerList.length; i++) {
    if (playerList[i].green.name == userName) {
      console.log(playerList[i].green);
      return playerList[i].green;
    }
  }
}

module.exports = { getContestantStats: getContestantStats };
