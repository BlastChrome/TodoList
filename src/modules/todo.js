class Todo {
    constructor(content, callback) {
        this._content = content;
        this._isComplete = false;
        this._timestamp = new Date();
        this._id = this.generateID();
        this._el = this.createTodoElement(callback);

    }

    get content() {
        return this._content;
    }

    set content(text) {
        this._content = text;
    }

    get isComplete() {
        return this._isComplete;
    }

    get timestamp() {
        return this._timestamp;
    }

    get id() {
        return this_.id;
    }

    get el() {
        return this._el;
    }

    generateID() {
        return Date.now().toString();
    }

    updateContent(newContent) {
        this._content = newContent;
    }

    updateCompletion() {
        this.complete = !this.complete;
    }

    updateTimeStamp() {
        this._timestamp = new Date();
    }

    createTodoElement(callback) {
        const el = document.createElement("span");
        el.classList.add("todo-list__todo");
        el.innerHTML = `
            <label >${this.content}</label>
            <input class="todo-list__checkbox" type="checkbox" ${this.isComplete ? "checked" : ""}>
            <span class="checkmark checkmark--unchecked"></span>
            <span class="todo-list__cross"></span>
        `;
        callback(el);
        return el;
    }

}

export default Todo;