/*
 * PlaylistConfirmation
 *
 * This component shows the newly created playlist details
 */

import React from 'react';
import { connect } from 'react-redux';
import { makeSelectActiveSmartList } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';

import Wrapper from './Wrapper';

export class PlayListConfirmation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load playlists
   */
  renderConfirmation() {
    if (this.props.playlist !== null) {
      return (
        <Wrapper>
          <ul>
            <li>Name: {this.props.playlist.name}</li>
            <li><a target="_blank" href={this.props.playlist.owner.external_urls.spotify}>Link to playlist</a></li>
            <li>Owner: {this.props.playlist.owner.id}</li>
          </ul>
        </Wrapper>
      );
    }
  }

  render() {
    return(
      <div>
        {this.renderConfirmation()}
      </div>
    )
  }
}

PlayListConfirmation.propTypes = {
  playlist: React.PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (evt) => {
      dispatch();
    },
  };
}

const mapStateToProps = createStructuredSelector({
  playlist: makeSelectActiveSmartList()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, null)(PlayListConfirmation);
