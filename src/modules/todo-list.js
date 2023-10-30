import { pubsub } from "../pubsub.js"
export default class TodoList {
    constructor() {
        this.list = [];
    }

    add = todo => {
        this.list.push(todo);
        pubsub.publish("listUpdated", this.list);
    }

    find = id => {
        return this.list.find(todo => { return todo.id == id; })
    }

    delete = id => {
        let foundTodo = this.find(id);
        this.list.splice(this.list.indexOf(foundTodo), 1);
        pubsub.publish("listUpdated", this.list);
    }
}