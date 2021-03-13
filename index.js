const express = require('express')
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

const ponder09 = require('./js/ponder09.js');
const twitter = require('./js/twitterFetch.js');
const getURLs = require('./js/practice.js')

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.get('/form', (req, res) => res.render('pages/form'));
app.get('/project02', (req, res) => res.render('pages/project02'));

app.get('/findRate', ponder09.setPostageParams);

// start the server listening
app.listen(PORT, () => console.log(`Listening on port ${ PORT }`));
