const rp = require("request-promise");
const $ = require("cheerio");

//const html = "http://wotreplays.eu/site/5834962#highway-tru_voodoo-t49";
const html =
  "http://wotreplays.eu/site/5766092#serene_coast-soveren_pl-ikv_103";

const userRegex = /([^\s]+)/g;
const user = $(".replay-stats__username", html).text();
const gamerTag = user.match(userRegex)[0];
console.log("user: " + user);
console.log("gamerTag: " + gamerTag);

//If the user submitted a replay that doesn't show data due to leaving the
//game early, this is how we need to grab the name, because the HTML is different
//on this page.
// if (!user) {
//   console.log("Inside IF check");
//   const user1 = $("b-replay__player", html).text();
//   console.log("user: " + user1);
//   const gamerTag = user.match(userRegex)[0];
//   console.log(gamerTag);
// }
