/**
 * PlaylistListEditor
 *
 * Allows users to edit their smart playlists
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import PlaylistLink from './PlaylistLink';
import Wrapper from './Wrapper';

export class PlaylistListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  
  render() {
    

    
  }
}

PlaylistListItem.propTypes = {
  item: React.PropTypes.object,
};

export default connect(createStructuredSelector({
        
}))(PlaylistListItem);
