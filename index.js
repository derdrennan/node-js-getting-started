const cool = require('cool-ascii-faces')
const express = require('express')
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));
  
// views is directory for all template files
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.get('/cool', (req, res) => res.send(cool()));
app.get('/form', (req, res) => res.render('pages/form'));

// set up a rule that says requests to "/math" should be handled by the
// handleMath function below
app.get('/math', handleMath);
  
// start the server listening
//app.listen(port, function() {console.log('Node app is running on port', port);});
app.listen(PORT, () => console.log(`Listening on port ${ PORT }`));
  
  
  /**********************************************************************
   * Ideally the functions below here would go into a different file
   * but for ease of reading this example and seeing all of the pieces
   * they are listed here.
   **********************************************************************/
  
  function handleMath(request, response) {
    const operation = request.query.operation;
    const operand1 = Number(request.query.operand1);
    const operand2 = Number(request.query.operand2);
  
    // TODO: Here we should check to make sure we have all the correct parameters
  
    computeOperation(response, operation, operand1, operand2);
  }
  
  function computeOperation(response, op, left, right) {
    op = op.toLowerCase();
  
    let result = 0;
  
    if (op == "add") {
      result = left + right;
    } else if (op == "subtract") {
      result = left - right;		
    } else if (op == "multiply") {
      result = left * right;
    } else if (op == "divide") {
      result = left / right;
    } else {
      // It would be best here to redirect to an "unknown operation"
      // error page or something similar.
    }
  
    // Set up a JSON object of the values we want to pass along to the EJS result page
    const params = {operation: op, left: left, right: right, result: result};
  
    // Render the response, using the EJS page "result.ejs" in the pages directory
    // Makes sure to pass it the parameters we need.
    response.render('pages/result', params);
  
  }

