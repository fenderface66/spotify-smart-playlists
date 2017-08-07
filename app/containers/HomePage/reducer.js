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
  TOGGLE_SMARTEDITOR,
  CHANGE_FORM_LOGIC,
  CHANGE_TIME_UNIT,
  CHANGE_TIME_AMOUNT,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  authParams: {
    access_token: '',
    refresh_token: '',
    userId: null,
  },
  editorState: false,
  formLogic: {
    type: null,
    timeUnit: 'days',
    timeAmount: 0,
  },
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHPARAMS:
      return state
        .setIn(['authParams'], action.params);
    case TOGGLE_SMARTEDITOR:
      return state
        .set('editorState', !state.get('editorState'));
    case CHANGE_FORM_LOGIC : return state
        .setIn(['formLogic', 'type'], action.logic);
    case CHANGE_TIME_UNIT : return state
        .setIn(['formLogic', 'timeUnit'], action.timeUnit);
    case CHANGE_TIME_AMOUNT :
    return state
        .setIn(['formLogic', 'timeAmount'], action.timeAmount);
    default:
      return state;
  }
}

export default homeReducer;
