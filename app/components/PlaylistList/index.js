import React, { PropTypes } from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';

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
    return <List items={playlists} component={RepoListItem} />;
  }

  return null;
}

PlaylistList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  playlists: PropTypes.any,
};

export default PlaylistList;
