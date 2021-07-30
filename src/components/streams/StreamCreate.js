import React from 'react';
import { connect } from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

    onSubmit = (formValues) => {
        // invoking 'CREATE_STREAM' action
        return this.props.createStream(formValues);
    }
    render() {
        return (
          <div>
              <h3>Create a Stream</h3>
              <StreamForm onSubmit={this.onSubmit} />
          </div>
        );
    };
};

// Connect redux to reduxForm
export default connect(null, {createStream})(StreamCreate);