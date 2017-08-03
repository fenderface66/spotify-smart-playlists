import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class CheckboxGroup extends Component {

  field = ({ input, meta, genres }) => {
    const { onChange, onBlur, onFocus } = input;
    const { touched, error } = meta;
    const inputValue = input.value;
    const checkboxes = genres.map((genre, index) => {
      const handleChange = (event) => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(genre);
        } else {
          arr.splice(arr.indexOf(genre), 1);
        }
        onBlur(arr);
        return onChange(arr);
      };
      const checked = inputValue.includes(genre);
      return (
        <label htmlFor={`genre${index}`} key={`checkbox-${index}`}>
          <input type="checkbox" name={`genre${index}`} value={genre} checked={checked} onChange={handleChange} onFocus={onFocus} />
          <span>{genre}</span>
        </label>
      );
    });

    return (
      <div>
        <div>{checkboxes}</div>
        {touched && error && <p className="error">{error}</p>}
      </div>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} name="genreBox" />;
  }
}
