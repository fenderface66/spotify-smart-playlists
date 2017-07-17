/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import IssueIcon from './IssueIcon';
import IssueLink from './IssueLink';
import RepoLink from './RepoLink';
import Wrapper from './Wrapper';

export class RepoListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  
  render() {
    const item = this.props.item;
    console.log('here');  
    console.log(item);
    
    if(item !== undefined) {
      const content = (
        <Wrapper>
          <RepoLink href={item.external_urls.spotify} target="_blank">
            {item.name}
          </RepoLink>
        </Wrapper>
      );
      return (
        <ListItem key={`repo-list-item-`} item={content} />
      );
    } else {
      console.log('hello');
      return (
        <ListItem />
      );
    }

    // Put together the content of the repository
    

    // Render the content into a list item
    
  }
}

RepoListItem.propTypes = {
  item: React.PropTypes.object,
};

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(RepoListItem);
