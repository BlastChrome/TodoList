import { pubsub } from "../pubsub.js";

export default class DomManager {
    constructor() {
        this.cacheDom();
        this.initEvents();
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("listUpdated", this.renderList);
        pubsub.subscribe("listUpdated", this.renderListLength);
        pubsub.subscribe("todoUpdated", this.renderTodo);
        pubsub.subscribe("filterApplied", this.changeHighlightedFilter)
        pubsub.subscribe("toggleTheme", this.changeTheme)
    }

    cacheDom = () => {
        this.body = document.getElementById("body");
        this.form = document.getElementById("todo-form");
        this.themeBtn = document.getElementById("theme-btn");
        this.input = document.getElementById("todo-input");
        this.dom_list = document.getElementById("todo-list");
        this.filter_menu = document.getElementById("menu");
        this.filterButtons = document.getElementsByClassName('menu__filter__text');
        this.items_left = document.getElementById("items-left");

    }

    initEvents = () => {
        this.form.addEventListener('submit', this.handleFormSubmit);
        this.dom_list.addEventListener('click', this.handleTodoClick);
        this.dom_list.addEventListener('dragover', this.handleDragOver);
        this.filter_menu.addEventListener('click', this.handleFilterClick);
        this.themeBtn.addEventListener('click', this.handleThemeBtnClick);
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
                break;
            case clickedElement.tagName === "INPUT":
                pubsub.publish("todoCompleteClicked", id);
                break;
            case clickedElement.classList.contains("todo-list__cross"):
                pubsub.publish("deleteTodoClicked", id);
                break;
            default:
                console.log("todo clicked");
        }
    }

    handleFilterClick = e => {
        const clickedElement = e.target;

        switch (true) {
            case clickedElement.classList.contains("menu__filter__all"):
                pubsub.publish("filterAllClicked");
                break;
            case clickedElement.classList.contains("menu__filter__active"):
                pubsub.publish("filterActiveClicked");
                break;
            case clickedElement.classList.contains("menu__filter__completed"):
                pubsub.publish("filterCompletedClicked");
                break;
            case clickedElement.classList.contains("menu__clear-completed"):
                pubsub.publish("clearCompletedClicked");
                break;
            default:
                console.log("clicked menu");
                break;
        }
    }

    handleThemeBtnClick = () => {
        pubsub.publish("themeBtnClicked");
    }

    handleDragOver = () => {
        console.log(`currently dragging over`);
    }

    handleDragging = element => {
        console.log(`being dragged...${element}`);
    }

    getClickedTodosId = clickedElement => {
        const todoItem = clickedElement.closest('.todo-list__todo');
        return todoItem ? todoItem.dataset.id : null;
    }

    changeHighlightedFilter = filter => {
        Array.from(this.filterButtons).forEach(button => { button.classList.remove('menu__filter__text--active'); });

        Array.from(this.filterButtons).find(button => {
            if (button.classList.contains(`menu__filter__${filter}`)) {
                button.classList.add('menu__filter__text--active');
            }
        })

    }

    changeTheme = theme => {
        this.body.className = `body body--${theme}`;
    }

    renderList = list => {
        this.dom_list.innerHTML = '';
        list.forEach(todo => { this.dom_list.appendChild(this.createTodoElement(todo)); });
    }

    renderTodo = todo => {
        let foundElement = Array.from(this.dom_list.childNodes).find(todoEl => {
            if (todoEl.dataset.id == todo.id) {
                return todoEl;
            }
        });

        if (foundElement) {
            const newElement = this.createTodoElement(todo);
            this.dom_list.replaceChild(newElement, foundElement);
        }
    }

    renderListLength = list => {
        this.items_left.innerText = `${list.length} items left`;
    }

    createTodoElement = todo => {
        const div = document.createElement("div");
        div.classList.add("todo-list__todo");
        div.setAttribute('draggable', true);

        div.dataset.id = todo.id;
        if (todo.isComplete) {
            div.classList.add("todo-list__todo--checked")
        }

        div.innerHTML = `
        <p class="todo-list__todo-text">${todo.content}</p>       
        <label>
            <input id="todo-checkbox" class="todo-checkbox" name="todo-checkbox" type="checkbox" ${todo.isComplete ? "checked" : ""} />
            <span class="checkmark"></span>
        </label>
        <span class="todo-list__cross"></span>
        `;

        div.addEventListener('dragstart', () => {
            console.log(div);
            this.handleDragging(div);
        });
        return div;
    }
}
