import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {createStream} from '../../actions';
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
        // input component to be rendered for the Stream's title and description
        // It's an input argument for the <Field /> component
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`
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
            <div className={className}>
                <label className="">{formProps.label}</label>
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>

        );
    };

    onSubmit = (formValues) => {
        // invoking 'CREATE_STREAM' action
        return this.props.createStream(formValues);
    }
    render() {
        // console.log(this.props);
        return (
            // handleSubmit is a part of reduxForm. It performs event.preventDefault automatically.
            // Instead of 'event' object it returns 'formValues'
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate  // wiring up validate function
})(StreamCreate);

// Connect redux to reduxForm
export default connect(null, {createStream})(formWrapped);