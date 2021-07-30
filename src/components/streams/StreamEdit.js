import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

    // components rendered by Route contain extra fields like: 'history', 'location' and 'match'
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    onSubmit = (formValues) => {
        this.props.editStream(
            this.props.match.params.id,
            formValues
        )
    }
    // StreamForm is an ReduxForm. We can pass 'initialValues' props to the component
    // and they will be displayed in the form
    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <h3>Edit a Stream</h3>
                    <StreamForm 
                        initialValues={_.pick(this.props.stream, ['title', 'description'])}
                        onSubmit={this.onSubmit} />
                </div>
            );
        }
    };
}
const mapStateToProps = (state, ownProps) => {
    const streamId = ownProps.match.params.id;
    return { stream: state.streams[streamId] }
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);