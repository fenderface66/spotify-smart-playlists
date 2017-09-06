/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_PLAYLISTS_SUCCESS,
  LOAD_PLAYLISTS_ERROR,
  TOGGLE_SELECTED_PLAYLIST,
  LOAD_GENRES_SUCCESS,
  SUBMIT_SMARTFORM,
  SMARTLIST_CREATED
} from './constants';


/**
 * Dispatched when the playlistsitories are loaded by the request saga
 *
 * @param  {array} playlists The playlistsitory data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_playlists_SUCCESS passing the playlists
 */
export function playlistsLoaded(playlists) {
  return {
    type: LOAD_PLAYLISTS_SUCCESS,
    playlists,
  };
}

/**
 * Dispatched when loading the playlistsitories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_playlists_ERROR passing the error
 */
export function playlistLoadingError(error) {
  return {
    type: LOAD_PLAYLISTS_ERROR,
    error,
  };
}

export function toggleSelectedPlaylist(toggleState, playlist, index) {
  return {
    type: TOGGLE_SELECTED_PLAYLIST,
    toggleState,
    playlist,
    index,
  };
}

export function genresLoaded(genres) {
  return {
    type: LOAD_GENRES_SUCCESS,
    genres,
  };
}

/**
 * Dispatched when loading the playlistsitories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_playlists_ERROR passing the error
 */
export function genresLoadingError(error) {
  return {
    type: LOAD_GENRES_ERROR,
    error,
  };
} 

export function submitSmartForm(smartForm) {
  return {
    type: SUBMIT_SMARTFORM, 
    smartForm,
  };
}

export function smartListCreated(smartList) {
  return {
    type: SMARTLIST_CREATED,
    smartList,
  };
}
