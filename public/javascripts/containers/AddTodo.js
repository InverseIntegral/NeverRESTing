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
                <div className="row">
                    <div className="input-field col s10">
                        <input type="text" ref={node => {
                            input = node
                        }}/>
                    </div>
                    <div className="col s2">
                        <button type="submit" className="btn-floating btn-large waves-effect waves-light light-blue darken-4">
                            <i className="material-icons">add</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

AddTodo = connect()(AddTodo);

export default AddTodo
