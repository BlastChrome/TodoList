import { pubsub } from "../pubsub.js"
import Todo from "./todo.js";
import TodoList from "./todo-list";

export default class TodoManager {
    constructor() {
        this.todo_list = new TodoList();
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("inputValidated", this.addTodoToList);
    }

    addTodoToList = text => {
        const todo = new Todo(text);
        this.todo_list.add(todo);
        pubsub.publish("todoAdded", todo);
        console.log(this.todo_list);
    }
}
