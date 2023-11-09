export default class Todo {
    constructor(data) {
        // Check if data is a string (new todo), or an object (loading a todo)
        if (typeof data === 'string') {
            this.content = data;
            this.isComplete = false;
            this.id = Date.now() + Math.random().toString(16).slice(2);
            this.timestamp = new Date().toISOString();
        } else if (typeof data === 'object') {
            this.content = data.content || '';
            this.isComplete = data.hasOwnProperty('isComplete') ? data.isComplete : false;
            this.id = data.id || Date.now() + Math.random().toString(16).slice(2);
            this.timestamp = data.timestamp || new Date().toISOString();
        } else {
            throw new Error('Invalid data type for Todo constructor');
        }
    }
    toggleComplete = () => {
        this.isComplete == true ? this.isComplete = false : this.isComplete = true;
    }
}
