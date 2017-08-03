import React from 'react';
import { Field, FormGroup, reduxForm } from 'redux-form/immutable';
import CheckboxItem from './CheckboxItem';

let Form = props => {
  const { handleSubmit } = props;
  console.log(props);
  return (
    // <form onSubmit={ handleSubmit }>
    //   <div>
    //     <label htmlFor="firstName">First Name</label>
    //     <Field name="firstName" component="input" type="text" />
    //   </div>
    //   <div>
    //     <label htmlFor="lastName">Last Name</label>
    //     <Field name="lastName" component="input" type="text" />
    //   </div>
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <Field name="email" component="input" type="email" />
    //   </div>
    //   <button type="submit">Submit</button>
    // </form>
    <form onSubmit={ handleSubmit }>
      <fieldset>
        <label htmlFor="timeUnit">Go back by: </label>
        <Field name="timeUnit" component="select" value="">
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </Field>
      </fieldset>
      <fieldset>
        <label htmlFor="timeAmount">Numbers of this unit</label>
        <Field name="timeAmount" component="select" value="1">
          {props.numberOptions}
        </Field>
      </fieldset>
      <fieldset>
        <label htmlFor="genre">Songs with the following genre: </label>
        <div className="genre-container">
          <CheckboxItem genres={props.genres} />
        </div>
      </fieldset>
      <fieldset>
        <label htmlFor="refreshRate">How often would you like this smartlist to refresh?</label>
        <Field name="refreshRate" component="select" value="daily">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Field>
      </fieldset>
      <button type="submit">Create</button>
    </form>
  );
};

Form = reduxForm({
  // a unique name for the form
  form: 'smartForm',
  initialValues: {
    timeUnit: 'days',
    timeAmount: '1',
    refreshRate: 'daily',
  },
})(Form);

export default Form;
