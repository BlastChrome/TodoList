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
        let filteredList = this.filterActive();
        this.list = filteredList;
        return filteredList;
    }
}