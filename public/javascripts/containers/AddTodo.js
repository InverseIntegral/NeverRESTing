import React from 'react'
import {connect} from 'react-redux'
import {addTodo} from '../actions'

let AddTodo = ({dispatch}) => {
    let input;

    return (
        <div className="item">
            <form onSubmit={e => {
                e.preventDefault();

                if (!input.value.trim()) {
                    return
                }

                dispatch(addTodo(input.value));
                input.value = ''
            }}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input ref={node => {
                                    input = node
                                }}/>
                            </td>
                            <td>
                                <button type="submit">
                                    Add Todo
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
};

AddTodo = connect()(AddTodo);

export default AddTodo