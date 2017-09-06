/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_AUTH = 'smartify/App/GET_AUTH';
export const LOAD_PLAYLISTS_SUCCESS = 'smartify/App/LOAD_PLAYLISTS_SUCCESS';
export const LOAD_PLAYLISTS_ERROR = 'smartify/App/LOAD_PLAYLISTS_ERROR';
export const TOGGLE_SELECTED_PLAYLIST = 'smartify/App/TOGGLE_SELECTED_PLAYLIST';
export const GET_PLAYLISTS = 'smartify/App/GET_PLAYLISTS';
export const GET_GENRES = 'smartify/App/GET_GENRES';
export const LOAD_GENRES_SUCCESS = 'smartify/App/LOAD_GENRES_SUCCESS';
export const SUBMIT_SMARTFORM = 'smartify/App/SUBMIT_SMARTFORM';
export const SMARTLIST_CREATED = 'smartify/App/SMARTLIST_CREATED';
export const DEFAULT_LOCALE = 'en';
