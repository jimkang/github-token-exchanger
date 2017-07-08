var restify = require('restify');
var callNextTick = require('call-next-tick');
var exchange = require('./exchange');

function GithubTokenExchangerServer(done) {
  var server = restify.createServer({
    name: 'github-token-exchanger-server'
  });

  server.use(restify.CORS());
  server.use(restify.queryParser());

  server.get('/health', respondOK);
  server.get('/exchange', respondWithExchange);
  server.head(/.*/, respondHead);

  // Do async init here, if needed, then call callback.
  callNextTick(done, null, server);
}

function respondOK(req, res, next) {
  res.send(200, 'OK!');
  next();
}

function respondHead(req, res, next) {
  res.writeHead(
    200, 
    {
      'content-type': 'text/plain'
    }
  );
  res.end();
  next();
}

function respondWithExchange(req, res, next) {
  if (req.query.code) {
    exchange(req.query.code, req.query.app, writeToken);
  }
  else {
    next(new restify.InvalidArgumentError('Missing code param.'));
  }

  function writeToken(error, token) {
    console.log('token:', token);
    if (error) {
      next(error);
    }
    else {
      res.write(token);
      res.end();
      next();
    }
  }
}

module.exports = GithubTokenExchangerServer;
