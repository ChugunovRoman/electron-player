'use strict';

import React from 'react';
import Sound from 'react-sound';
import Axios from 'axios';

const {ipcRenderer, remote} = eRequire('electron');

// App components
// import App from '../components/app';
import Tool from '../components/tool';
import Search from '../components/search';
import Details from '../components/details';
import Player from '../components/player';
import Progress from '../components/progress';
import Footer from '../components/footer';
import PlayListsContainer from '../containers/playLists';

class AppContainer extends React.Component {

    constructor(props) {
        super(props);

        this.client_id = '2f98992c40b8edf17423d93bda2e04ab';
        this.state = {
            track: {
                stream_url: '',
                title: '',
                artwork_url: ''
            },
            tracks: [],
            playStatus: Sound.status.STOPPED,
            elapsed: '00:00',
            total: '00:00',
            position: 0,
            playFromPosition: 0,
            autoCompleteValue: ''
        };
    }

    componentDidMount() {
        this.randomTrack();

        ipcRenderer.on('addTracks', (event, props) => {
            console.log(props.tracks);
        });
    }

    prepareUrl(url) {
        return `${url}?client_id=${this.client_id}`;
    }

    xlArtwork(url) {
        return url ? url.replace(/large/, 't500x500') : url;
    }

    addTarcks() {
        ipcRenderer.send('sendOpenDlg');
    }


    togglePlay() {

        if(this.state.playStatus === Sound.status.PLAYING) {
            this.setState({
                playStatus: Sound.status.PAUSED
            });
        } else {
            this.setState({
                playStatus: Sound.status.PLAYING
            });
        }
    }

    stop() {
        this.setState({
            playStatus: Sound.status.STOPPED
        });
    }

    forward() {
        this.setState({
            playFromPosition: this.state.playFromPosition += 1000 * 10
        });
    }

    backward() {
        this.setState({
            playFromPosition: this.state.playFromPosition -= 1000 * 10
        });
    }

    handleSelect(value, item) {
        this.setState({
            autoComplete: value,
            track: item
        });
    }

    handleChange(event, value) {

        let _this = this;

        this.setState({
            autoComplete: event.target.value
        });

        Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`)
            .then((res) => {
                _this.setState({
                    track: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    formatMilliseconds(milliseconds) {

        let hours = Math.floor(milliseconds / 3600000);
        milliseconds %= 3600000;

        let min = Math.floor(milliseconds / 60000);
        milliseconds %= 60000;

        let sec = Math.floor(milliseconds / 1000);
        milliseconds = Math.floor(milliseconds % 1000);

        return (min < 10 ? '0' : '') + min + ':' +
            (sec < 10 ? '0' : '') + sec;
    }

    handleSongPlaying(audio) {
        this.setState({
            elapsed: this.formatMilliseconds(audio.position),
            total: this.formatMilliseconds(audio.duration),
            position: audio.position / audio.duration
        });
    }

    handleSongFinished() {
        this.randomTrack();
    }

    randomTrack() {

        let _this = this;

        Axios.get(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
            .then((res) => {

                const trackLength = res.data.tracks.length;
                const randomNumber = Math.floor((Math.random() * trackLength) + 1);

                _this.setState({
                    track: res.data.tracks[randomNumber],
                    tracks: res.data.tracks
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {

        const scotchStyle = {
            width: '500px',
            height: '500px',
            backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.7),
                rgba(0, 0, 0, 0.7)
            ), url(${this.xlArtwork(this.state.track.artwork_url)})`
        };

        return (
            <div className="scotch_music" style={scotchStyle}>
                <Tool
                    addTarcks={this.addTarcks.bind(this)} />
                <Search
                    clientId={this.client_id}
                    autoCompleteValue={this.state.autoCompleteValue}
                    tracks={this.state.tracks}
                    handleSelect={this.handleSelect.bind(this)}
                    handleChange={this.handleChange.bind(this)}/>
                <Details
                    title={this.state.track.title}/>
                <Sound
                    url={this.prepareUrl(this.state.track.stream_url)}
                    playStatus={this.state.playStatus}
                    onPlaying={this.handleSongPlaying.bind(this)}
                    playFromPosition={this.playFromPosition}
                    onFinishedPlaying={this.handleSongFinished.bind(this)}/>
                <Player
                    togglePlay={this.togglePlay.bind(this)}
                    stop={this.stop.bind(this)}
                    playStatus={this.state.playStatus}
                    forward={this.forward.bind(this)}
                    backward={this.backward.bind(this)}
                    random={this.randomTrack.bind(this)}/>
                <Progress
                    position={this.state.position}
                    elapsed={this.state.elapsed}
                    total={this.state.total}/>
                <Footer />
                <PlayListsContainer />
            </div>
        );
    }

}

export default AppContainer;
