import React from 'react'

import ConnectedSpinner from '../containers/ConnectedSpinner'
import ConnectedTodoList from '../containers/ConnectedTodoList'
import AddTodo from '../containers/AddTodo'

export default () => {

    return (
        <div className="flex_item">
            <h1>ToDos</h1>
            <ConnectedSpinner/>
            <ConnectedTodoList/>
            <AddTodo/>
        </div>
    );
};