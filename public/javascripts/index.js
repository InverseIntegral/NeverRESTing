import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

import rootReducer from './reducers'
import {fetchTodos} from './actions';
import App from './components/App'

let store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

store.dispatch(fetchTodos());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);