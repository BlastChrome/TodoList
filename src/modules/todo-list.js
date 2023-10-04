import Todo from "./todo";
class TodoList {
    constructor() {
        this._list = [];
    }

    createTodo(input) {
        const todo = new Todo(input);
        this.addTodo(todo);
        console.log(this._list);
    }
    addTodo(todo) {
        this._list.push(todo);
    }

    removeTodo(todo_to_remove) {
        const index = this._list.indexOf(todo_to_remove);
        if (index !== -1) this._list.splice(index, 1);
    }
}

export default TodoList; 