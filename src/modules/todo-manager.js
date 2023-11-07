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
        pubsub.subscribe("domListUpdated", this.reorderBasedOnDom);
    }

    addTodoToList = text => {
        const todo = new Todo(text);
        this.todo_list.addTodo(todo);
        pubsub.publish("todoAdded", todo);
    }

    toggleTodoComplete = id => {
        const foundTodo = this.todo_list.findById(id);
        foundTodo.toggleComplete();
        pubsub.publish("todoUpdated", foundTodo);
    }

    deleteTodo = id => {
        this.todo_list.deleteById(id);
    }

    reorderBasedOnDom = dom_list => {
        const idToItemMap = new Map(this.todo_list.list.map(item => [item.id, item]));
        const newList = dom_list.map(id => idToItemMap.get(id));
        this.todo_list.reorderList(newList);
    }

    filterCompleted = () => {
        let filteredList = this.todo_list.filterCompleted();
        if (filteredList.length > 0) {
            this.currentFilter = 'completed';
            pubsub.publish("listUpdated", filteredList);
            pubsub.publish("filterApplied", this.currentFilter);
            pubsub.publish("filteredLength", filteredList.length);
        }
    }

    filterActive = () => {
        let filteredList = this.todo_list.filterActive();
        if (filteredList.length > 0) {
            this.currentFilter = "active";
            pubsub.publish("listUpdated", filteredList);
            pubsub.publish("filterApplied", this.currentFilter);
        }
    }

    filterAll = () => {
        this.currentFilter = 'all';
        pubsub.publish("listUpdated", this.todo_list.filterAll());
        pubsub.publish("filterApplied", this.currentFilter);
    }

    clearCompleted = () => {
        this.currentFilter = 'all';
        pubsub.publish("listUpdated", this.todo_list.clearCompleted());
        pubsub.publish("filterApplied", this.currentFilter);
    }
}
