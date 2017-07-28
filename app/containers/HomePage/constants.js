/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_AUTHPARAMS = 'smartify/Home/GET_AUTHPARAMS';
export const TOGGLE_SMARTEDITOR = 'smartify/Home/TOGGLE_SMARTEDITOR';
export const CHANGE_FORM_LOGIC = 'smartify/Home/CHANGE_FORM_LOGIC';
export const CHANGE_TIME_UNIT = 'smartify/Home/CHANGE_TIME_UNIT';
export const CHANGE_TIME_AMOUNT = 'smartify/Home/CHANGE_TIME_AMOUNT';
