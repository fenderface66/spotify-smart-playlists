/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';


export function* loginSpotify() {
	const client_id = '4d6b8fb609cb4b1fbf703331fba1ac3f'; // Your client id
	const client_secret = '48383dc3e4614055a76356bd807707d1'; // Your secret
  const username = yield select(makeSelectUsername());
	const requestURL = `http://smartify.local:3000/api/login?user=${username}`;           
	const authOptions = {
		url: 'http://smartify.local:3000/login',
		method: 'POST' 
	}
	try {
		// Call our request helper (see 'utils/request')
		const repos = yield call(request, requestURL, authOptions);
		yield put(reposLoaded(repos, username));
	} catch (err) {
		yield put(repoLoadingError(err));
	}
}






/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_REPOS, loginSpotify);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  githubData,
];
