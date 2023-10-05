class TodoList {
    constructor() {
        this._list = [];
    }
    createTodo(input) {
        const todo = new Todo(input);
        this.addTodo(todo);
    }

    addTodo(todo) {
        this._list.push(todo);
        console.log(this._list);
    }
    removeTodo(todo_to_remove) {
        const index = this._list.indexOf(todo_to_remove);
        if (index !== -1) this._list.splice(index, 1);
    }

}

export default TodoList; 