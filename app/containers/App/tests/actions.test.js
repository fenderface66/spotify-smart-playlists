import {
  LOAD_REPOS,
  LOAD_PLAYLISTS_SUCCESS,
  LOAD_PLAYLISTS_ERROR,
} from '../constants';

import {
  loadPlaylists,
  playlistsLoaded,
  playlistLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadPlaylists', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_REPOS,
      };

      expect(loadPlaylists()).toEqual(expectedResult);
    });
  });

  describe('playlistsLoaded', () => {
    it('should return the correct type and the passed playlists', () => {
      const fixture = ['Test'];
      const username = 'test';
      const expectedResult = {
        type: LOAD_PLAYLISTS_SUCCESS,
        playlists: fixture,
        username,
      };

      expect(playlistsLoaded(fixture, username)).toEqual(expectedResult);
    });
  });

  describe('playlistLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_PLAYLISTS_ERROR,
        error: fixture,
      };

      expect(playlistLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
