const querystring = require('querystring');
const request = require('request'); // "Request" library
const url = require('url');
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/smartify');
const playlists = db.get('playlists');
const users = db.get('users');
let tracks = [];

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

function addTracksToPlaylist(smartForm, playlist_id) {
  console.log('This is the playlsit id');
  console.log(playlist_id);
  console.log('These are the tracks');
  console.log(tracks);
  return new Promise((resolve, reject) => {
    const requestURL = `https://api.spotify.com/v1/users/${smartForm.authParams.userId}/playlists/${playlist_id}/tracks`;
    const options = {
      url: requestURL,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${smartForm.authParams.access_token}`,
      },
      body: {
        uris: tracks,
      },
      json: true,
    };
    request.post(options, (error, response, body) => {
      if (response.statusCode > 199 && response.statusCode < 300) {
        console.log('Tracks Added');
        resolve(body);
      } else { 
        console.log('Error Detected');
        reject(error);
      }
    });
  })
}

function passesFilter(item, filter) {
  let unitAmount = parseInt(filter.timeAmount);
  let filterDate;
  let itemDate;
  switch(filter.timeUnit) {
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
  filterDate.setDate(filterDate.getDate() - unitAmount);
  if (itemDate > filterDate) {
    return true;
  }
}

function filterTracks(items, config) {
  tracks = [];
  console.log('Tracks starting length');
  console.log(tracks);
  items.map(item => {
    if (passesFilter(item, config)) {
      tracks.push(item.track.uri);
    }
  })
  console.log('Here are your tracks');
  console.log(tracks);
}

function createPlaylist(smartForm) {
  const smartifyID = 'id' + (new Date()).getTime() + Math.random().toString(16).slice(2);
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
  return new Promise((resolve, reject) => {
    request.post(options, (error, response, body) => {
      if (response.statusCode > 199 && response.statusCode < 300) {

        console.log('Adding Smart Form To User');
        console.log(smartForm);
        playlists.insert(smartForm);
        users.update(
          { 
            id: smartForm.authParams.userId 
          },
          { 
            $push: {
              playlists: {
                spotifyID: body.id,
                smartifyID: smartifyID,
              }
            },
          }
        );
        resolve(body);
      } else { 
        console.log('Error Detected');
        reject(error);
      }
    });
  })
}

exports.createSmartList = (req, res, next) => {
  const smartForm = req.body.smartForm;
  const promises = [];
  const response = {};
  smartForm.authParams = req.body.authParams;
  smartForm.playlists.map((playlist) => {
    promises.push(getPlaylistTracks(smartForm, playlist));
  })
  //Get all tracks form playlists
  Promise.all(promises).then(data => {
    let items = [];
    console.log(data);
    data.map((playlist) => {
      items = items.concat(playlist.items);
    })
    //Filter tracks based on smart form
    console.log(items.length);
    filterTracks(items, smartForm);
    console.log('Creating new playlist');
    //Create new playlist
    createPlaylist(smartForm).then(playlist => {
      //Add filtered songs to playlist
      addTracksToPlaylist(smartForm, playlist.id).then(data => {
        playlist.tracks = tracks;
        res.send(playlist);
      });
    })
  });  
};
