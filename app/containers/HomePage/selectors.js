/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeSelectAuthParams = () => createSelector(
  selectHome,
  (homeState) => homeState.get('authParams')
);


export {
  selectHome,
  makeSelectUsername,
  makeSelectAuthParams,
};
