class TodoForm {
    constructor(text) {
        this._text = this.validateInput(text);
    }

    validateInput(text) {
        if (text.length <= 0) return null;
        return text;
    }

}

export default TodoForm;