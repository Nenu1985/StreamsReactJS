import React from 'react';
import { Field, reduxForm, touch } from 'redux-form';
// reduxForm similar to 'connect' function from 'redux'

class StreamCreate extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    renderInput = (formProps)  => {
        /*
        formProps object example (contains: input, meta, value) in the case of ValidationError:
        {
            "input": {
                "name": "title",
                "value": ""
            },
            "meta": {
                "active": false,
                "asyncValidating": false,
                "autofilled": false,
                "dirty": false,
                "error": "You must enter a title",
                "form": "streamCreate",
                "invalid": true,
                "pristine": true,
                "submitting": false,
                "submitFailed": false,
                "touched": false,  // user put cursor into the field and then deselected it
                "valid": false,
                "visited": false
            },
            "label": "Enter Title"
        }
        */
        return (
            <div className="field">
                <label className="">{formProps.label}</label>
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>

        );
    };

    onSubmit(formValues) {

    }
    render() {
        // console.log(this.props);
        return (
            // handleSubmit is a part of reduxForm. It performs event.preventDefault automatically.
            // Instead of 'event' object it returns 'formValues'
            <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    };
};

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        // only ran if the user did not enter title
        // 'title' key must be the same as the field's name in order
        // to let redux-form transfer an error to a particular 'Field' (title)
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;  // return an empty object in the case we don't have validation errors
};

// connect reduxForm to component
export default reduxForm({
    form: 'streamCreate',
    validate: validate  // wiring up validate function
})(StreamCreate);