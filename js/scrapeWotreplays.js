const rp = require("request-promise");
const $ = require("cheerio");

async function getContestantStats(replayURLlist) {
  var statsArray = [];

  for (var i = 0; i < replayURLlist.length; i++) {
    var url = replayURLlist[i][0];
    var html = await getHTMLfromWotreplays(url);
    var [playerStats, gameTime] = getContestantGameInfo(html);
    var twitterUsername = replayURLlist[i][1];

    statsArray.push([playerStats, twitterUsername, gameTime]);
  }
  return statsArray;
}

async function getHTMLfromWotreplays(url) {
  return await rp(url[0]).catch(function (error) {
    console.log(error);
    return [];
  });
}

function getContestantGameInfo(html) {
  gamerTag = getGamertagFromHTML(html);
  playerList = getPlayerListFromHTML(html);
  gameTime = getGameTimeFromHTML(html);
  playerStats = getContestantStatsFromPlayerList(playerList, gamerTag);

  return [playerStats, gameTime];
}

function getGamertagFromHTML(html) {
  const userRegex = /([^\s]+)/g;
  const user = $(".replay-stats__username", html).text();
  const gamerTag = user.match(userRegex)[0];

  return gamerTag;
}

function getPlayerListFromHTML(html) {
  const regEx = /var roster = (\[.*?\]);/g;

  //gameStats now contains the data for every single
  //player in the match.
  const gameStats = html.matchAll(regEx);

  for (const match of gameStats) {
    //If we don't do match[1], the data will have 'var roster'
    //in front of it, and we can't JSON.parse. The actual JSON is group
    //1 from the regex, therefore match[1] is parsed.
    const playerList = JSON.parse(match[1]);

    return playerList;
  }
}

function getGameTimeFromHTML(html) {
  const timeStamp = $(".replay-stats__timestamp", html).text();
  console.log("Timestamp: " + timeStamp);

  return timeStamp;
}

function getContestantStatsFromPlayerList(playerList, gamerTag) {
  for (var i = 0; i < playerList.length; i++) {
    if (playerList[i].green.name == gamerTag) {
      return playerList[i].green;
    }
  }
}

module.exports = { getContestantStats: getContestantStats };
