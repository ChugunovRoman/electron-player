import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import Test from './containers/test';

render(
    <Provider store={createStore(reducers)}>
        <Test />
    </Provider>,
    document.getElementById('root')
);
