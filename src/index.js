import "./styles/main.scss"
import Todo from './modules/todo';
import TodoList from './modules/todo-list';
import TodoForm from './modules/todo-form';

const todoList = new TodoList();

const handleTodoCreation = (text) => {
    const newTodo = new Todo(text);           // Creating a new Todo instance
    todoList.addTodo(newTodo);                // Adding the new Todo to the TodoList
    // You can also add logic here to update the UI, save to local storage, etc.
};

const todoForm = new TodoForm(handleTodoCreation);

// ... Any other initialization or setup code you might have ...
