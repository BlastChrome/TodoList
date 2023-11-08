export default class Todo {
    constructor(text) {
        this.content = text;
        this.isComplete = false;
        this.id = Date.now() + Math.random().toString(16).slice(2);;
        this.timestamp = new Date().toISOString();
    }

    toggleComplete = () => {
        this.isComplete = !this.isComplete;
    }
}
