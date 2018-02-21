import React, { Component } from 'react';
import './App.css';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

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
            currentVideoId: null,
            currentVideoIndex: null,
            videos: [],
            random: true,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    handleItemClick = (e) => {
        this.setState({
            currentVideoIndex: e.index,
            currentVideoId: e.videoId,
        })
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
        if (code === 0) {
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
            this.play(nextIndex);
        }
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
                            <Paper className={classes.paper}>Nav</Paper>
                        </Grid>
                    </Grid>
                </header>
                <section>
                    <Grid container spacing={16}>
                        <Grid item xs={12} md={6} lg={7}>
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
