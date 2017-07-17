/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { GET_AUTHPARAMS } from 'containers/HomePage/constants';
import { LOAD_PLAYLISTS_SUCCESS } from 'containers/App/constants';
import { playlistsLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectAuthParams } from 'containers/HomePage/selectors';

export function* getSpotifyPlaylists() {
  const authParams = yield select(makeSelectAuthParams());
  const access_token = authParams.access_token;
  const refresh_token = authParams.refresh_token;
  
  const requestURL = 'https://api.spotify.com/v1/me/playlists';
  
  var authOptions = {
      url: requestURL,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      json: true
    };
  
	try {
		// Call our request helper (see 'utils/request')
		const playlists = yield call(request, requestURL, authOptions);
		yield put(playlistsLoaded(playlists));
	} catch (err) {
    console.log(err);
		yield put(repoLoadingError(err));
	}
}

/**
 * Root saga manages watcher lifecycle
 */
export function* spotifyData() {
  // Watches for GET_AUTHPARAMS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcherplaylists = yield takeLatest(GET_AUTHPARAMS, getSpotifyPlaylists);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherplaylists);
  yield cancel(watcherPlaylists);
}

// Bootstrap sagas
export default [
  spotifyData,
];
