import "./styles/main.scss";
import Todo from "./modules/todo";
import TodoList from "./modules/todo-list"
import TodoForm from "./modules/todo-form";
import UI from "./modules/ui";



// Callback Functions
const handleFormSubmit = (text) => {
    if (!todoForm.validateInput(text)) return;
    const todo = new Todo(text, handleTodoClickEvents);
    todoList.addTodo(todo);
    ui.renderList(todoList.list);
}

const handleTodoClickEvents = (todoElement) => {
    todoElement.addEventListener('click', (e) => {
        e.stopPropagation()
        const clickedTarget = e.target;
        if (clickedTarget.classList.contains("todo-list__cross")) {

        }
        else if (clickedTarget.classList.contains("checkmark") || clickedTarget.tagName == "INPUT") {
            let input, checkBox;

            if (clickedTarget.tagName === "INPUT") {
                input = clickedTarget;
                checkBox = clickedTarget.nextElementSibling; // The checkbox span is the immediate sibling after the input
            } else if (clickedTarget.classList.contains("checkmark")) {
                checkBox = clickedTarget;
                input = clickedTarget.previousElementSibling; // The input is the immediate sibling before the checkbox span
            }

            // As the class "todo-list__todo--checked" is intended for the todo item's overall state, 
            // it's more appropriate to toggle it on the parent container rather than on the input itself.
            input.parentNode.classList.toggle("todo-list__todo--checked");

            checkBox.classList.toggle("checkmark--checked");
            checkBox.classList.toggle("checkmark--unchecked");
        }


    })
}


const todoForm = new TodoForm();
const todoList = new TodoList();
const ui = new UI(handleFormSubmit);












