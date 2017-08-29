'use strict';

import React from 'react';

const Tool = (props) => {

    return (
        <div className="tool">
            <button onClick={props.addTarcks}>+</button>
        </div>
    );
}

export default Tool;
