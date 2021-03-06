/**
 * Editor Form
 *
 * Allows users to edit their smart playlists
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { submitSmartForm } from 'containers/App/actions';
import { makeSelectGenres } from 'containers/App/selectors';
import Option from './Option';
import Form from './Form';

export class EditorForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  renderNumberOptions(limit) {
    const options = [];
    for (let i = 0; i < limit; i += 1) {
      options.push(<Option key={`option${i}`} value={(i + 1)} > {(i + 1)}</Option>);
    }
    return options;
  }

  render() {
    return (
      <Form numberOptions={this.renderNumberOptions(50)} genres={this.props.genres.genres} onSubmit={this.props.onSubmitForm} />
    );
  }
}

EditorForm.propTypes = {
  genres: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => dispatch(submitSmartForm(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorForm);
