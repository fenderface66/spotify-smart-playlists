/**
 * Editor Form
 *
 * Allows users to edit their smart playlists
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { makeSelectGenres } from 'containers/App/selectors';
import { makeSelectFormLogic, makeSelectTimeUnit, makeSelectTimeAmount } from '../selectors';
import { changeFormLogic, changeTimeUnit, changeTimeAmount } from '../actions';
import Option from './Option';
import CheckboxItem from './CheckboxItem';

export class EditorForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  renderNumberOptions(limit) {
    const options = [];
    for (let i = 0; i < limit; i += 1) {
      options.push(<Option key={`option${i}`} value={(i + 1)} > {(i + 1)}</Option>);
    }
    return options;
  }

  renderGenres() {
    const checkBoxes = [];
    for (let i = 0; i < this.props.genres.genres.length; i += 1) {
      checkBoxes.push(
        <CheckboxItem key={`option${i}`}>
          <label htmlFor="{this.props.genres.genres[i]} ">{this.props.genres.genres[i]}</label>
          <input type="checkbox" value="{this.props.genres.genres[i]}" name="{this.props.genres.genres[i]}" />
        </CheckboxItem>);
    }
    return checkBoxes;
  }
  renderFormQuestions() {
    switch (this.props.formLogic) {
      case 'mostRecent':
        return (
          <div>
            <fieldset>
              <label htmlFor="timeUnit">Go back by: </label>
              <select ref={() => { this.timeUnit = 'timeUnit'; }} name="timeUnit" onChange={(evt) => this.props.onChangeTimeUnit(evt.target.value)}>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="time amount">Numbers of { this.props.timeUnit }</label>
              <select name="time amount">
                {this.renderNumberOptions(50)}
              </select>
            </fieldset>
          </div>
        );
      case 'genres':
        return (
          <div>
            <fieldset>
              <label htmlFor="genre">Songs with the following genre: </label>
              <div className="genre-container">
                {this.renderGenres()}
              </div>
            </fieldset>
          </div>
        );
      default:
        return null;
    }
  }

  validateForm(event) {
    event.preventDefault();
    console.log(event);
  }

  render() {
    return (
      <form onSubmit={(evt) => this.validateForm(evt)}>
        <fieldset>
          <label htmlFor="Editor Logic">Smart Type</label>
          <select name="Editor Logic" onChange={(evt) => this.props.onChangeFormLogic(evt.target.value)}>
            <option value="null">Please Select a Smart Type</option>
            <option value="mostRecent">Recently Added</option>
            <option value="genres">By Genres</option>
          </select>
        </fieldset>
        {this.renderFormQuestions()}
        <fieldset>
          <label htmlFor="Refresh Rate">How often would you like this smartlist to refresh?</label>
          <select name="Refresh Rate">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </fieldset>
        <input type="submit" value="Create" />
      </form>
    );
  }
}

EditorForm.propTypes = {
  formLogic: React.PropTypes.string,
  onChangeFormLogic: React.PropTypes.func,
  timeUnit: React.PropTypes.string,
  onChangeTimeUnit: React.PropTypes.func,
  onChangeTimeAmount: React.PropTypes.func,
  genres: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  formLogic: makeSelectFormLogic(),
  timeUnit: makeSelectTimeUnit(),
  timeAmount: makeSelectTimeAmount(),
  genres: makeSelectGenres(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeFormLogic: (logic) => dispatch(changeFormLogic(logic)),
    onChangeTimeUnit: (timeUnit) => dispatch(changeTimeUnit(timeUnit)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorForm);
