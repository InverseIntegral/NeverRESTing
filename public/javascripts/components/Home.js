import React from 'react'

import ConnectedSpinner from '../containers/ConnectedSpinner'
import ConnectedTodoList from '../containers/ConnectedTodoList'
import AddTodo from '../containers/AddTodo'


export default () => (
    <div>
        <ConnectedSpinner/>
        <ConnectedTodoList/>
        <AddTodo/>
    </div>
);