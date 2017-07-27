/*
 * PlayListFeed
 *
 * Shows a feed of users playlists
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectPlaylists, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import PlaylistList from 'components/PlaylistList';


export class PlayListFeed extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    console.log(this.props);
    const { loading, error, playlists } = this.props;
    const playlistsListProps = {
      loading,
      error,
      playlists,
    };

    return (
      <PlaylistList {...playlistsListProps}></PlaylistList>
    );
  }
}

PlayListFeed.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  playlists: React.PropTypes.array
};

export function mapDispatchToProps(dispatch) {
  return null
}

const mapStateToProps = createStructuredSelector({
  playlists: makeSelectPlaylists(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(PlayListFeed);
