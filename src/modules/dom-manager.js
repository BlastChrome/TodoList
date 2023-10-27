import { pubsub } from "../pubsub.js";

export default class DomManager {
    constructor() {
        this.cacheDom();
        this.initEvents();
        this.subscribe();
    }

    subscribe = () => {

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

    // Event Handler Functions 
    handleFormSubmit = e => {
        e.preventDefault();
        console.log(e.target);
    }

    handleTodoClick = e => {
        console.log(e.target);
    }

    handleFilterClick = e => {
        console.log(e.target);
    }
}