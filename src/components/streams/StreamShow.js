import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';


const StreamShow = (props) => {
    useEffect(() => {
        props.fetchStream(props.match.params.id)
    }, []
    )

    const renderHelper = () => {
        if (!props.stream) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <h1>{props.stream.title}</h1>
                    <h5>{props.stream.description}</h5>
                </div>
            );
        };
    };

    return (
        <div>{renderHelper()}</div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const streamId = ownProps.match.params.id;
    return { stream: state.streams[streamId] }
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);