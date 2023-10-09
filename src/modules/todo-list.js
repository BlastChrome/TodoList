class TodoList {
    constructor() {
        this._list = [];
    }

    get list() {
        return this._list;
    }

    addTodo(todo,) {
        this.list.push(todo);
    }

    removeTodo(index, callback) {
        const todo = this.list.splice(index, 1);
        callback(todo);
    }
}


export default TodoList;
