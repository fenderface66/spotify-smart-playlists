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
} from './constants'; 

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  playlists: []
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PLAYLISTS_SUCCESS:
      console.log(action);
      return state
        .setIn(['playlistsData', 'playlists'], action.playlists.items)
        .set('loading', false)
    case LOAD_PLAYLISTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
