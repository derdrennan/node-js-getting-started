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
  try {
    const userRegex = /([^\s]+)/g;
    const user = $(".replay-stats__username", html).text();
    const gamerTag = user.match(userRegex)[0];

    return gamerTag;
  } catch (error) {
    //If the username isn't found, that means the replay data
    //is null, so we will return invalid which we can check later.
    //Example of bad replay: http://wotreplays.eu/site/5834962#highway-tru_voodoo-t49
    gamerTag = null;
    return gamerTag;
  }
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
  try {
    const timeStamp = $(".replay-stats__timestamp", html).text();
    return timeStamp;
  } catch (error) {
    timeStamp = "N/A";
    return timeStamp;
  }
}

function getContestantStatsFromPlayerList(playerList, gamerTag) {
  for (var i = 0; i < playerList.length; i++) {
    //This handles the issue of a user submitting a
    //replay, but they left the game early so the HTML
    //is different, and all game stats are null.
    //Example of a bad replay: http://wotreplays.eu/site/5834962#highway-tru_voodoo-t49
    if (gamerTag == null) {
      var invalidReplay = {
        name: "N/A",
        xp: "N/A",
        tank: "N/A",
      };
      return invalidReplay;
    }

    if (playerList[i].green.name == gamerTag) {
      console.log(playerList[i].green);
      return playerList[i].green;
    }
  }
}

module.exports = { getContestantStats: getContestantStats };
