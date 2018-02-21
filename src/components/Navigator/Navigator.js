import React from 'react';
import PropTypes from 'prop-types';
import './Navigator.css';

import List from 'material-ui/List';

import Item from './Item';

class Navigator extends React.Component {

    static propTypes = {
        videos: PropTypes.array,
        onItemClicked: PropTypes.func,
        currentVideoIndex: PropTypes.number,
    };

    static defaultProps = {
        videos: [],
        onItemClicked: () => {
        },
        currentVideoIndex: 0,
    };

    renderItems = () => {
        return this.props.videos.map((video, index) => {
            const selectedStyle = {
                backgroundColor: 'orange',
            };
            return (
                <Item
                    key={video.videoId}
                    index={index}
                    videoId={video.videoId}
                    title={video.title}
                    description={video.description}
                    thumbnail={video.thumbnail}
                    onClick={this.props.onItemClicked}
                    style={this.props.currentVideoIndex === index ? selectedStyle : {}}
                />
            )
        });
    };

    render() {
        return (
            <List>
                {this.renderItems()}
            </List>
        );
    }
}

export default Navigator;