import { pubsub } from "../pubsub.js";

export default class LocalStorage {
    constructor() {
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("saveTodos", this.saveTodos);
        pubsub.subscribe("loadTodos", this.loadTodos);
    }

    saveTodos = todos => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos));
            pubsub.publish("todosSaved", todos);
        } catch (e) {
            console.error("Error saving todos:", e);
        }
    }

    loadTodos = () => {
        try {
            const todos = JSON.parse(localStorage.getItem('todos') || '[]');
            pubsub.publish("todosLoaded", todos);
            return todos;
        } catch (e) {
            console.error("Error loading todos:", e);
            pubsub.publish("todosLoadError", e);
            return [];
        }
    }
}
