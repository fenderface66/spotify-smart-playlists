import React, { PropTypes } from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import PlaylistListItem from 'containers/PlaylistListItem';

function PlaylistList({ loading, error, playlists }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (playlists !== false) {
    return <List items={playlists} component={PlaylistListItem} />;
  }

  return null;
}

PlaylistList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  playlists: PropTypes.any,
};

export default PlaylistList;
