'use strict';

import { combineReducers } from 'redux';

import playLists from './playLists';

let reducers = combineReducers({
    playLists
});

export default reducers;
