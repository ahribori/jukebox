import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import './Player.css';

class Player extends React.Component {

    static propTypes = {
        videoId: PropTypes.string,
        id: PropTypes.string,
        className: PropTypes.string,
        onReady: PropTypes.func,
        onPlay: PropTypes.func,
        onPause: PropTypes.func,
        onEnd: PropTypes.func,
        onError: PropTypes.func,
        onStateChange: PropTypes.func,
        onPlaybackRateChange: PropTypes.func,
        onPlaybackQualityChange: PropTypes.func,
    };

    static defaultProps = {
        videoId: null,
        id: null,
        className: null,
    };

    handleStateChange = (e) => {
    };

    render() {
        const opts = {
            playerVars: {
                autoplay: this.props.autoPlay ? 1 : 0,
            },
        };

        return (
            <div>
                <div className="videowrapper">
                    <YouTube
                        opts={opts}
                        {...this.props}
                    />
                </div>
            </div>
        );
    }
}

export default Player;