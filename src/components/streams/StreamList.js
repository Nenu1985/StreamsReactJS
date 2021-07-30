import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams()
    }

    // Administration a stream (edit and delete if the user == currentUser)
    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>
                        Edit
                    </Link>
                    <Link className="ui button negative" to={`/streams/delete/${stream.id}`}>
                        Delete
                    </Link>
                </div>
            )
        }
    }

    renderStreams = () => {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        })
    }

    // Render this button in the case if user is logged in
    renderCreateButton() {
        if (this.props.isUserSignedIn) {
            return (
                <div style={{ textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            )
        }
        else return <div>Log in</div>
    }
    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderStreams()}
                </div>
                {this.renderCreateButton()}
            </div>
        )
    };
}
const mapStateToProps = (state) => {
    // We are going to convert object with objects to a list of objects by Objects.values()
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isUserSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, { fetchStreams })(StreamList);