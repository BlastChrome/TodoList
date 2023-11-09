import { pubsub } from "../pubsub.js";

export default class LocalStorage {
    constructor() {
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("saveTodos", this.saveTodos);
        pubsub.subscribe("loadTodos", this.loadTodos);
    }

    saveTodos = todoList => {
        try {
            localStorage.setItem('todos', JSON.stringify(todoList));
            pubsub.publish("todosSaved", todoList);
        } catch (e) {
            console.error("Error saving todos:", e);
        }
    }

    loadTodos = () => {
        try {
            const todosObject = JSON.parse(localStorage.getItem('todos') || '[]');
            pubsub.publish("todosLoaded", todosObject);
            return todosObject;
        } catch (e) {
            console.error("Error loading todos:", e);
            pubsub.publish("todosLoadError", e);
            return [];
        }
    }

    clearStorage = () => {
        localStorage.clear();
    }
}
