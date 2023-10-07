import "./styles/main.scss";
import Todo from "./modules/todo";
import TodoList from "./modules/todo-list"
import TodoForm from "./modules/todo-form";
import UI from "./modules/ui";



// Callback Functions
const handleFormSubmit = (text) => {
    const todo = new Todo(text);
    todoList.addTodo(todo, ui.updateUI);
}

const todoList = new TodoList();
const ui = new UI(handleFormSubmit);













