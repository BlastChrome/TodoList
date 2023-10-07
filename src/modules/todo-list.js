class TodoList {
    constructor() {
        this._list = [];
    }

    get list() {
        return this._list;
    }

    addTodo(todo, callback) {
        this._list.push(todo);
        callback(todo);
    }

    removeTodo(index) {
        this._list.splice(index, 1);
    }
}


export default TodoList;
