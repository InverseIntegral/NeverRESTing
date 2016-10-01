import React from 'react'
import AddTodo from '../containers/AddTodo'
import ConnectedTodoList from '../containers/ConnectedTodoList'

const App = () => (
    <div>
        <AddTodo />
        <ConnectedTodoList/>
    </div>
);

export default App