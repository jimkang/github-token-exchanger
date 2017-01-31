#!/usr/bin/env node

/* global process */

var GithubTokenExchangerServer = require('./github-token-exchanger-server');
var logFormat = require('log-format');
const port = 5876;

GithubTokenExchangerServer(useServer);

function useServer(error, server) {
  if (error) {
    process.stderr.write(error);
    process.exit(1);
    return;
  }
  
  server.listen(port, onReady);

  function onReady(error) {
    if (error) {
      process.stderr.write(error);
    }
    else {
      process.stdout.write(logFormat(server.name, 'listening at', server.url));
    }
  }
}
