class Todo {
    constructor(content) {
        this._content = content;
        this._complete = false;
        this._timestamp = new Date();
        this._id = this.generateID();
    }

    get content() {
        return this._content;
    }

    set content(text) {
        this._content = text;
    }

    get isComplete() {
        return this._complete;
    }

    get timestamp() {
        return this_.timestamp;
    }

    get id() {
        return this_.id;
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

}

export default Todo;