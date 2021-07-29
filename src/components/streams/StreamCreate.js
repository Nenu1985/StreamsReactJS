import React from 'react';
import { Field, reduxForm } from 'redux-form';
// reduxForm similar to 'connect' function from 'redux'

class StreamCreate extends React.Component {
    renderInput(formProps) {
        return (
            <div className="field">
                <label className="">{formProps.label}</label>
                <input {...formProps.input} />
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
                <Field name="description2" component={this.renderInput} />
                <button className="ui button primary">Submit</button>
            </form>
        );
    };
};

// connect reduxForm to component
export default reduxForm({
    form: 'streamCreate'
})(StreamCreate);