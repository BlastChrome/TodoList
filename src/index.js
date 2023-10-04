
import "./styles/main.scss"
import TodoList from './modules/todo-list';
import TodoForm from './modules/todo-form';

const todoList = new TodoList();

const handleTodoCreation = (text) => {
    todoList.createTodo(text);
    // You can also add logic here to update the UI, save to local storage, etc.
};

const todoForm = new TodoForm(handleTodoCreation);

// ... Any other initialization or setup code you might have ...
