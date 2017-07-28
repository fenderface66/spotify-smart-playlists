/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectAuthParams = () => createSelector(
  selectHome,
  (homeState) => homeState.get('authParams')
);

const makeSelectEditorState = () => createSelector(
  selectHome,
  (homeState) => homeState.get('editorState')
);
 

export {
  selectHome,
  makeSelectAuthParams,        
  makeSelectEditorState   
};
