'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import AppContainer from './containers/app';

const store = createStore(reducers);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('content')
);
