import { pubsub } from "../pubsub.js"
import Todo from "./todo.js";
import TodoList from "./todo-list.js";

export default class TodoManager {
    constructor() {
        this.todo_list = new TodoList();
        this.currentFilter = 'all';
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("inputValidated", this.addTodoToList);
        pubsub.subscribe("todoCompleteClicked", this.toggleTodoComplete);
        pubsub.subscribe("deleteTodoClicked", this.deleteTodo);
        pubsub.subscribe("filterCompletedClicked", this.filterCompleted);
        pubsub.subscribe("filterActiveClicked", this.filterActive);
        pubsub.subscribe("filterAllClicked", this.filterAll);
        pubsub.subscribe("clearCompletedClicked", this.clearCompleted);
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

    filterCompleted = () => {
        let filteredList = this.todo_list.filterCompleted();
        if (filteredList.length > 0) {
            pubsub.publish("listUpdated", this.todo_list.filterCompleted());
            this.currentFilter = 'completed';
        }
    }

    filterActive = () => {
        let filteredList = this.todo_list.filterActive();
        if (filteredList.length > 0) {
            pubsub.publish('listUpdated', this.todo_list.filterActive());
            this.currentFilter = "active";
        }
    }

    filterAll = () => {
        pubsub.publish("listUpdated", this.todo_list.filterAll());
        this.currentFilter = 'all';
    }

    clearCompleted = () => {
        pubsub.publish("listUpdated", this.todo_list.clearCompleted());
    }
}
