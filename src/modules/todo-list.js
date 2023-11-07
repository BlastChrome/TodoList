import { pubsub } from "../pubsub.js"

export default class TodoList {
    constructor() {
        this.list = [];
    }

    addTodo = todo => {
        this.list.push(todo);
        pubsub.publish("listUpdated", this.list);
    }

    deleteById = id => {
        let foundTodo = this.findById(id);
        this.list.splice(this.list.indexOf(foundTodo), 1);
        pubsub.publish("listUpdated", this.list);
    }

    reorderList = newList => {
        this.list = newList;
        pubsub.publish("listUpdated", this.list);
    }

    findById = id => {
        return this.list.find(todo => { return todo.id == id; })
    }

    filterCompleted = () => {
        return this.list.filter(todo => {
            return todo.isComplete == true;
        })
    }

    filterActive = () => {
        return this.list.filter(todo => {
            return todo.isComplete != true;
        })
    }

    filterAll = () => {
        return this.list;
    }

    clearCompleted = () => {
        this.list = this.filterActive();
        return this.list;
    }
}