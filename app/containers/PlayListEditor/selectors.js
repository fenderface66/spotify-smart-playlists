/**
 * Playlist Editor Selectors
 */

import { createSelector } from 'reselect';

const selectPlaylistEditor = (state) => state.get('home');

const makeSelectFormLogic = () => createSelector(
  selectPlaylistEditor,
  (homeState) => homeState.getIn(['formLogic', 'type'])
);

const makeSelectTimeUnit = () => createSelector(
  selectPlaylistEditor,
  (homeState) => homeState.getIn(['formLogic', 'timeUnit'])
);

const makeSelectTimeAmount = () => createSelector(
  selectPlaylistEditor,
  (homeState) => homeState.getIn(['formLogic', 'timeAmount'])
);

export {
  makeSelectFormLogic,
  makeSelectTimeUnit,
  makeSelectTimeAmount,    
};
