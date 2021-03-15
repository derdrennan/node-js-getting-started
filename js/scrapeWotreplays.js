 const rp = require('request-promise');
 const $ = require('cheerio');
 const url = 'http://wotreplays.eu/site/5801309#live_oaks-tru_voodoo-manticore';

const regEx = /var roster = (\[.*?\]);/g;

function getUserGameData(){
  rp(url)
  .then(function(html){
    //Scraping the username of the contestant
    var userName = $('.link--white', html).text();

    //gameStats now contains the data for every single
    //player in the match.
    const gameStats = html.matchAll(regEx);

    for (const match of gameStats) {
      //If we don't do match[1], the data will have 'var roster'
      //in front of it, and we can't JSON.parse. The actual JSON is group 
      //1 from the regex, therefore match[1] is parsed.
      const obj = JSON.parse(match[1]);
       
      //Find the row that matches our contestant's
      //gamertag and return it.
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].green.name == userName) {
          return obj[i].green;
        }
      }
      //If we haven't returned yet, username wasn't found.
      console.log('Username not found');
    }    
  })
  .catch(function(err){
    console.log(err);
  });
}
