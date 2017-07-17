/*
 * HomeReducer
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
  GET_AUTHPARAMS,
  GET_playlists_SUCCESS
} from './constants';

// The initial state of the App
const initialState = fromJS({
  authParams: {
    access_token: '',
    refresh_token: '',
  },
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHPARAMS:
      console.log(action);
      return state
        .setIn(['authParams'], action.params)
    default:
      return state;
  }
}

export default homeReducer;
