'use strict';

import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);
console.log('GetStore: ', store.getState());
export default store;
