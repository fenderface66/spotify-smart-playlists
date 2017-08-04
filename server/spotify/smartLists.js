const querystring = require('querystring');
const request = require('request'); // "Request" library
const url = require('url');
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/smartify');

exports.createSmartList = function(req, res, next) {
  const accessToken = req.body.accessToken;
  const smartForm = req.body.smartForm;
  const requestURL = 'https://api.spotify.com/v1/recommendations/available-genre-seeds';
  const options = {
    url: requestURL,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    json: true,
  };
  console.log(accessToken);
  console.log(smartForm);

  request.post(options, function(error, response, body) {
    
    if (!error && response.statusCode === 200) {
      console.log('Success');
    } else {
      console.log(error);
    }
  });
  res.send('Playlist created');
}
