import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import SearchIcon from 'material-ui-icons/Search';
import purple from 'material-ui/colors/purple';

const styles = {
    inkbar: {
        '&:after': {
            backgroundColor: purple[900],
        },
    },
    inputSearch: {
        paddingLeft: 5,
        '&:focus': {
            color: purple[900],
        },
    }
};

class Search extends React.Component {
    static propTypes = {
        onChange: PropTypes.func,
    };

    static defaultProps = {
        onChange: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        };
    }

    handleChange = e => {
        this.setState({
            searchText: e.target.value,
        });
        this.props.onChange(e.target.value);
    };

    render() {
        const { classes } = this.props;
        return (
            <div style={{
                padding: '0 20px 0 10px',
            }}>
                <Input
                    id="search"
                    name="search"
                    type="search"
                    placeholder="플레이리스트 내에서 검색"
                    onChange={this.handleChange}
                    value={this.state.searchText}
                    startAdornment={(
                        <SearchIcon style={{ color: purple[700] }} />
                    )}
                    fullWidth
                    classes={{
                        inkbar: classes.inkbar,
                        inputSearch: classes.inputSearch,
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 5,
                    }}
                />
            </div>

        );
    }
}

export default withStyles(styles)(Search);

