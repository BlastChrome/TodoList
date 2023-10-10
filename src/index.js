import "./styles/main.scss";
import Todo from "./modules/todo.js";
import TodoList from "./modules/todo-list";

const todo1 = new Todo("First");
const todo2 = new Todo("Second");
const todo3 = new Todo("Third");
const todo4 = new Todo("Fourth");
const todo5 = new Todo("Fifth");



const tList = new TodoList();

tList.addTodo(todo1);
tList.addTodo(todo2);
tList.addTodo(todo3);
tList.addTodo(todo4);
tList.addTodo(todo5);

tList.sortTodos("_content");

console.log(tList.list);