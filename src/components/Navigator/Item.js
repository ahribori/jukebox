import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class Item extends React.Component {

    static propTypes = {
        index: PropTypes.number,
        videoId: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        thumbnail: PropTypes.string,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        videoId: null,
        title: 'title',
        description: 'description',
        thumbnail: null,
        onClick: () => {
        },
    };

    handleClick = () => {
        this.props.onClick({
            index: this.props.index,
            videoId: this.props.videoId,
        });
    };

    render() {
        return (
            <ListItem
                button={true}
                onClick={this.handleClick}
                style={this.props.style}
            >
                <Avatar
                    src={this.props.thumbnail}
                    alt={this.props.title}
                    style={{
                        width: 60,
                        height: 60,
                    }}
                />
                <ListItemText
                    primary={this.props.title}
                />
            </ListItem>
        );
    }
}

export default Item;