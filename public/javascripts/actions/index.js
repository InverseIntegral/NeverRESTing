import rest from 'rest';
import mime from 'rest/interceptor/mime';
import config from 'json!../../config/env.json';
import {push} from 'redux-router';

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

const loggedIn = (token) => {
    return {
        type: 'LOGGED_IN',
        token
    };
};

/** Thunk Actions **/
export function fetchTodos(token) {
    return (dispatch) => {
        dispatch(requestTodos());

        return client({
            'path': API_URI,
            'headers': {
                'Authorization': token
            }
        }).then(response => {
            dispatch(receiveTodos(response.entity.todos));
        }, handleError);
    };
}

export function addTodo(token, text) {
    return (dispatch) => {
        return client({
            'path': API_URI,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            'entity': {
                text
            }
        }).then(response => {
            dispatch(receiveTodos(response.entity.todos));
        }, handleError);
    }
}

export function toggleTodo(token, id) {
    return (dispatch) => {
        return client({
            'path': API_URI + '/' + id + '/toggle',
            'method': 'POST',
            'headers': {
                'Authorization': token
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

                dispatch(loggedIn(token));
                dispatch(fetchTodos(token));
                dispatch(push("/home"));
            } else {
                //TODO: Show an error message
            }
        }, handleError);
    };
}


const handleError = () => {
    Materialize.toast("Couldn\'t reach the other end", 6000);
};
