class TodoForm {
    constructor(onSubmit) {
        this._form = document.querySelector("#todo-form");
        this._inputField = this._form.querySelector('#todo-input'); // Assuming the input has a name attribute

        this._form.addEventListener("submit", e => {
            e.preventDefault();
            const inputValue = this._inputField.value.trim();
            if (inputValue) {
                onSubmit(inputValue);
                // clears the form after submit
                this._inputField.value = "";
            }
        });
    }
}

export default TodoForm;
