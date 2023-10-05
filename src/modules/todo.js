class Todo {
    constructor(content) {
        this._content = content;
        this._complete = false;
        this._timestamp = new Date();
        this._id = this.generateID();
    }

    generateID() {
        return Date.now().toString();
    }

    updateContent(newContent) {
        this._content = newContent;

    }

    updateCompletion() {
        this._complete ? this._complete = false : this._complete = true;
    }

    updateTimeStamp() {
        this._timestamp = new Date();
    }
}

export default Todo;