function setPostageParams(request, response) {
  const weight = request.query.weight;
  const mailType = request.query.mailType;

  calculatePostageRate(response, weight, mailType);
}

function calculatePostageRate(response, weight, mailType) {
  
  const price = 0;

  if (mailType == 'Letter (Stamped)') {
    if (weight <= 1) {
        price = 0.55;
    } else if (weight <= 2) {
        price = 0.75;
    } else if (weight <= 3) {
        price = 0.95;
    } else if (weight <= 3.5) {
        price = 1.15;
    }
  }

  if (mailType == 'Letter (Metered)') {
    if (weight <= 1) {
        price = 0.51;
    } else if (weight <= 2) {
        price = 0.71;
    } else if (weight <= 3) {
        price = 0.91;
    } else if (weight <= 3.5) {
        price = 1.11;
    }
  }

  if (mailType == 'Large Envelope (Flat)') {
    if (weight <= 1) {
        price = 1.00;
    } else if (weight <= 2) {
        price = 1.20;
    } else if (weight <= 3) {
        price = 1.40;
    } else if (weight <= 4) {
        price = 1.60;
    }
  }

  if (mailType == 'First-Class Package Service - Retail') {
    if (weight <= 1) {
        price = 4.00;
    } else if (weight <= 2) {
        price = 4.00;
    } else if (weight <= 3) {
        price = 4.00;
    } else if (weight <= 4) {
        price = 4.00;
    }
  }

  const params = { weight: weight, mailType: mailType, price: price };

  response.render('pages/result', params);
}