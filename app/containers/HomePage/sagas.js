/**
 * Gets the playlistsitories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { GET_AUTHPARAMS } from 'containers/HomePage/constants';
import { LOAD_PLAYLISTS_SUCCESS, SUBMIT_SMARTFORM } from 'containers/App/constants';
import { playlistsLoaded, playlistLoadingError, genresLoaded } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectAuthParams } from 'containers/HomePage/selectors';
import { makeSelectSmartForm } from 'containers/App/selectors';

export function* getSpotifyPlaylists() {
  const authParams = yield select(makeSelectAuthParams());
  const accessToken = authParams.access_token;
  const requestURL = 'https://api.spotify.com/v1/me/playlists';
  const authOptions = {
    url: requestURL,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    json: true,
  };
  try {
    // Call our request helper (see 'utils/request')
    const playlists = yield call(request, requestURL, authOptions);
    yield put(playlistsLoaded(playlists));
  } catch (err) {
    console.log(err);
    yield put(playlistLoadingError(err));
  }
}

export function* getSpotifyGenres() {
  const authParams = yield select(makeSelectAuthParams());
  const accessToken = authParams.access_token;
  const requestURL = 'https://api.spotify.com/v1/recommendations/available-genre-seeds';
  const authOptions = {
    url: requestURL,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    json: true,
  };
  try {
    // Call our request helper (see 'utils/request')
    const genres = yield call(request, requestURL, authOptions);
    yield put(genresLoaded(genres));
  } catch (err) {
    console.log(err);
  }
}

export function* submitSmartForm() {
  const smartForm = yield select(makeSelectSmartForm());
  const authParams = yield select(makeSelectAuthParams());
  console.log('Here is the smart Form');
  console.log(smartForm);
  const accessToken = authParams.access_token;
  const requestURL = 'http://localhost:3000/api/createSmartList';
  const options = {
    url: requestURL,
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(smartForm),
  };
  try {
    // Call our request helper (see 'utils/request')
    const genres = yield call(request, requestURL, options);
    yield put(genresLoaded(genres));
  } catch (err) {
    console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* spotifyData() {
  // Watches for GET_AUTHPARAMS actions and calls getPlaylists when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcherplaylists = yield takeLatest(GET_AUTHPARAMS, getSpotifyPlaylists);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherplaylists);
}

export function* genreData() {
  // Watches for GET_AUTHPARAMS actions and calls getPlaylists when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcherplaylists = yield takeLatest(LOAD_PLAYLISTS_SUCCESS, getSpotifyGenres);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherplaylists);
}

export function* smartFormData() {
  // Watches for GET_AUTHPARAMS actions and calls getPlaylists when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcherplaylists = yield takeLatest(SUBMIT_SMARTFORM, submitSmartForm);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherplaylists);
}

// Bootstrap sagas
export default [
  spotifyData,
  genreData,
  smartFormData,
];
