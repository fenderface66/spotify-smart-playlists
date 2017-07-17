/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectAuthParams = () => createSelector(
  selectHome,
  (homeState) => homeState.get('authParams')
);
 

export {
  selectHome,
  makeSelectAuthParams,
};
