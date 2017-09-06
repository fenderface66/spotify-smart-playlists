const querystring = require('querystring');
const request = require('request'); // "Request" library
const url = require('url');
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/smartify');
const playlists = db.get('playlists');
const users = db.get('users');
const tracks = [];
const promises = [];

function getPlaylistTracks(playlistOptions, playlist) {
  return new Promise((resolve, reject) => {
    const requestURL = `https://api.spotify.com/v1/users/${playlistOptions.authParams.userId}/playlists/${playlist}/tracks`;
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
        resolve(body);
      } else { 
        console.log('Error Detected');
        //console.log(response);
        reject(response);
      }
    });
  })
}

function passesFilter(item, filter) {
  const unitAmount = parseInt(filter.timeAmount);
  let filterDate;
  let itemDate;
  console.log(filter.timeUnit);
  switch(filter.timeUnit) {
    case 'days': 
    
      
    break;
    case 'weeks':
      unitAmount = (unitAmount * 7);
    break;

    case 'months':
      unitAmount = (unitAmount * 30);
    break;

    default:
    break;
  }
  filterDate = new Date();
  itemDate = new Date(item.added_at);
  d.setDate(d.getDate() - unitAmount);
  console.log(itemDate);
  if(itemDate > filterDate) {
    return true;
  }
}

function filterTracks(items, config) {
  items.map(item => {
    if (passesFilter(item, config)) {
      tracks.push(item.track.uri);
    }
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
  smartForm.playlists.map((playlist) => {
    promises.push(getPlaylistTracks(smartForm, playlist));
  })

  Promise.all(promises).then(data => {
    let items = [];
    data.map((playlist) => {
      items = items.concat(playlist.items);
    })
    filterTracks(items, smartForm);
  });
};
