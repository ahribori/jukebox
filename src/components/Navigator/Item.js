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
        selected: PropTypes.bool,
    };

    static defaultProps = {
        videoId: null,
        title: 'title',
        description: 'description',
        thumbnail: null,
        onClick: () => {
        },
        selected: false,
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
                <span style={{
                    fontSize: '0.8rem',
                    fontWeight: this.props.selected ? 'bold' : '',
                    color: this.props.selected ? 'white' : '',
                    paddingLeft: 10,
                }}>{this.props.title}</span>
            </ListItem>
        );
    }
}

export default Item;