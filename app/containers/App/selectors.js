/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectPlaylists = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('playlists')
);

const makeSelectGenres = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('genres')
);

const makeSelectSmartForm = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('smartForm')
);

const makeSelectActiveSmartList = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('activeSmartList')
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectPlaylists,
  makeSelectLocationState,
  makeSelectGenres,
  makeSelectSmartForm,
  makeSelectActiveSmartList,
};
