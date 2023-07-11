import reducers from '../reducers'
import { createLogger } from 'redux-logger'
import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger())
}

const store = createStore(
    reducers,
    applyMiddleware(...middleware)
);

export default store;