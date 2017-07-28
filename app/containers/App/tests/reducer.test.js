import { fromJS } from 'immutable';

import appReducer from '../reducer';
import {
  loadPlaylists,
  playlistsLoaded,
  playlistLoadingError,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      currentUser: false,
      userData: fromJS({
        playlistsitories: false,
      }),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadPlaylists action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['userData', 'playlistsitories'], false);

    expect(appReducer(state, loadPlaylists())).toEqual(expectedResult);
  });

  it('should handle the playlistsLoaded action correctly', () => {
    const fixture = [{
      name: 'My Playlist',
    }];
    const username = 'test';
    const expectedResult = state
      .setIn(['userData', 'playlistsitories'], fixture)
      .set('loading', false)
      .set('currentUser', username);

    expect(appReducer(state, playlistsLoaded(fixture, username))).toEqual(expectedResult);
  });

  it('should handle the playlistLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, playlistLoadingError(fixture))).toEqual(expectedResult);
  });
});
