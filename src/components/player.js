'use strict';

import React from 'react';
import ClassNames from 'classnames';

const Player = (props) => {

    const playPauseClass = ClassNames({
        'fa fa-play': props.playStatus == 'PLAYING' ? false : true,
        'fa fa-pause': props.playStatus == 'PLAYING' ? true : false,
    });

    return (
        <div className="player">
            <div className="player__backward">
                <button onClick={props.backward} ><i className="fa fa-backward"></i></button>
            </div>
            <div className="player__main">
                <button onClick={props.togglePlay} ><i className={playPauseClass}></i></button>
                <button onClick={props.stop} ><i className="fa fa-stop"></i></button>
                <button onClick={props.random} ><i className="fa fa-random"></i></button>
            </div>
            <div className="player__forward">
                <button onClick={props.forward} ><i className="fa fa-forward"></i></button>
            </div>
        </div>
    );
}
export default Player;
