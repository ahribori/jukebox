import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/IconButton';
import PlayIcon from 'material-ui-icons/PlayArrow';
import StopIcon from 'material-ui-icons/Stop';
import PauseIcon from 'material-ui-icons/Pause';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import RandomIcon from 'material-ui-icons/Shuffle';
import PlaylistAddIcons from 'material-ui-icons/PlaylistAdd';
import PlaylistPlayIcons from 'material-ui-icons/PlaylistPlay';
import Tooltip from 'material-ui/Tooltip';

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
        onAddPlaylistButtonClick: PropTypes.func,
        onPlaylistButtonClick: PropTypes.func,
        random: PropTypes.bool,
        myPlaylistEnabled: PropTypes.bool,
        currentVideoExistingInMyPlaylist: PropTypes.bool,
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
        onAddPlaylistButtonClick: () => {
        },
        onPlaylistButtonClick: () => {
        },
        random: false,
        myPlaylistEnabled: false,
        currentVideoExistingInMyPlaylist: false,
    };

    onRandomButtonClick = () => {
        this.props.onRandomButtonClick(!this.props.random);
    };

    onPlaylistButtonClick = () => {
        this.props.onPlaylistButtonClick(!this.props.myPlaylistEnabled);
    };

    renderPlaylistButtons = () => [
        <Tooltip title="내 플레이리스트에 추가" key="1">
            <Button className={this.props.classes.button} onClick={this.props.onAddPlaylistButtonClick}>
                <PlaylistAddIcons
                    style={{
                        color: this.props.currentVideoExistingInMyPlaylist ? 'yellow' : ''
                    }}
                />
            </Button>
        </Tooltip>,
        <Tooltip title="내 플레이리스트 열기" key="2">
            <Button className={this.props.classes.button} onClick={this.onPlaylistButtonClick}>
                <PlaylistPlayIcons
                    style={{
                        color: this.props.myPlaylistEnabled ? 'yellow' : ''
                    }}
                />
            </Button>
        </Tooltip>
    ];

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Tooltip title="재생">
                    <Button className={classes.button} onClick={() => {
                        if (this.props.playerState === 1) {
                            this.props.onPauseButtonClick();
                        } else {
                            this.props.onPlayButtonClick();
                        }
                    }}>
                        {this.props.playerState === 1 ? <PauseIcon /> : <PlayIcon />}
                    </Button>
                </Tooltip>
                <Tooltip title="정지">
                    <Button className={classes.button} onClick={this.props.onStopButtonClick}>
                        <StopIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="다음 곡 재생">
                    <Button className={classes.button} onClick={this.props.onNextButtonClick}>
                        <SkipNextIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="랜덤 재생 모드">
                    <Button className={classes.button} onClick={this.onRandomButtonClick}>
                        <RandomIcon
                            style={{
                                color: this.props.random ? 'yellow' : ''
                            }}
                        />
                    </Button>
                </Tooltip>
                {window.localStorage && this.renderPlaylistButtons()}
            </div>
        );
    }
}

export default withStyles(styles)(Remocon);