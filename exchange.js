var config = require('./config');
var sb = require('standard-bail')();
var request = require('request');

function exchange(code, done) {
  var reqOpts = {
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token?' +
      'client_id=' + config.github.clientId +
      '&client_secret=' + config.github.clientSecret +
      '&code=' + code,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  request(reqOpts, sb(extractToken, done));  
}

function extractToken(res, body, done) {
  var token;

  if (body && body.access_token) {
    token = body.access_token;
  }

  if (token) {
    done(null, token);
  }
  else {
    done(new Error('Could not get the token from GitHub.'));
  }
}

module.exports = exchange;