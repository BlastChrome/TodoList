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
        const clickedElement = e.target;
        const id = this.getClickedTodosId(clickedElement);
        switch (true) {
            case clickedElement.classList.contains("todo-list__todo-text"):
                console.log("clicked Text");
                console.log(id)
                break;
            case clickedElement.tagName === "INPUT":
                console.log("mark clicked");
                console.log(id)
                break;
            case clickedElement.classList.contains("todo-list__cross"):
                console.log("cross clicked");
                console.log(id)
                break;
            default:
                console.log("todo clicked");
                console.log(id)
        }
    }

    getClickedTodosId = clickedElement => {
        const todoItem = clickedElement.closest('.todo-list__todo');
        return todoItem ? todoItem.dataset.id : null;
    }

    handleFilterClick = e => {
        // TODO
    }

    render = list => {
        this.dom_list.innerHTML = '';
        list.forEach(todo => { this.dom_list.appendChild(this.createTodoElement(todo)); });
    }

    createTodoElement = todo => {
        const div = document.createElement("div");
        div.classList.add("todo-list__todo");
        div.dataset.id = todo.id;
        if (todo.isComplete) div.classList.add("todo-list__todo--checked");
        div.innerHTML = `
        <p class="todo-list__todo-text">${todo.content}</p>       
        <label>
            <input id="todo-checkbox" class="todo-checkbox" name="todo-checkbox" type="checkbox" ${todo.isComplete ? "checked" : ""} />
            <span class="checkmark"></span>
        </label>
        <span class="todo-list__cross"></span>
        `
        return div;
    }
}