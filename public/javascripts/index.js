import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {reduxReactRouter, ReduxRouter} from 'redux-router';

import {createHistory} from 'history';

import rootReducer from './reducers'
import routes from './routes';

const middleware = applyMiddleware(thunkMiddleware);

const store = compose(
    middleware,
    reduxReactRouter({
        routes,
        createHistory
    })
)(createStore)(rootReducer());

render(
    <Provider store={store}>
        <ReduxRouter>
            {routes}
        </ReduxRouter>
    </Provider>,
    document.getElementById('root')
);