import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';
import routes from './routes';
import {loggedIn, fetchTodos} from './actions';

let store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);

let token = localStorage.getItem('token');

if (token !== null) {
    store.dispatch(loggedIn());
    store.dispatch(fetchTodos());
    browserHistory.push('/home');
}