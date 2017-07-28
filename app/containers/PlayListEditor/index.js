/**
 * PlaylistEditor
 *
 * Allows users to edit their smart playlists
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectEditorState } from 'containers/HomePage/selectors';
import { toggleSmartEditor } from 'containers/HomePage/actions';

import Button from 'components/Button';
import Wrapper from './Wrapper';
import EditorForm from './EditorForm';

export class PlayListEditor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  renderEditor() {
    if (this.props.editorState) {
      return (<EditorForm />);
    }
    return (
      <Button onClick={() => this.props.onToggleSmartEditor()}>
        Create a SmartList
      </Button>
    );
  }

  render() {
    return (
      <Wrapper>
        {this.renderEditor()}
      </Wrapper>
    );
  }
}

PlayListEditor.propTypes = {
  editorState: React.PropTypes.bool,
  onToggleSmartEditor: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onToggleSmartEditor: () => dispatch(toggleSmartEditor()),
  };
}

const mapStateToProps = createStructuredSelector({ editorState: makeSelectEditorState() });

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(PlayListEditor);
