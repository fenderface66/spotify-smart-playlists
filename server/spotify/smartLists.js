const querystring = require('querystring');
const request = require('request'); // "Request" library
const url = require('url');
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/smartify');
const playlists = db.get('playlists');
const users = db.get('users');

exports.createSmartList = (req, res, next) => {
  const smartForm = req.body.smartForm;
  smartForm.id = `id${(new Date()).getTime()}`;
  smartForm.authParams = req.body.authParams;
  const requestURL = `https://api.spotify.com/v1/users/${smartForm.authParams.userId}/playlists`;
  const options = {
    url: requestURL,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${smartForm.authParams.access_token}`,
    },
    body: {
      name: 'test',
    },
    json: true,
  };
  res.send('received');
  // request.post(options, (error, response, body) => {
  //   console.log(body);
  //   if (!error && response.statusCode === 200) {
  //     playlists.insert(smartForm);
  //     users.update(
  //       { id: smartForm.authParams.userId },
  //       { $push: {
  //         playlists: smartForm.id,
  //       },
  //       }
  //     );
  //     res.send('Playlist created');
  //   } else {
  //     console.log(error);
  //     res.send(error);
  //   }
  // });
};
