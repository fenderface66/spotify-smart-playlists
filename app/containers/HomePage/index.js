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

import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import Button from 'components/Button';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { getAuthParams } from './actions';
import { makeSelectAuthParams } from './selectors';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
    
    if (this.props.router.location.query.code) {
      this.props.onReceiveAuth(this.props.router.location.query);
    }
    
  }
  
  renderButton() {
    return (
      <Button href="/api/userAuthorise">
        Login
      </Button>
    )
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
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
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>

              <Form onSubmit={this.props.onSubmitForm}>
                <label htmlFor="username">
                  <FormattedMessage {...messages.trymeMessage} />
                  <Input
                    id="username"
                    type="text"
                    placeholder="mxstbr"
                    value={this.props.username}
                    onChange={this.props.onChangeUsername}
                  />
                </label>
              </Form>
              {!this.props.router.location.query.code ? this.renderButton() : null }
            <ReposList {...reposListProps} />
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
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
  repos: makeSelectRepos(),
  authParams: makeSelectAuthParams(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
