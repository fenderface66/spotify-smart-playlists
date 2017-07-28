/**
 * PlaylistListItem
 *
 * Lists the name and the issue count of a playlistsitory
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import { toggleSelectedPlaylist } from 'containers/App/actions';
import ListItem from 'components/ListItem';
import PlaylistItemCol from './PlaylistItemCol';
import Wrapper from './Wrapper';

export class PlaylistListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  render() {
    const item = this.props.item;
    
    if(item !== undefined) {
      const content = (
        <Wrapper>
          <PlaylistItemCol>
            <span>
              {item.name}
            </span>
          </PlaylistItemCol>
          <PlaylistItemCol>
            <input type="checkbox" onChange={(evt) => this.props.onCheckBoxToggle(evt.target.checked, item, this.props.index)} />    
          </PlaylistItemCol>
        </Wrapper>
      );
      return (
        <ListItem key={`playlist-list-item-$(item.id)`} item={content} />
      );
    } else {   
      return (
        <ListItem />
      );
    }
  }
}

PlaylistListItem.propTypes = {
  item: React.PropTypes.object,
};
        
export function mapDispatchToProps(dispatch) {
  return {
    onCheckBoxToggle: (checked, item, index) => {
      dispatch(toggleSelectedPlaylist(checked, item, index));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  
});

// Wrap the component to inject dispatch and state into it
export default connect(null, mapDispatchToProps)(PlaylistListItem);
