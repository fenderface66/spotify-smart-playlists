/**
 * Script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 */

const querystring = require('querystring');
const request = require('request'); // "Request" library
const url = require('url');

const client_id = '4d6b8fb609cb4b1fbf703331fba1ac3f'; // Client id
const client_secret = '48383dc3e4614055a76356bd807707d1'; // Secret
const redirect_uri = 'http://localhost:3000/api/authCallback'; // Redirect uri

const mongo = require('mongodb');
const monk = require('monk');
const db = monk('127.0.0.1:27017/smartify');
const users = db.get('users');
let userId = null;

const generateRandomString = function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

exports.login = function(req, res, next) {
  console.log('logged in');
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state,
    }));
};

exports.tokenExchange = function(req, res, next) {
  // Application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;
        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          const user = body;
          user.playlists = [];
          userId = body.id;
          users.findOne({ email: body.email }).then((doc, err) => {
            if (doc) {
              console.log('USER EXISTS');
              console.log(doc);
            } else {
              console.log('ADDING USER');
              users.insert(user);
            }
            if (err) {
              console.log(err);
            }
          })
          res.redirect(url.format({
            pathname: '/',
            query: {
              'access_token': access_token,
              'refresh_token': refresh_token,
              'userId': userId,
            }
          }));
        });
        // we can also pass the token to the browser to make requests from there
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
};
