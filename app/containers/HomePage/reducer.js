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
} from './constants';

// The initial state of the App
const initialState = fromJS({
  authParams: {},
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHPARAMS:
      return state
        .set('code', action.params.code)
        .set('state', action.params.state);
    default:
      return state;
  }
}

export default homeReducer;
