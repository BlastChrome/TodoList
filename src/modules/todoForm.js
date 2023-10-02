class TodoForm {
    constructor() {
        this._input = document.querySelector("#todo-input")
        this._form = document.querySelector("#todo-form");
        this._form = document.addEventListener("submit", e => { e.preventDefault(); this.passTodo(this._input.value) })
    }
    passTodo(input) {
        if (input.length <= 0) return;
        console.log(input);
        // const todo = new Todo(input);
    }

}

export default TodoForm; 