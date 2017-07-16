/**
 * Script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 */

var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var request = require('request'); // "Request" library
var client_id = '4d6b8fb609cb4b1fbf703331fba1ac3f'; // Your client id
var client_secret = '48383dc3e4614055a76356bd807707d1'; // Your secret
var redirect_uri = 'http://localhost:3000'; // Your redirect uri

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
var stateKey = 'spotify_auth_state';


exports.login = function(req, res, next) {
  
  var username = req.query.user;
  
  // your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));

//  request.post(authOptions, function(error, response, body) {
//    if (!error && response.statusCode === 200) {
//
//      // use the access token to access the Spotify Web API
//      var token = body.access_token;
//      var options = {
//        url: 'https://api.spotify.com/v1/users/' + username,
//        headers: {
//          'Authorization': 'Bearer ' + token
//        },
//        json: true
//      };
//      request.get(options, function(error, response, body) {
//        console.log(body);
//        next();
//      });
//    }
//  });
}
