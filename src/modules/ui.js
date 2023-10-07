class UI {
    constructor(onFormSubmit) {
        this._form = document.querySelector("#todo-form");
        this._input = document.querySelector("#todo-input");
        this._theme_btn = document.querySelector("#theme-btn");
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            onFormSubmit(this._input.value);
            this.clearInput();
        });
    }

    clearInput() {
        this._input.value = '';
    }

    updateUI(todo) {
        console.log(todo);
    }

}

export default UI;