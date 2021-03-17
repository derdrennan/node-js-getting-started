const twitterFetch = require ('./twitterFetch.js');
const util = require('util');

function setParams(request, response) {
  var xp = request.query.xp;
  var twitterURL = request.query.twitterURL;
  var startDate = request.query.startDate;
  var endDate = request.query.endDate;

  findWinners(response, xp, twitterURL, startDate, endDate);
}


async function findWinners(response, xp, twitterURL, startDate, endDate) {
  console.log("hi");
  
  var replies = await twitterFetch.getTweetReplies(twitterURL)
    //.then(data => console.log(data))
    //.catch(err => console.log(err));

  //Set the params we will be returning to the view.
  //console.log(replies);
  const params = { replies: replies};

  response.render('pages/twitterResult', params);
}


module.exports = { setParams: setParams };