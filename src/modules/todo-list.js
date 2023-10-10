export default class TodoList {
    constructor() {
        this._list = [];
    }

    get list() {
        return this._list;
    }

    addTodo(todo) {
        this._list.push(todo);
    }

    removeTodo(index) {
        this._list.splice(index, 1);
    }

    sortTodos(sortBy) {
        this._list.sort((a, b) => {
            try {
                if (a[sortBy] < b[sortBy]) return -1;
                if (a[sortBy] > b[sortBy]) return 1;
                return 0;
            }
            catch (error) {
                console.error(`Error sorting by ${sortBy}:`, error);
                return 0; // This ensures a consistent return value if an error occurs.
            }
        });
    }
}