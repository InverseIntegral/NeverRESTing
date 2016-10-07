/**
 * Created by Inverse Integral on 29.05.2016.
 */

/**
 * Represents the state of a todo item.
 */
class ToDoState {

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `ToDoState.${this.name}`;
    }

    getName() {
        return this.name;
    }

}

/**
 * The different states a todo can have
 * @type {{WIP: ToDoState, FINISHED: ToDoState}}
 */
const States = {

    /**
     * This todo has been created and is being worked on.
     */
    OPEN: new ToDoState("Open"),

    /**
     * This todo has been finished.
     */
    FINISHED: new ToDoState("Finished"),

    /**
     * Gets the names of the states as an array.
     *
     * @returns {Array}     Returns an array of strings.
     */
    values() {
        return Object
            .keys(this)
            .filter((key) => {
                return typeof(this[key]) === 'object';
            })
            .map((key) => {
                return this[key].getName();
            });
    },

    /**
     * Gets the name of the default state.
     * @returns {*} Returns a string representation of the name.
     */
    default() {
        return this.OPEN.getName();
    }

};

module.exports = States;