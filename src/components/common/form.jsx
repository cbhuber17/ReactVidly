import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = { data: {}, errors: {} };

  // Validates the entire form
  validate = () => {
    // Joi terminates as soon as it finds an error ("Aborts early")
    const options = { abortEarly: false };

    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};

    error.details.map((item) => (errors[item.path[0]] = item.message));

    return errors;
  };

  // Validates the 'username' and 'password' form entities separately
  validateProperty = ({ name, value }) => {
    // [name] allows dynamic setting of key -> e.g. would be --> {'username': value}
    const obj = { [name]: value };

    // Only allowed one schema; having multiple (and if not found) will result in an  error
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault(); // Prevent full page reload and form submission to the server

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  // Allows text to be typed in the forms
  // Destructuring e ---> e.currentTarget renamed to "input"
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };

    // Validate as the user types in each input field
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    // E.g.: data['username'] - e.currentTarget.name will
    // dynamically allow us to user 'username' or 'password' based on what was passed in "name=" below in render()
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
