import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';

import * as Scroll from 'react-scroll';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import Player from './components/Player';
import Remocon from './components/Remocon';
import Navigator from './components/Navigator';

import data from './data.json';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            currentVideoId: null,
            currentVideoIndex: 0,
            random: true,
            autoPlay: false,
            playerState: null,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    handleItemClick = (e) => {
        this.setState({
            currentVideoIndex: e.index,
            currentVideoId: e.videoId,
            autoPlay: true,
        });
        Scroll.animateScroll.scrollToTop({ duration: 300 });
    };

    fetchData = () => {
        const videos = [];
        data.items.forEach(item => {
            videos.push({
                videoId: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.default.url,
            })
        });

        this.setState({
            videos,
        }, () => {
            this.play(0, false);
        })
    };

    play = (index, autoPlay = true) => {
        if (index < this.state.videos.length) {
            this.setState({
                currentVideoIndex: index,
                currentVideoId: this.state.videos[index].videoId,
                autoPlay,
            })
        }
    };

    getNextIndex = () => {
        const videosLength = this.state.videos.length;
        let nextIndex;
        if (!this.state.random) {
            nextIndex = this.state.currentIndex < videosLength - 1
                ? this.state.currentIndex + 1 : 0;
        } else {
            let randomIndex = this.state.currentVideoIndex;
            while (randomIndex === this.state.currentVideoIndex) {
                randomIndex = Math.round(Math.random() * (videosLength - 1));
                console.log(`randomIndex = ${randomIndex}`)
            }
            nextIndex = randomIndex;
        }
        return nextIndex;
    };

    onPlayerReady = (event) => {
        this.player = event.target;
    };

    onPlayerStateChange = (state) => {
        this.setState({
            playerState: state.data,
        })
    };

    onPlayerError = (error) => {
        console.log('ERROR', error);
        this.play(this.getNextIndex());
    };

    onPlayerPlay = (play) => {
        console.log('PLAY', play)
    };

    onPlayerPause = (pause) => {
        console.log('PAUSE', pause);
    };

    onPlayerEnd = (end) => {
        console.log('END', end);
        this.play(this.getNextIndex());
    };

    onRemoconPlayButtonClick = () => {
        if (this.player) {
            this.player.playVideo();
        }
    };

    onRemoconPauseButtonClick = () => {
        if (this.player) {
            this.player.pauseVideo();
        }
    };

    onRemoconStopButtonClick = () => {
        if (this.player) {
            this.player.stopVideo();
        }
    };

    onRemoconNextButtonClick = () => {
        this.play(this.getNextIndex());
    };

    renderAppBar = () => {
        const currentVideo = this.state.videos[this.state.currentVideoIndex];
        const styles = {
            root: {
                flexGrow: 1,
            },
            flex: {
                flex: 1,
            },
            menuButton: {
                marginLeft: -12,
                marginRight: 20,
            },
        };
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    border: 0,
                    color: 'white',
                    background: 'linear-gradient(45deg, #320b86 30%, #9a67ea 90%)',
                }}>
                    <Toolbar>
                        <Avatar
                            src={currentVideo && currentVideo.thumbnail}
                            style={{
                                marginRight: 10,
                            }}
                        />
                        {currentVideo && currentVideo.title}
                    </Toolbar>
                </AppBar>
            </div>
        )
    };

    renderPlayer = () => (
        <Player
            videoId={this.state.currentVideoId}
            onReady={this.onPlayerReady}
            onStateChange={this.onPlayerStateChange}
            onPlay={this.onPlayerPlay}
            onPause={this.onPlayerPause}
            onEnd={this.onPlayerEnd}
            onError={this.onPlayerError}
            autoPlay={this.state.autoPlay}
        />
    );

    renderRemocon = () => (
        <Remocon
            playerState={this.state.playerState}
            onPlayButtonClick={this.onRemoconPlayButtonClick}
            onPauseButtonClick={this.onRemoconPauseButtonClick}
            onStopButtonClick={this.onRemoconStopButtonClick}
            onNextButtonClick={this.onRemoconNextButtonClick}
        />
    );

    renderNavigator = () => (
        <Navigator
            videos={this.state.videos}
            onItemClicked={this.handleItemClick}
            currentVideoIndex={this.state.currentVideoIndex}
        />
    );

    render() {
        const currentVideo = this.state.videos[this.state.currentVideoIndex];
        const { classes } = this.props;
        return (
            <div className="App">
                <Helmet>
                    <title>{currentVideo ? currentVideo.title : ''}</title>
                </Helmet>
                <header>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            {this.renderAppBar()}
                        </Grid>
                    </Grid>
                </header>
                <section>
                    <Grid container spacing={16}>
                        <Grid item xs={12} md={6} lg={7}>
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>Ad</Paper>
                                    {this.renderPlayer()}
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        {this.renderRemocon()}
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} lg={5}>
                            <Paper className={classes.paper}>
                                {this.renderNavigator()}
                            </Paper>
                        </Grid>
                    </Grid>
                </section>
            </div>
        );
    }
}

export default withStyles(styles)(App);
