const axios = require("axios");
const $ = require('cheerio');
const url = "http://wotreplays.eu/site/5801309#live_oaks-tru_voodoo-manticore";

const getData = async url => {
  try {
    var statsArray = [];

    const regEx = /var roster = (\[.*?\]);/g;
    const userRegex = /([^\s]+)/g;

    const response = await axios.get(url);
    const data = response.data;
    //console.log(data);

    const user = $('.replay-stats__username', data).text();
    const userName = user.match(userRegex);
    const gameStats = data.matchAll(regEx);

    console.log('Username is: ' + userName[0]);
    
    for (const match of gameStats) {
      //If we don't do match[1], the data will have 'var roster'
      //in front of it, and we can't JSON.parse. The actual JSON is group 
      //1 from the regex, therefore match[1] is parsed.
      const obj = JSON.parse(match[1]);
      //console.log(obj);
       
      //Find the row that matches our contestant's
      //gamertag and return it.
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].green.name == userName[0]) {
          console.log(obj[i].green);
          statsArray.push(obj[i].green);
        }
        //if(statsArray.length == replayURLlist.length){
          //console.log('This is the statsArray: ' + statsArray);
          //return statsArray;
        //}
      }
    } 

  } catch (error) {
    console.log(error);
  }
};

getData(url);