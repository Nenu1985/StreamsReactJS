import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';


const StreamShow = (props) => {
    const videoRef = useRef();
    var flvPlayer = null

    useEffect(() => {
        const { id } = props.match.params;
        props.fetchStream(id);
        buildPlayer();
        console.log('FLV Mounting...')
    }, []);

    useEffect(() => {
        console.log('FLV Rerendering...')
        buildPlayer();
        if (flvPlayer) {
            return function cleanup() {
                console.log('FLV Cleaning up...');
                flvPlayer.destroy();
            };
        }
    });
    const buildPlayer = () => {

        if (flvPlayer || !props.stream) {
            return;
        };
        const { id } = props.match.params;
        flvPlayer = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        flvPlayer.attachMediaElement(videoRef.current)
        flvPlayer.load();
    };
    const renderHelper = () => {
        if (!props.stream) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <video ref={videoRef}
                        style={{ width: '100%' }}
                        controls />
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