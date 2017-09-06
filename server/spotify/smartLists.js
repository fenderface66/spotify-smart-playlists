const querystring = require('querystring');
const request = require('request'); // "Request" library
const url = require('url');
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/smartify');
const playlists = db.get('playlists');
const users = db.get('users');

function fillPlaylist(playlistOptions) {
  return new Promise((resolve, reject) => {
    const requestURL = `https://api.spotify.com/v1/users/${playlistOptions.authParams.userId}/playlists/${playlistOptions.playlists[0]}/tracks`;
    console.log(requestURL);
    const options = {
      url: requestURL,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${playlistOptions.authParams.access_token}`,
      },
      json: true,
    };
    request.get(options, (error, response, body) => {
      if (response.statusCode > 199 && response.statusCode < 300) {
        console.log(body);
        return resolve(body)
      } else { 
        console.log('Error Detected');
        //console.log(response);
        return reject(response);
      }
    });
  })
  
}

exports.createSmartList = (req, res, next) => {
  const smartForm = req.body.smartForm;
  smartForm.authParams = req.body.authParams;
  const requestURL = `https://api.spotify.com/v1/users/${smartForm.authParams.userId}/playlists`;
  const options = {
    url: requestURL,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${smartForm.authParams.access_token}`,
    },
    body: {
      name: 'test',
    },
    json: true,
  };
  // request.post(options, (error, response, body) => {
  //   if (response.statusCode > 199 && response.statusCode < 300) {
  //     console.log('Adding Smart Form To User');
  //     console.log(smartForm);
  //     playlists.insert(smartForm);
  //     users.update(
  //       { 
  //         id: smartForm.authParams.userId 
  //       },
  //       { 
  //         $push: {
  //           playlists: body.id,
  //         },
  //       }
  //     );
  //     res.send(body);
  //   } else { 
  //     console.log('Error Detected');
  //     res.send(error);
  //   }
  // });
  fillPlaylist(smartForm).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
};
