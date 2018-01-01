import * as Redux from 'redux';

const initialState: Array<String> = [
    'Job for a Cowboy',
    'Chelsea Grin',
    'ChilStep'
];

const playListReducer = (state = initialState, action: Redux.Action) => {
    return state;
}

export default playListReducer;
