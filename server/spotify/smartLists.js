const querystring = require('querystring');
const request = require('request'); // "Request" library
const url = require('url');

exports.createSmartList = function(req, res, next) {
  console.log('Received body');
  console.log(req.body);
  res.send('Playlist created');
}
