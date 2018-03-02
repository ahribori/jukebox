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
import Loading from './components/Loading';
import Search from './components/Search';

import { fetchPlaylistItems } from './api/fetch';
import { setPlaylistItemsToLocalStorage, getPlaylistItemsFromLocalStorage } from './utils/storage';
import shuffle from './utils/shuffle';
import debounce from 'lodash.debounce';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    blackPaper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: '#F5F5F5',
        backgroundColor: 'rgba(0,0,0,0.95)',
    },
    searchBar: {
        paddingTop: 12,
        paddingBottom: 12,
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            shuffleOrder: [],
            currentVideoId: null,
            currentVideoIndex: 0,
            random: false,
            autoPlay: false,
            playerState: null,
            playerInitialized: false,
            dataState: false,
            navigatorHeight: null,
            searchText: '',
        };
    }

    componentDidMount() {
        this.fetchData();
        this.fittingNavigator();
        window.addEventListener('resize', (e) => {
            this.fittingNavigator();
        });
    }

    fittingNavigator = () => {
        this.setState({
            navigatorHeight: document.body.offsetWidth >= 960 ?
                document.body.offsetHeight - 220 : 'auto',
        });
    };

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

        /**
         * 캐시 확인
         */
        const cache = getPlaylistItemsFromLocalStorage();
        if (cache) {
            const savedDate = new Date(cache.saveTime);
            const currentDate = new Date();
            if (savedDate.getFullYear() === currentDate.getFullYear() &&
                savedDate.getMonth() === currentDate.getMonth() &&
                savedDate.getDate() === currentDate.getDate()) {
                const cachedPlaylistItems = cache.playlistItems;
                if (cachedPlaylistItems.length > 0) {
                    cachedPlaylistItems.forEach(item => {
                        item.snippet && videos.push({
                            videoId: item.snippet.resourceId.videoId,
                            title: item.snippet.title,
                            description: item.snippet.description,
                            thumbnail: item.snippet.thumbnails.default.url,
                        })
                    });
                    this.setState({
                        videos,
                        dataState: true,
                    }, () => {
                        this.play(0, false);
                    });
                    return;
                }
            }
        }
        /**
         * 캐시 없으면 요청
         */
        fetchPlaylistItems().then(response => {
            const playlistItems = response.data;
            if (playlistItems.length > 0) {
                setPlaylistItemsToLocalStorage(playlistItems);
                playlistItems.forEach(item => {
                    item.snippet && videos.push({
                        videoId: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnail: item.snippet.thumbnails.default.url,
                    })
                });
                this.setState({
                    videos,
                    dataState: true,
                }, () => {
                    this.play(0, false);
                })
            }
        }).catch((e) => {

        });
    };

    play = (index, autoPlay = true) => {
        if (index < this.state.videos.length) {
            this.setState({
                currentVideoIndex: index,
                currentVideoId: this.state.videos[index].videoId,
                autoPlay,
            })
        }
        this.scrollToVideo(index);
    };

    scrollToVideo = (index) => {
        if (document.body.offsetWidth >= 960) {
            Scroll.scroller.scrollTo(`video_${index}`, {
                duration: 500,
                smooth: true,
                containerId: 'navigator',
                offset: 150,
            });
        }
    };

    getNextIndex = () => {
        const videosLength = this.state.videos.length;
        let nextIndex;
        if (!this.state.random) {
            nextIndex = this.state.currentVideoIndex < videosLength - 1
                    ? this.state.currentVideoIndex + 1 : 0;
        } else {
            const indexOfShuffleOrder = this.state.shuffleOrder.indexOf(this.state.currentVideoIndex);
            nextIndex = indexOfShuffleOrder < videosLength - 1
                ? this.state.shuffleOrder[indexOfShuffleOrder + 1] : this.state.shuffleOrder[0];
        }
        return nextIndex;
    };

    onPlayerReady = (event) => {
        this.player = event.target;
        this.setState({
            playerInitialized: true,
        })
    };

    onPlayerStateChange = (state) => {
        this.setState({
            playerState: state.data,
        })
    };

    onPlayerError = (error) => {
        this.play(this.getNextIndex());
    };

    onPlayerPlay = (play) => {
    };

    onPlayerPause = (pause) => {
    };

    onPlayerEnd = (end) => {
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

    onRemoconRandomButtonClick = (random) => {
        if (random) {
            let shuffleOrder = [];
            for (let i = 0, length = this.state.videos.length; i < length; i++) {
                shuffleOrder.push(i);
            }
            this.setState({
                shuffleOrder: shuffle(shuffleOrder),
                random,
            });
        } else {
            this.setState({
                random,
            })
        }
    };

    onSearchBarChange = (searchText) => {
        this.setState({
            searchText,
        });
    };

    renderAppBar = () => {
        const currentVideo = this.state.videos[this.state.currentVideoIndex];
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
            onRandomButtonClick={this.onRemoconRandomButtonClick}
            random={this.state.random}
        />
    );

    renderSearch = () => (
        <Search
            onChange={debounce(this.onSearchBarChange, 500)}
        />
    );

    renderNavigator = () => (
        <Navigator
            videos={this.state.videos}
            onItemClicked={this.handleItemClick}
            currentVideoIndex={this.state.currentVideoIndex}
            searchText={this.state.searchText}
        />
    );

    render() {
        const currentVideo = this.state.videos[this.state.currentVideoIndex];
        const { classes } = this.props;
        return (
            <div className="App">
                {
                    this.state.playerInitialized && this.state.dataState ? '' : <Loading />
                }
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
                            <Paper className={classes.blackPaper}>Ad</Paper>
                            {this.renderPlayer()}
                            <Paper className={classes.blackPaper}>
                                {this.renderRemocon()}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={5}>
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <Paper
                                        id="searchBar"
                                        className={`${classes.paper} ${classes.searchBar}`}
                                    >
                                        {this.renderSearch()}
                                    </Paper>
                                </Grid>

                                <Grid item xs={12}>
                                    <Paper
                                        id="navigator"
                                        className={`${classes.paper} navigator`}
                                        style={{
                                            height: this.state.navigatorHeight && this.state.navigatorHeight,
                                        }}
                                    >
                                        {this.renderNavigator()}
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </section>
            </div>
        );
    }
}

export default withStyles(styles)(App);
