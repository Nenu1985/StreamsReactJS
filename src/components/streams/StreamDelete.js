import React, { useEffect } from 'react';
import Modal from '../../Modal';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';
import { Link } from 'react-router-dom';


const StreamDelete = (props) => {
    // Instead of class's componentDidMount
    useEffect(
        () => {
            props.fetchStream(props.match.params.id)
        }, []
    )
    const actions = (
        <React.Fragment>
            <button className="ui button negative" onClick={() => props.deleteStream(props.match.params.id)}>Delete</button>
            <Link to="/" className="ui button">Cancel</Link>
        </React.Fragment>
    )
    const renderHelper = () => {
        if (!props.stream) {
            return <div>Loading...</div>
        } else {
            return (
                <Modal
                    title="Delete the Stream"
                    content={`Are you sure to delete this stream with title: ${props.stream.title}?`}
                    actions={actions}
                    onDismiss={() => history.push('/')}
                />
            )
        }
    }
    return (
        renderHelper()
    );
}

const mapStateToProps = (state, ownProps) => {
    const streamId = ownProps.match.params.id;
    return { stream: state.streams[streamId] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);