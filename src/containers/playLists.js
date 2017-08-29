'use strict';

import React from 'react';
import { connect } from 'react-redux';
import store from '../store';

import PlayLists from '../components/playLists';

const PlayListsContainer = (props) => {
    console.log('props PlayListsContainer: ', props);
    return (
        <PlayLists
            playLists={props.playLists}/>
    );
};

const mapStateToProps = (store) => {
    console.log('state PlayListsContainer: ', store.playLists);
    return {
        playLists: store.playLists
    };
};

export default connect(mapStateToProps)(PlayListsContainer);
