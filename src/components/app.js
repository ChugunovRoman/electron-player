'use strict';

import React from 'react';

const App = (props) => {
    return (
        <div className="scotch_music" style={scotchStyle}>
            <Tool
                addTarcks={props.addTarcks} />
            <Search
                clientId={props.client_id}
                autoCompleteValue={props.autoCompleteValue}
                tracks={props.tracks}
                handleSelect={props.handleSelect}
                handleChange={props.handleChange}/>
            <Details
                title={props.track.title}/>
            <Sound
                url={props.prepareUrl(props.track.stream_url)}
                playStatus={props.playStatus}
                onPlaying={props.handleSongPlaying}
                playFromPosition={props.playFromPosition}
                onFinishedPlaying={props.handleSongFinished}/>
            <Player
                togglePlay={props.togglePlay}
                stop={props.stop}
                playStatus={props.playStatus}
                forward={props.forward}
                backward={props.backward}
                random={props.randomTrack}/>
            <Progress
                position={props.state.position}
                elapsed={props.state.elapsed}
                total={props.state.total}/>
            <Footer />
        </div>
    );
}
