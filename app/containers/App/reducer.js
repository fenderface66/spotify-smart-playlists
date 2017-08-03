/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_PLAYLISTS_SUCCESS,
  LOAD_PLAYLISTS_ERROR,
  TOGGLE_SELECTED_PLAYLIST,
  LOAD_GENRES_SUCCESS,
  SUBMIT_SMARTFORM,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  playlists: null,
  genres: null,
  smartForm: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PLAYLISTS_SUCCESS:
      return state
        .set('playlists', action.playlists.items)
        .set('loading', false);
    case LOAD_PLAYLISTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case TOGGLE_SELECTED_PLAYLIST:
      const playlists = state.get('playlists');
      if (action.toggleState) {
        playlists[action.index].selected = true;
      } else {
        playlists[action.index].selected = false;
      }
      return state
        .set('playlists', playlists);
    case LOAD_GENRES_SUCCESS:
      return state
        .set('genres', action.genres);
    case SUBMIT_SMARTFORM:
      return state
        .set('smartForm', action.smartForm);
    default:
      return state;
  }
}

export default appReducer;
