import {
  LOAD_REPOS,
  LOAD_playlists_SUCCESS,
  LOAD_playlists_ERROR,
} from '../constants';

import {
  loadRepos,
  playlistsLoaded,
  repoLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadRepos', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_REPOS,
      };

      expect(loadRepos()).toEqual(expectedResult);
    });
  });

  describe('playlistsLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test'];
      const username = 'test';
      const expectedResult = {
        type: LOAD_playlists_SUCCESS,
        repos: fixture,
        username,
      };

      expect(playlistsLoaded(fixture, username)).toEqual(expectedResult);
    });
  });

  describe('repoLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_playlists_ERROR,
        error: fixture,
      };

      expect(repoLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
