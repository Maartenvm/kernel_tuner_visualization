import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';

import { d3DataRequestedThunk } from './actions';
import { combinedReducer } from './reducers';

export const store = createStore(combinedReducer, applyMiddleware(thunk));

// whenever the store has changed, print the new state
store.subscribe(() => {
    console.log(store.getState()); // tslint:disable-line
});

store.dispatch(d3DataRequestedThunk('pnpoly'));
