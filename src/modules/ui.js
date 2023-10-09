class UI {
    constructor(onFormSubmit) {
        this._form = document.querySelector("#todo-form");
        this._input = document.querySelector("#todo-input");
        this._theme_btn = document.querySelector("#theme-btn");
        this._todo_list = document.querySelector("#todo-list");
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            onFormSubmit(this._input.value);
            this.clearInput();
        });
    }

    get todo_list() {
        return this._todo_list;
    }


    clearInput() {
        this._input.value = '';
    }

    renderList(arr) {
        // clear the list first 
        while (this.todo_list.length > 0) this.todo_list.removeChild(this.todo_list.children[0]);
        arr.forEach(item => {
            this.todo_list.appendChild(item.el)
        })
    }


}

export default UI;