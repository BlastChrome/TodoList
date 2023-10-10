export default class Todo {
    constructor(text) {
        this._content = text;
        this._isComplete = false;
        this._id = this.generateID();
        this._timeStamp = new Date();
    }

    toggleComplete() {
        this._isComplete = !this._isComplete;
    }

    changeContent(newContent) {
        this._content = newContent;
    }

    generateID() {
        return Math.floor(1000 + Math.random() * 9000);
    }
}