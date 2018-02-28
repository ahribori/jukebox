import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/IconButton';
import PlayIcon from 'material-ui-icons/PlayArrow';
import StopIcon from 'material-ui-icons/Stop';
import PauseIcon from 'material-ui-icons/Pause';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import RandomIcon from 'material-ui-icons/Shuffle';

const styles = theme => ({
    button: {
        color: '#F5F5F5',
        margin: theme.spacing.unit,
    },
});

class Remocon extends React.Component {
    static propTypes = {
        /**
         -1 –시작되지 않음
         0 – 종료
         1 – 재생 중
         2 – 일시중지
         3 – 버퍼링
         5 – 동영상 신호
         */
        playerState: PropTypes.number,
        onPlayButtonClick: PropTypes.func,
        onPauseButtonClick: PropTypes.func,
        onStopButtonClick: PropTypes.func,
        onNextButtonClick: PropTypes.func,
        onRandomButtonClick: PropTypes.func,
        random: PropTypes.bool,
    };

    static defaultProps = {
        playerState: -1,
        onPlayButtonClick: () => {
        },
        onPauseButtonClick: () => {
        },
        onStopButtonClick: () => {
        },
        onNextButtonClick: () => {
        },
        onRandomButtonClick: () => {
        },
        random: false,
    };

    onRandomButtonClick = () => {
        this.props.onRandomButtonClick(!this.props.random);
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button className={classes.button} onClick={() => {
                    if (this.props.playerState === 1) {
                        this.props.onPauseButtonClick();
                    } else {
                        this.props.onPlayButtonClick();
                    }
                }}>
                    {this.props.playerState === 1 ? <PauseIcon /> : <PlayIcon />}
                </Button>
                <Button className={classes.button} onClick={this.props.onStopButtonClick}>
                    <StopIcon />
                </Button>
                <Button className={classes.button} onClick={this.props.onNextButtonClick}>
                    <SkipNextIcon />
                </Button>
                <Button className={classes.button} onClick={this.onRandomButtonClick}>
                    <RandomIcon
                        style={{
                            color: this.props.random ? 'yellow' : ''
                        }}
                    />
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Remocon);