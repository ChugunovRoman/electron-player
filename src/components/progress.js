'use strict';

import React from 'react';

const Progress = (props) => {

    return (
        <div className="progress">
            <span className="Player__time-elapsed">{props.elapsed}</span>
            <progress
                value={props.position}
                max="1"></progress>
            <span className="player__time-total">{props.total}</span>
        </div>
    );
}

export default Progress;
