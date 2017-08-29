'use strict';

const initialState = [
    'Job for a Cowboy',
    'Chelsea Grin',
    'ChilStep'
];

const playListReducer = (state = initialState, action) => {
    console.log(action);
    return state;
}

export default playListReducer;
