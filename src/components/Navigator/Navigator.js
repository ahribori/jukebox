import React from 'react';
import PropTypes from 'prop-types';
import './Navigator.css';

import * as Scroll from 'react-scroll';
import List from 'material-ui/List';

import Item from './Item';

const Element = Scroll.Element;

class Navigator extends React.Component {

    static propTypes = {
        videos: PropTypes.array,
        onItemClicked: PropTypes.func,
        currentVideoIndex: PropTypes.number,
        searchText: PropTypes.string,
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
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 3,
                border: 0,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
            };
            if (this.props.searchText !== '') {
                const filter = new RegExp(this.props.searchText, 'gi');
                if (!filter.test(video.title)) {
                    return null;
                }
            }
            return (
                <Element
                    key={video.videoId}
                    name={`video_${index}`}
                >
                    <Item
                        index={index}
                        videoId={video.videoId}
                        title={video.title}
                        description={video.description}
                        thumbnail={video.thumbnail}
                        onClick={this.props.onItemClicked}
                        style={this.props.currentVideoIndex === index ? selectedStyle : {}}
                        selected={this.props.currentVideoIndex === index}
                        highlightText={this.props.searchText !== '' ? this.props.searchText : null}
                    />
                </Element>
            )
        });
    };

    render() {
        const filteredItemLength = this.renderItems().filter(item => item !== null).length;
        return filteredItemLength > 0 ? (
            <List>
                {this.renderItems()}
            </List>
        ) : (
            <div>
                <span style={{ fontWeight: 'bold' }}>{this.props.searchText}</span>
                와(과) 일치하는 결과가 없습니다.
            </div>
        );
    }
}

export default Navigator;