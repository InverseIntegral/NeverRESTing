import React from 'react'
import AddTodo from '../containers/AddTodo'
import ConnectedTodoList from '../containers/ConnectedTodoList'
import ConnectedSpinner from '../containers/ConnectedSpinner'

const App = () => (
    <div className="flex_parent">
        <div className="flex_item">
            <h1>ToDos</h1>
        </div>
        <AddTodo/>
        <ConnectedSpinner/>
        <ConnectedTodoList/>
    </div>
);

export default App