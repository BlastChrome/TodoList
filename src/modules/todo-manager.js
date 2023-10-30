import { pubsub } from "../pubsub.js"
import Todo from "./todo.js";
import TodoList from "./todo-list.js";

export default class TodoManager {
    constructor() {
        this.todo_list = new TodoList();
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("inputValidated", this.addTodoToList);
        pubsub.subscribe("todoCompleteClicked", this.toggleTodoComplete);
        pubsub.subscribe("deleteTodoClicked", this.deleteTodo);
    }

    addTodoToList = text => {
        const todo = new Todo(text);
        this.todo_list.add(todo);
        pubsub.publish("todoAdded", todo);
    }

    toggleTodoComplete = id => {
        const foundTodo = this.todo_list.find(id);
        foundTodo.toggleComplete();
        pubsub.publish("todoUpdated", foundTodo);
    }

    deleteTodo = id => {
        this.todo_list.delete(id);
    }
}
