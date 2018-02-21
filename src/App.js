import React, { Component } from 'react';
import './App.css';

import * as Scroll from 'react-scroll';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import Player from './components/Player';
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
            this.play(0);
        })
    };

    play = (index) => {
        if (index < this.state.videos.length) {
            this.setState({
                currentVideoIndex: index,
                currentVideoId: this.state.videos[index].videoId,
            })
        }
    };

    handlePlayerStateChange = (state) => {
        const code = state.data;
        const videosLength = this.state.videos.length;
        const getNextIndex = () => {
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
        if (code === 0) {
            this.play(getNextIndex());
        }
        if (this.state.playerState === 3 && code === -1) {
            // 재생 실패시 다음 곡 재생
            // this.play(getNextIndex());
        }
        this.setState({
            playerState: code,
        })
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
            onStateChange={this.handlePlayerStateChange}
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
        const { classes } = this.props;
        return (
            <div className="App">
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
                            <Paper className={classes.paper}>Ad</Paper>
                            {this.renderPlayer()}
                            <Paper className={classes.paper}>Ad</Paper>
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
