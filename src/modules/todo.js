export default class Todo {
    constructor(text) {
        this.content = text;
        this.isComplete = false;
        this.priority = 0;
        this.id = Date.now() + Math.random().toString(16).slice(2);;
        this.timestamp = new Date().toISOString();
    }

    toggleComplete = () => {
        this.isComplete != true ? this.isComplete = true : this.isComplete = false;
    }
}
