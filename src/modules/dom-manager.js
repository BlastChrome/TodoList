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
                break;
            case clickedElement.tagName === "INPUT":
                pubsub.publish("todoCompleteClicked", id);
                break;
            case clickedElement.classList.contains("todo-list__cross"):
                pubsub.publish("deleteTodoClicked", id);
                break;
            default:
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
                break;
        }
    }

    handleThemeBtnClick = () => {
        pubsub.publish("themeBtnClicked");
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
        theme == 'dark' ? this.themeBtn.innerHTML = `
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C12 0.447715 12.4477 0 13 0C13.5523 0 14 0.447715 14 1V4C14 4.55228 13.5523 5 13 5C12.4477 5 12 4.55228 12 4V1ZM18 13C18 15.7614 15.7614 18 13 18C10.2386 18 8 15.7614 8 13C8 10.2386 10.2386 8 13 8C15.7614 8 18 10.2386 18 13ZM13 21C12.4477 21 12 21.4477 12 22V25C12 25.5523 12.4477 26 13 26C13.5523 26 14 25.5523 14 25V22C14 21.4477 13.5523 21 13 21ZM25 12C25.5523 12 26 12.4477 26 13C26 13.5523 25.5523 14 25 14H22C21.4477 14 21 13.5523 21 13C21 12.4477 21.4477 12 22 12H25ZM5 13C5 12.4477 4.55228 12 4 12H1C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H4C4.55228 14 5 13.5523 5 13ZM20.7782 3.80761C21.1687 3.41709 21.8019 3.41709 22.1924 3.80761C22.5829 4.19814 22.5829 4.8313 22.1924 5.22183L20.0711 7.34315C19.6805 7.73367 19.0474 7.73367 18.6569 7.34315C18.2663 6.95262 18.2663 6.31946 18.6569 5.92893L20.7782 3.80761ZM7.34315 18.6569C6.95262 18.2663 6.31946 18.2663 5.92893 18.6569L3.80761 20.7782C3.41709 21.1687 3.41709 21.8019 3.80761 22.1924C4.19814 22.5829 4.8313 22.5829 5.22183 22.1924L7.34315 20.0711C7.73367 19.6805 7.73367 19.0474 7.34315 18.6569ZM22.1924 20.7782C22.5829 21.1687 22.5829 21.8019 22.1924 22.1924C21.8019 22.5829 21.1687 22.5829 20.7782 22.1924L18.6569 20.0711C18.2663 19.6805 18.2663 19.0474 18.6569 18.6569C19.0474 18.2663 19.6805 18.2663 20.0711 18.6569L22.1924 20.7782ZM7.34315 7.34315C7.73367 6.95262 7.73367 6.31946 7.34315 5.92893L5.22183 3.80761C4.8313 3.41709 4.19814 3.41709 3.80761 3.80761C3.41709 4.19814 3.41709 4.8313 3.80761 5.22183L5.92893 7.34315C6.31946 7.73367 6.95262 7.73367 7.34315 7.34315Z" fill="white"/>
        </svg>` : this.themeBtn.innerHTML = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3717 0.215831C10.5931 1.19962 7 5.4302 7 10.5C7 16.299 11.701 21 17.5 21C20.4958 21 23.1986 19.7454 25.1116 17.7328C23.2191 22.5722 18.5098 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C13.81 0 14.6027 0.0740788 15.3717 0.215831Z" fill="white"/>
        </svg>`;
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

    handleDragStart = el => {
        el.classList.add('dragging');
    }

    handleDragEnd = el => {
        let ids = []
        el.classList.remove('dragging');
        Array.from(this.dom_list.childNodes).forEach(element => ids.push(element.dataset.id));
        pubsub.publish("domListUpdated", ids);
    }

    handleDragOver = e => {
        e.preventDefault();
        const afterElement = this.getDragAfterElement(e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            this.dom_list.appendChild(draggable);
        } else {
            this.dom_list.insertBefore(draggable, afterElement);
        }

    }

    getDragAfterElement = yPos => {
        const draggableElements = [...this.dom_list.querySelectorAll('.todo-list__todo:not(.dragging)')];

        return draggableElements.reduce((closets, child) => {
            const box = child.getBoundingClientRect()
            const offset = yPos - box.top - box.height / 2;
            if (offset < 0 && offset > closets.offset) {
                return { offset: offset, element: child }
            } else {
                return closets;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
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
            this.handleDragStart(div);
        });
        div.addEventListener('dragend', () => {
            this.handleDragEnd(div);
        });
        return div;
    }
}