/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import H2 from 'components/H2';
import PlaylistList from 'components/PlaylistList';
import Button from 'components/Button';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import PlayListFeed from 'containers/PlayListFeed'; 
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { getAuthParams } from './actions';
import { makeSelectAuthParams } from './selectors';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load playlists
   */
  componentDidMount() {
    
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
    
    if (this.props.router.location.query.access_token) {
      this.props.onReceiveAuth(this.props.router.location.query);
    }
    
  }
  
  renderButton() {
    return (
      <div>
        <H2>
          <FormattedMessage {...messages.trymeHeader} />
        </H2>
        <Button href="/api/userAuthorise">
          Login 
        </Button>
      </div>
    )
  }

  render() {
    const { loading, error, playlists } = this.props;
    const playlistsListProps = {
      loading,
      error,
      playlists,
    };

    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'Smart Playlists for Spotify' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            
              {!this.props.router.location.query.access_token ? this.renderButton() : null }
              <PlayListFeed />
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  onSubmitForm: React.PropTypes.func,
  authParams: React.PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (evt) => {
      dispatch();
    },
    onReceiveAuth: (query) => {
      dispatch(getAuthParams(query));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  authParams: makeSelectAuthParams()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
