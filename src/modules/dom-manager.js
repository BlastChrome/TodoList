import { pubsub } from "../pubsub.js";

export default class DomManager {
    constructor() {
        this.cacheDom();
        this.initEvents();
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("listUpdated", this.render);
    }

    cacheDom = () => {
        this.form = document.getElementById("todo-form");
        this.input = document.getElementById("todo-input");
        this.dom_list = document.getElementById("todo-list");
        this.filter_menu = document.getElementById("menu");
    }

    initEvents = () => {
        this.form.addEventListener('submit', this.handleFormSubmit);
        this.dom_list.addEventListener('click', this.handleTodoClick);
        this.filter_menu.addEventListener('click', this.handleFilterClick);
    }

    handleFormSubmit = e => {
        e.preventDefault();
        pubsub.publish("validateInput", this.input.value.trim());
        this.input.value = "";
    }

    handleTodoClick = e => {
        // TODO
    }

    handleFilterClick = e => {
        // TODO
    }

    render = list => {
        this.dom_list.innerHTML = '';
        list.forEach(todo => { this.dom_list.appendChild(this.createTodoElement(todo)); });
    }

    createTodoElement = todo => {
        const span = document.createElement("span");
        span.innerHTML = `
            <label class="todo-list__todo ${todo.isComplete ? "todo-list__todo--checked" : ""} ">${todo.content}
                <input type="checkbox" ${todo.isComplete ? "checked" : ""} >
                    <span class="checkmark"></span>
                    <span class="todo-list__cross"></span>
            </label>
        `
        return span;
    }
}