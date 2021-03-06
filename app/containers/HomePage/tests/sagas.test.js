/**
 * Tests for HomePage sagas
 */

import { cancel, take, put, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';

import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_REPOS } from 'containers/App/constants';
import { playlistsLoaded, playlistLoadingError } from 'containers/App/actions';

import { getPlaylists, spotifydata } from '../sagas';

const username = 'mxstbr';

/* eslint-disable redux-saga/yield-effects */
describe('getPlaylists Saga', () => {
  let getPlaylistsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getPlaylistsGenerator = getPlaylists();

    const selectDescriptor = getPlaylistsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getPlaylistsGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the playlistsLoaded action if it requests the data successfully', () => {
    const response = [{
      name: 'First playlist',
    }, {
      name: 'Second playlist',
    }];
    const putDescriptor = getPlaylistsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(playlistsLoaded(response, username)));
  });

  it('should call the playlistLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getPlaylistsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(playlistLoadingError(response)));
  });
});

describe('spotifydataSaga Saga', () => {
  const spotifydataSaga = spotifydata();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = spotifydataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_REPOS, getPlaylists));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = spotifydataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = spotifydataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});
