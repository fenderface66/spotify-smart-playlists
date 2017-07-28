/*
 * Playlist Editor Actions
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
  CHANGE_FORM_LOGIC,
  CHANGE_TIME_UNIT,
  CHANGE_TIME_AMOUNT,
} from 'containers/HomePage/constants';

export function changeFormLogic(logic) {
  return {
    type: CHANGE_FORM_LOGIC,
    logic,
  };
}

export function changeTimeUnit(timeUnit) {
  return {
    type: CHANGE_TIME_UNIT,
    timeUnit,
  };
}

export function changeTimeAmount(timeAmount) {
  return {
    type: CHANGE_TIME_AMOUNT,
    timeAmount,
  };
}
