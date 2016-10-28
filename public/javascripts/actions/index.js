import rest from 'rest';
import mime from 'rest/interceptor/mime';
import config from 'json!../../config/env.json';

const client = rest.wrap(mime);
const API_URI = config.API_URI;

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

/** Thunk Actions **/
export function fetchTodos() {
    return (dispatch) => {
        dispatch(requestTodos());

        return client(API_URI)
            .then(response => {
                dispatch(receiveTodos(response.entity.todos));
            }, handleError);
    };
}

export function addTodo(text) {
    return (dispatch) => {
        return client({
            'path': API_URI,
            'headers': {
                'Content-Type': 'application/json'
            },
            'entity': {
                text
            }
        }).then(response => {
            dispatch(receiveTodos(response.entity.todos));
        }, handleError);
    }
}

export function toggleTodo(id) {
    return (dispatch) => {
        return client({
            'path': API_URI + '/' + id + '/toggle',
            'method': 'POST'
        }).then(() => {
            dispatch(toggledTodo(id));
        }, handleError);
    }
}

const handleError = () => {
    Materialize.toast("Couldn\'t reach the other end", 6000);
};
