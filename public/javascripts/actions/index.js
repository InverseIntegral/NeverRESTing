import rest from 'rest';
import mime from 'rest/interceptor/mime';
import config from 'json!../../config/env.json';
import {browserHistory } from 'react-router'

const client = rest.wrap(mime);
const API_URI = config.API_URI;
const AUTH_URI = config.AUTH_URI;

/** Actions **/
export const toggledTodo = (id) => {
    return {
        type: 'TOGGLED_TODO',
        id: id
    };
};

export const requestTodos = () => {
    return {
        type: 'REQUEST_TODOS'
    };
};

export const receiveTodos = (json) => {
    return {
        type: 'RECEIVE_TODOS',
        state: json
    };
};

export const loggedIn = () => {
    return {
        type: 'LOGGED_IN'
    };
};

/** Thunk Actions **/
export function fetchTodos() {
    return (dispatch) => {
        dispatch(requestTodos());

        return client({
            'path': API_URI,
            'headers': {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }).then(response => {
            dispatch(receiveTodos(response.entity));
        }, handleError);
    };
}

export function addTodo(text) {
    return (dispatch) => {
        return client({
            'path': API_URI,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            'entity': {
                text
            }
        }).then(response => {
            dispatch(receiveTodos(response.entity));
        }, handleError);
    }
}

export function toggleTodo(id) {
    return (dispatch) => {
        return client({
            'path': API_URI + '/' + id + '/toggle',
            'method': 'POST',
            'headers': {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }).then(() => {
            dispatch(toggledTodo(id));
        }, handleError);
    }
}

export function login(username, password) {
    return (dispatch) => {
        return client({
            'path': AUTH_URI,
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'entity': {
                username,
                password
            }
        }).then((response) => {
            if (response.status.code == 200) {
                const token = response.entity.token;
                localStorage.setItem('token', token);

                dispatch(loggedIn());
                dispatch(fetchTodos(token));

                browserHistory.push('/home');
            } else {
                //TODO: Show an error message
            }
        }, handleError);
    };
}


const handleError = () => {
    Materialize.toast("Couldn\'t reach the other end", 6000);
};
