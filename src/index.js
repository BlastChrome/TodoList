import "./styles/main.scss";
import TodoManager from "./modules/todo-manager.js";
import TodoForm from "./modules/todo-form.js";
import DomManager from "./modules/dom-manager.js";
import SettingsManager from "./modules/settings-manager.js";
import LocalStorage from "./modules/local-storage.js";

const App = (() => {
    const todo_manager = new TodoManager();
    const dom_manager = new DomManager();
    const todo_form = new TodoForm();
    const settings_manager = new SettingsManager();
    const local_storage = new LocalStorage();
    local_storage.loadTodos();
})();
