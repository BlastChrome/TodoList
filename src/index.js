import "./styles/main.scss";
import TodoManager from "./modules/todo-manager.js";
import DomManager from "./modules/dom-manager";

const App = (() => {
    const todo_manager = new TodoManager();
    const dom_manager = new DomManager();
})();
